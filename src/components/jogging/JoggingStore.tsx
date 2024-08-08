import { keyBy } from "lodash-es"
import { autorun, makeAutoObservable, type IReactionDisposer } from "mobx"
import type {
  CoordinateSystem,
  JoggerConnection,
  MotionGroupSpecification,
  RobotTcp,
} from "@wandelbots/wandelbots-js"
import { tryParseJson } from "@wandelbots/wandelbots-js"

const discreteIncrementOptions = [
  { id: "0.1", mm: 0.1, degrees: 0.05 },
  { id: "1", mm: 1, degrees: 0.5 },
  { id: "5", mm: 5, degrees: 2.5 },
  { id: "10", mm: 10, degrees: 5 },
]

const incrementOptions = [
  { id: "continuous" },
  ...discreteIncrementOptions,
] as const

export type DiscreteIncrementOption = (typeof discreteIncrementOptions)[number]
export type IncrementOption = (typeof incrementOptions)[number]
export type IncrementOptionId = IncrementOption["id"]

export class JoggingStore {
  selectedTabId: "cartesian" | "joint" | "debug" = "cartesian"

  // TODO
  isLocked: boolean = false

  /**
   * Id of selected coordinate system from among those defined on the API side
   */
  selectedCoordSystemId: string = "world"

  /** Id of selected tool center point from among the options available on the robot */
  selectedTcpId: string = ""

  /**
   * Whether the user is jogging in the coordinate system or tool orientation.
   * When in tool orientation, the robot moves in a direction relative to the
   * attached tool rotation.
   */
  selectedOrientation: "coordsys" | "tool" = "coordsys"

  /**
   * Id of selected increment amount for jogging. Options are defined by robot pad.
   * When non-continuous, jogging moves the robot by a fixed number of mm or degrees
   * each time the button is pressed, for extra precision
   */
  selectedIncrementId: IncrementOptionId = "continuous"

  /**
   * When on the cartesian tab, jogging can be either translating or rotating
   * around the TCP.
   */
  selectedCartesianMotionType: "translate" | "rotate" = "translate"

  /** True when the API is busy doing a planned increment jog motion */
  incrementJoggingInProgress = false

  /** How fast the robot goes when doing cartesian translate jogging in mm/s */
  translationVelocityMmPerSec: number = 10
  /** How fast the robot goes when doing cartesian or joint rotation jogging in °/s */
  rotationVelocityDegPerSec: number = 1

  /** Minimum translation velocity user can choose on the velocity slider in °/s */
  minTranslationVelocityMmPerSec: number = 5
  /** Maximum translation velocity user can choose on the velocity slider in °/s */
  maxTranslationVelocityMmPerSec: number = 250

  /** Minimum rotation velocity user can choose on the velocity slider in °/s */
  minRotationVelocityDegPerSec: number = 1
  /** Maximum rotation velocity user can choose on the velocity slider in °/s */
  maxRotationVelocityDegPerSec: number = 60

  disposers: IReactionDisposer[] = []

  /**
   * Load a jogging store with the relevant data it needs
   * from the backend
   */
  static async loadFor(jogger: JoggerConnection) {
    const { nova } = jogger

    // Find out what TCPs this motion group has (we need it for jogging)
    const [motionGroupSpec, { coordinatesystems }, { tcps }] =
      await Promise.all([
        nova.api.motionGroupInfos.getMotionGroupSpecification(
          jogger.motionGroupId,
        ),

        // Fetch coord systems so user can select between them
        nova.api.coordinateSystems.listCoordinateSystems("ROTATION_VECTOR"),

        // Same for TCPs
        nova.api.motionGroupInfos.listTcps(
          jogger.motionGroupId,
          "ROTATION_VECTOR",
        ),
      ])

    return new JoggingStore(
      jogger,
      motionGroupSpec,
      coordinatesystems || [],
      tcps || [],
    )
  }

  constructor(
    readonly jogger: JoggerConnection,
    readonly motionGroupSpec: MotionGroupSpecification,
    readonly coordSystems: CoordinateSystem[],
    readonly tcps: RobotTcp[],
  ) {
    // TODO workaround for default coord system on backend having a canonical id
    // of empty string. Can remove when fixed on API side
    for (const cs of coordSystems) {
      if (cs.coordinate_system === "") {
        cs.coordinate_system = "world"
        break
      }
    }
    this.selectedCoordSystemId = coordSystems[0]?.coordinate_system || "world"
    this.selectedTcpId = tcps[0]?.id || ""

    makeAutoObservable(this, {}, { autoBind: true })

    // Load user settings from local storage if available
    this.loadFromLocalStorage()

    // Automatically save user settings to local storage when save changes
    this.disposers.push(autorun(() => this.saveToLocalStorage()))
    ;(window as any).joggingStore = this
  }

  dispose() {
    for (const dispose of this.disposers) {
      dispose()
    }
    this.jogger.dispose()
  }

