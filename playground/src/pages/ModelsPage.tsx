import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import Typography from "@mui/material/Typography"
import { AdornedTextField } from "@wandelbots/mui"
import {
  type DHParameter,
  JointTypeEnum,
  type MotionGroupState,
} from "@wandelbots/nova-js/v2"
import {
  LoadingCover,
  SupportedLinearAxis,
  SupportedLinearAxisExact,
  SupportedRobot,
  SupportedRobotExact,
} from "@wandelbots/wandelbots-js-react-components"
import { useEffect, useRef, useState } from "react"
import { useAsync } from "../connections"
import type { PlaygroundInstance } from "../instance"
import { FitCamera, ViewPanel, Viewport } from "../scene"
import type { PageProps } from "."

/**
 * The motion group models of the instance in a list, and the selected model
 * in a 3D view (SupportedRobot or SupportedLinearAxis), in its home joints.
 */
export function ModelsPage({ instance, motionGroup }: PageProps) {
  const models = useAsync("models", () =>
    instance.nova.api.motionGroupModels.getMotionGroupModels(),
  )
  const [filter, setFilter] = useState("")
  const [selectedModel, setSelectedModel] = useState<string>()
  const modelNames = models.value ?? []
  // At the start, the model of the selected motion group
  const model =
    selectedModel ??
    (modelNames.includes(motionGroup.modelFromController)
      ? motionGroup.modelFromController
      : modelNames[0])
  const shownNames = modelNames.filter((name) =>
    name.toLowerCase().includes(filter.trim().toLowerCase()),
  )

  // Shows the selected model in the list: in the center at the start
  const selectedItem = useRef<HTMLDivElement>(null)
  const scrolledOnce = useRef(false)
  useEffect(() => {
    if (!model || !selectedItem.current) return
    selectedItem.current.scrollIntoView({
      block: scrolledOnce.current ? "nearest" : "center",
    })
    scrolledOnce.current = true
  }, [model])

  return (
    <Stack direction="row" sx={{ position: "absolute", inset: 0 }}>
      <Stack
        sx={{
          width: 320,
          flexShrink: 0,
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Stack gap={1} sx={{ p: 2 }}>
          <AdornedTextField
            adornedSize="small"
            label="Filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            fullWidth
          />
          <Typography variant="body2" color="text.secondary">
            {models.value
              ? `${shownNames.length} of ${modelNames.length} models`
              : "Loading the models..."}
          </Typography>
        </Stack>
        <List dense sx={{ flex: 1, overflowY: "auto" }}>
          {shownNames.map((name) => (
            <ListItemButton
              key={name}
              ref={name === model ? selectedItem : undefined}
              selected={name === model}
              onClick={() => setSelectedModel(name)}
            >
              <ListItemText primary={name} />
            </ListItemButton>
          ))}
        </List>
      </Stack>
      <Box sx={{ position: "relative", flex: 1, minWidth: 0 }}>
        {model ? (
          <ModelView key={model} instance={instance} model={model} />
        ) : (
          <LoadingCover message="Loading the models" error={models.error} />
        )}
      </Box>
    </Stack>
  )
}

function ModelView({
  instance,
  model,
}: {
  instance: PlaygroundInstance
  model: string
}) {
  const [exact, setExact] = useState(false)
  const loaded = useAsync(model, (name) => loadModel(instance, name))
  const shown = loaded.value

  if (!shown) {
    return <LoadingCover message={`Loading ${model}`} error={loaded.error} />
  }

  const modelProps = {
    modelFromController: model,
    dhParameters: shown.dhParameters,
    rapidlyChangingMotionState: shown.motionState,
    // defaultGetModel with the client of the instance (and its access token)
    getModel: instance.getModel,
  }

  return (
    <>
      <Viewport>
        <FitCamera>
          {(refit) => {
            if (shown.kind === "linear axis") {
              return exact ? (
                <SupportedLinearAxisExact
                  {...modelProps}
                  postModelRender={refit}
                />
              ) : (
                <SupportedLinearAxis {...modelProps} postModelRender={refit} />
              )
            }
            return exact ? (
              <SupportedRobotExact {...modelProps} postModelRender={refit} />
            ) : (
              <SupportedRobot {...modelProps} postModelRender={refit} />
            )
          }}
        </FitCamera>
      </Viewport>
      <ViewPanel>
        <Typography variant="subtitle2">{model}</Typography>
        <Typography variant="body2" color="text.secondary">
          {KIND_TEXTS[shown.kind]}, {shown.dhParameters.length} joints, in its{" "}
          {shown.homeJoints
            ? "home joints"
            : "zero joints (the instance has no home joints)"}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={exact}
              onChange={(event) => setExact(event.target.checked)}
            />
          }
          label={
            shown.kind === "linear axis"
              ? "Exact (SupportedLinearAxisExact)"
              : "Exact (SupportedRobotExact)"
          }
        />
      </ViewPanel>
    </>
  )
}

type ModelKind = "robot" | "turntable" | "linear axis"

const KIND_TEXTS: Record<ModelKind, string> = {
  robot: "Robot: SupportedRobot",
  turntable: "Turntable: SupportedRobot",
  "linear axis": "Linear axis: SupportedLinearAxis",
}

/** The API omits values that are 0 */
const EMPTY_DH_PARAMETER: DHParameter = {
  a: 0,
  d: 0,
  alpha: 0,
  theta: 0,
  reverse_rotation_direction: false,
}

/** The kinematics and the home joints of a motion group model */
async function loadModel({ nova }: PlaygroundInstance, model: string) {
  const [kinematics, homeJoints] = await Promise.all([
    nova.api.motionGroupModels.getMotionGroupKinematicModel(model),
    nova.api.motionGroupModels
      .getMotionGroupHomejoints(model)
      .catch(() => undefined),
  ])
  const dhParameters = (kinematics.dh_parameters ?? []).map((parameter) => ({
    ...EMPTY_DH_PARAMETER,
    ...parameter,
  }))
  // The API can return more home joints than the model has
  const joints = dhParameters.map((_, index) => homeJoints?.[index] ?? 0)

  return {
    dhParameters,
    homeJoints: homeJoints?.length ? homeJoints : undefined,
    kind: modelKind(kinematics.inverse_solver, dhParameters),
    motionState: standstillState(joints),
  }
}

/**
 * As MotionGroupVisualizer decides it: a model without an inverse solver
 * (null) is a linear axis or a turntable, by the type of its first joint
 */
function modelKind(
  inverseSolver: string | null | undefined,
  dhParameters: DHParameter[],
): ModelKind {
  if (inverseSolver !== null) return "robot"
  return dhParameters[0]?.type === JointTypeEnum.PrismaticJoint
    ? "linear axis"
    : "turntable"
}

/** A motion state that stands still in the given joint positions */
function standstillState(joints: number[]): MotionGroupState {
  return {
    motion_group: "",
    controller: "",
    joint_position: joints,
    joint_limit_reached: { limit_reached: joints.map(() => false) },
    standstill: true,
    sequence_number: 0,
    timestamp: new Date().toISOString(),
    description_revision: 0,
  }
}
