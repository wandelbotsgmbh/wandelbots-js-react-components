import {
  type CoordinateSystem,
  type DHParameter,
  JointTypeEnum,
  type KinematicModel,
  type MotionGroupDescription,
  type RobotControllerConfiguration,
} from "@wandelbots/nova-js/v2"

// From RobotPad's ActiveRobotStore: what NOVA describes about the robot. It
// does not change while a session lives.

/** What NOVA's API v2 leaves out of a DH parameter when it is 0 */
const DH_PARAMETER_DEFAULTS = {
  a: 0,
  d: 0,
  alpha: 0,
  theta: 0,
  reverse_rotation_direction: false,
} satisfies DHParameter

/**
 * What NOVA describes about a robot: its model, kinematics, limits, safety
 * zones, TCPs and the coordinate systems of its controller
 */
export class RobotDescription {
  /**
   * The DH parameters of the joints, with the values that NOVA leaves out
   * because they are 0 filled in; empty for a motion group without them
   */
  readonly dhParameters: DHParameter[]

  /** @internal The session makes it, see RobotSession */
  constructor(
    /** The motion group's description as NOVA gives it */
    readonly motionGroupDescription: MotionGroupDescription,
    readonly controllerConfiguration: RobotControllerConfiguration,
    /** The model's kinematics: its inverse solver, chain and flange offsets */
    readonly kinematicModel: KinematicModel,
    /**
     * The model that holds this robot's data: the custom copy registered for
     * its serial number, or {@link RobotDescription.motionGroupModel} otherwise. Planner
     * requests carry only a model name, so they must send this one.
     */
    readonly resolvedMotionGroupModel: string,
    /**
     * The coordinate systems of the robot's controller. Not a cell-wide list:
     * an id that exists on several controllers would resolve to another
     * robot's frame.
     */
    readonly coordinateSystems: CoordinateSystem[],
  ) {
    this.dhParameters = (motionGroupDescription.dh_parameters ?? []).map(
      (parameter) => ({ ...DH_PARAMETER_DEFAULTS, ...parameter }),
    )
  }

  /** A virtual robot of NOVA's simulation, not a physical one */
  get isVirtual() {
    return this.controllerConfiguration.kind === "VirtualController"
  }

  /** The model the controller reports */
  get motionGroupModel() {
    return this.motionGroupDescription.motion_group_model
  }

  get serialNumber() {
    return this.motionGroupDescription.serial_number
  }

  /**
   * The inverse solver of the model; null for a model without one, such as a
   * linear axis or a turntable, which jogs its joints only
   */
  get inverseSolver() {
    return this.kinematicModel.inverse_solver
  }

  /** Revolute, or prismatic for a linear axis */
  get jointType() {
    return (
      this.motionGroupDescription.dh_parameters?.[0]?.type ??
      JointTypeEnum.RevoluteJoint
    )
  }

  /** The joints' limits in automatic mode, one per joint */
  get jointLimits() {
    return (
      this.motionGroupDescription.operation_limits.auto_limits?.joints ?? []
    )
  }

  get safetyZones() {
    return this.motionGroupDescription.safety_zones
  }

  /**
   * Per-link safety colliders (`safety_link_colliders`): entry k is in the
   * frame after k DH transforms (entry 0 = the static base). Not every
   * controller gives them.
   */
  get safetyLinkColliders() {
    return this.motionGroupDescription.safety_link_colliders
  }

  /** The collision shapes of each tool (TCP), at the flange */
  get safetyToolColliders() {
    return this.motionGroupDescription.safety_tool_colliders
  }

  /**
   * Constant transformation between the motion group base frame and the start
   * of the DH chain. From the kinematic model, which always reflects the
   * current robot data; the motion group description is only the fallback, as
   * controllers snapshot the offset when they are created. Null means
   * identity.
   */
  get kinematicChainOffset() {
    return (
      this.kinematicModel.kinematic_chain_offset ??
      this.motionGroupDescription.kinematic_chain_offset ??
      null
    )
  }

  /**
   * Constant transformation between the end of the DH chain and the flange
   * frame, sourced as {@link RobotDescription.kinematicChainOffset}
   */
  get flangeOffset() {
    return (
      this.kinematicModel.flange_offset ??
      this.motionGroupDescription.flange_offset ??
      null
    )
  }

  /** Where the robot is mounted in the cell (mm, rotation vector), if set */
  get mounting() {
    return this.motionGroupDescription.mounting ?? null
  }

  /** The robot's TCPs, by id and name */
  get tcps() {
    return Object.entries(this.motionGroupDescription.tcps ?? {}).map(
      ([id, tcpOffset]) => ({ id, name: tcpOffset.name }),
    )
  }

  /** The TCPs' offsets from the flange, by TCP id */
  get tcpOffsetsById() {
    return this.motionGroupDescription.tcps ?? {}
  }
}