  loadFromLocalStorage() {
    const save = tryParseJson(localStorage.getItem("joggingToolStore"))
    if (!save) return

    if (this.tabsById[save.selectedTabId]) {
      this.selectedTabId = save.selectedTabId
    }

    if (this.coordSystemsById[save.selectedCoordSystemId]) {
      this.selectedCoordSystemId = save.selectedCoordSystemId
    }

    if (this.tcpsById[save.selectedTcpId]) {
      this.selectedTcpId = save.selectedTcpId
    }

    if (this.incrementOptionsById[save.selectedIncrementId]) {
      this.selectedIncrementId = save.selectedIncrementId
    }

    if (["translate", "rotate"].includes(save.selectedCartesianMotionType)) {
      this.selectedCartesianMotionType = save.selectedCartesianMotionType
    }

    if (["coordsys", "tool"].includes(save.selectedOrientation)) {
      this.selectedOrientation = save.selectedOrientation
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(
      "joggingToolStore",
      JSON.stringify(this.localStorageSave),
    )
  }

  get localStorageSave() {
    return {
      selectedTabId: this.selectedTabId,
      selectedCoordSystemId: this.selectedCoordSystemId,
      selectedTcpId: this.selectedTcpId,
      selectedOrientation: this.selectedOrientation,
      selectedIncrementId: this.selectedIncrementId,
      selectedCartesianMotionType: this.selectedCartesianMotionType,
    }
  }

  get tabs() {
    return [
      {
        id: "cartesian",
        label: "Cartesian",
      },
      {
        id: "joint",
        label: "Joint",
      },
    ] as const
  }

  get incrementOptions() {
    return incrementOptions
  }

  get discreteIncrementOptions() {
    return discreteIncrementOptions
  }

  get incrementOptionsById() {
    return keyBy(this.incrementOptions, (o) => o.id)
  }

  get tabsById() {
    return keyBy(this.tabs, (t) => t.id)
  }

  get currentTab() {
    return this.tabsById[this.selectedTabId] || this.tabs[0]!
  }

  get tabIndex() {
    return this.tabs.indexOf(this.currentTab)
  }

  get coordSystemsById() {
    return keyBy(this.coordSystems, (cs) => cs.coordinate_system)
  }

  get selectedCoordSystem() {
    return this.coordSystemsById[this.selectedCoordSystemId]
  }

  get activeCoordSystemId() {
    return this.selectedOrientation === "tool"
      ? "tool"
      : this.selectedCoordSystemId
  }

  get tcpsById() {
    return keyBy(this.tcps, (tcp) => tcp.id)
  }

  get selectedDiscreteIncrement() {
    return discreteIncrementOptions.find(
      (d) => d.id === this.selectedIncrementId,
    )
  }

  /** The selected rotation velocity converted to radians per second */
  get rotationVelocityRadsPerSec() {
    return (this.rotationVelocityDegPerSec * Math.PI) / 180
  }

  get velocityInCurrentUnits() {
    return this.currentMotionType === "translate"
      ? this.translationVelocityMmPerSec
      : this.rotationVelocityDegPerSec
  }

  get minVelocityInCurrentUnits() {
    return this.currentMotionType === "translate"
      ? this.minTranslationVelocityMmPerSec
      : this.minRotationVelocityDegPerSec
  }

  get maxVelocityInCurrentUnits() {
    return this.currentMotionType === "translate"
      ? this.maxTranslationVelocityMmPerSec
      : this.maxRotationVelocityDegPerSec
  }

  /**
   * For velocity unit purposes, joint and cartesian rotation
   * are treated as the same type of motion
   */
  get currentMotionType() {
    if (
      this.selectedTabId === "cartesian" &&
      this.selectedCartesianMotionType === "translate"
    ) {
      return "translate"
    } else {
      return "rotate"
    }
  }

  onTabChange(_event: React.SyntheticEvent, newValue: number) {
    const tab = this.tabs[newValue] || this.tabs[0]!
    this.selectedTabId = tab.id
  }

  setSelectedCoordSystemId(id: string) {
    this.selectedCoordSystemId = id
  }

  setSelectedTcpId(id: string) {
    this.selectedTcpId = id
  }

  setSelectedOrientation(orientation: "coordsys" | "tool") {
    this.selectedOrientation = orientation
  }

  setSelectedIncrementId(id: IncrementOptionId) {
    this.selectedIncrementId = id
  }

  setIncrementJoggingInProgress(inProgress: boolean) {
    this.incrementJoggingInProgress = inProgress
  }

  setVelocityFromSlider(velocity: number) {
    if (this.currentMotionType === "translate") {
      this.translationVelocityMmPerSec = velocity
    } else {
      this.rotationVelocityDegPerSec = velocity
    }
  }

  setSelectedCartesianMotionType(type: "translate" | "rotate") {
    this.selectedCartesianMotionType = type
  }
}
