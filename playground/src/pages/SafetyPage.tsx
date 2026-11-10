import MenuItem from "@mui/material/MenuItem"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { AdornedSelect } from "@wandelbots/mui"
import {
  CollisionSceneRenderer,
  JoggingPanel,
  SafetyZonesRenderer,
} from "@wandelbots/wandelbots-js-react-components"
import { useState } from "react"
import { useAsync } from "../connections"
import {
  FitCamera,
  MotionGroupModel,
  NovaCoordinates,
  ViewPanel,
  Viewport,
  ViewWithSidePanel,
} from "../scene"
import type { PageProps } from "."

/**
 * The robot with the safety zones of its motion group description and a
 * collision setup of the cell, next to the JoggingPanel.
 */
export function SafetyPage({ instance, motionGroup }: PageProps) {
  const theme = useTheme()
  const collisionSetups = useAsync(instance.cellId, (cellId) =>
    instance.nova.api.storeCollisionSetups.listStoredCollisionSetups(cellId),
  )
  const setupIds = Object.keys(collisionSetups.value ?? {})
  const [selectedSetupId, setSelectedSetupId] = useState<string>()
  const setupId = selectedSetupId ?? setupIds[0]
  const setup = setupId ? collisionSetups.value?.[setupId] : undefined
  const safetyZoneCount = Object.keys(motionGroup.safetyZones ?? {}).length

  function renderSetupNote() {
    if (collisionSetups.error !== undefined) {
      return `The collision setups could not load: ${String(collisionSetups.error)}`
    }
    if (!collisionSetups.value) return "Loading the collision setups..."
    if (setupIds.length === 0) {
      return `The cell "${instance.cellId}" has no stored collision setups.`
    }
    return `${Object.keys(setup?.colliders ?? {}).length} colliders`
  }

  const view = (
    <>
      <Viewport>
        {/* The camera fits the robot, the safety zones and the colliders */}
        <FitCamera>
          {(refit) => (
            <>
              <MotionGroupModel
                motionGroup={motionGroup}
                onModelLoaded={refit}
              />
              <NovaCoordinates>
                <SafetyZonesRenderer
                  safetyZones={motionGroup.safetyZones}
                  dhParameters={motionGroup.dhParameters}
                />
                {setup && (
                  <CollisionSceneRenderer
                    scene={setup}
                    meshChildrenProvider={() => (
                      <meshStandardMaterial
                        color={theme.palette.tertiary.main}
                        opacity={0.5}
                        transparent
                      />
                    )}
                  />
                )}
              </NovaCoordinates>
            </>
          )}
        </FitCamera>
      </Viewport>
      <ViewPanel>
        <Typography variant="subtitle2">Safety zones</Typography>
        <Typography variant="body2" color="text.secondary">
          {safetyZoneCount > 0
            ? `${safetyZoneCount} safety zones in the description of ${motionGroup.motionGroupId}`
            : `The description of ${motionGroup.motionGroupId} has no safety zones.`}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Collision setup
        </Typography>
        {setupIds.length > 0 && (
          <AdornedSelect
            adornedSize="small"
            value={setupId}
            onChange={(event) => setSelectedSetupId(String(event.target.value))}
            inputProps={{ "aria-label": "Collision setup" }}
          >
            {setupIds.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </AdornedSelect>
        )}
        <Typography variant="body2" color="text.secondary">
          {renderSetupNote()}
        </Typography>
      </ViewPanel>
    </>
  )

  return (
    <ViewWithSidePanel
      view={view}
      panel={
        <JoggingPanel
          nova={instance.nova}
          motionGroupId={motionGroup.motionGroupId}
          cellId={instance.cellId}
          sx={{ height: "100%" }}
        />
      }
    />
  )
}
