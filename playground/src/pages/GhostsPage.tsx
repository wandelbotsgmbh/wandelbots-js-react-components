import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import Typography from "@mui/material/Typography"
import { createPortal } from "@react-three/fiber"
import {
  RobotGhost,
  RobotView,
} from "@wandelbots/wandelbots-js-react-components"
import { useState } from "react"
import type { Group } from "three"
import type { PageProps } from "."

/** How far the ghosts stand from the robot: the first joint turned, in rad */
const SPREAD = 0.6

/**
 * Ghosts of the robot, as an app with stored poses draws them: the robot's
 * 3D view (RobotView) with two RobotGhosts of the session at joints of the
 * page's own, each in its own colour and opacity, and a marker the page
 * draws at one ghost's flange (its flangeRef). Everything is a public part
 * of the library; the page decides how many ghosts there are and how they
 * look.
 */
export function GhostsPage({ session }: PageProps) {
  // The ghosts stand where the robot stood when the page opened, the first
  // joint turned to either side
  const [joints] = useState(() => [
    ...session.state.rapidlyChangingMotionState.joint_position,
  ])
  const turned = (by: number) =>
    joints.map((value, index) => (index === 0 ? value + by : value))
  const [stored] = useState(() => turned(-SPREAD))
  const [target] = useState(() => turned(SPREAD))

  const [opacity, setOpacity] = useState(0.3)
  const [collides, setCollides] = useState(false)
  // A state, not a ref: the marker is drawn once the flange is there
  const [flange, setFlange] = useState<Group | null>(null)

  return (
    <Stack sx={{ position: "absolute", inset: 0 }}>
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        sx={{ px: 2, py: 1, flexWrap: "wrap" }}
      >
        <Typography variant="body2" color="text.secondary">
          Grey: a stored pose. Blue: a target, with a marker at its flange.
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" width={260}>
          <Typography variant="body2" id="ghost-opacity">
            Target opacity
          </Typography>
          <Slider
            aria-labelledby="ghost-opacity"
            value={opacity}
            min={0.1}
            max={1}
            step={0.05}
            onChange={(_, value) => setOpacity(value as number)}
            sx={{ flex: 1 }}
          />
        </Stack>
        <FormControlLabel
          control={
            <Switch
              checked={collides}
              onChange={(event) => setCollides(event.target.checked)}
            />
          }
          label="Target collides"
        />
      </Stack>
      <Box sx={{ position: "relative", flex: 1, minHeight: 0 }}>
        <Box data-testid="viewport" sx={{ position: "absolute", inset: 0 }}>
          <RobotView session={session}>
            <RobotGhost session={session} joints={stored} color="#9e9e9e" />
            <RobotGhost
              session={session}
              joints={target}
              color={collides ? "#f44336" : "#2196f3"}
              opacity={opacity}
              flangeRef={setFlange}
            />
            {flange &&
              createPortal(
                <mesh name="target marker">
                  <sphereGeometry args={[0.03]} />
                  <meshStandardMaterial color="#ffeb3b" />
                </mesh>,
                flange,
              )}
          </RobotView>
        </Box>
      </Box>
    </Stack>
  )
}
