import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { LinkFilled } from "@wandelbots/icons/LinkFilled"
import { NotificationsFilled } from "@wandelbots/icons/NotificationsFilled"
import {
  type ConnectedMotionGroup,
  RobotHeader,
  type RobotHeaderActivationState,
} from "@wandelbots/wandelbots-js-react-components"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import type { PlaygroundInstance } from "../instance"
import { RobotPadIcon } from "../RobotPadIcon"
import { isPageId, PAGES, type PageId } from "."

/**
 * RobotHeader as Robot Pad's top bar: the app menu opens the playground's
 * pages, the select picks the motion group, and the switch activates the
 * robot as RobotPad does (the controller's default mode)
 */
export const RobotHeaderDemo = observer(
  ({
    instance,
    motionGroup,
    motionGroupIds,
    onMotionGroupChange,
    onPageChange,
  }: {
    instance: PlaygroundInstance
    motionGroup: ConnectedMotionGroup
    motionGroupIds: string[]
    onMotionGroupChange: (motionGroupId: string) => void
    onPageChange: (page: PageId) => void
  }) => {
    const activation = useActivation(instance, motionGroup)
    const [notifications, setNotifications] = useState<HTMLElement | null>(null)
    const { safety_state, operation_mode } = motionGroup.controllerState

    return (
      <RobotHeader
        appIcon={<RobotPadIcon />}
        appName="Robot Pad"
        apps={PAGES.map(({ id, name, icon }) => ({ id, name, icon }))}
        onAppSelect={(app) => {
          if (isPageId(app.id)) onPageChange(app.id)
        }}
        motionGroup={{
          options: motionGroupIds.map((id) => ({ id, label: id })),
          value: motionGroup.motionGroupId,
          onChange: onMotionGroupChange,
        }}
        safety={{
          isVirtual: motionGroup.isVirtual,
          motionGroupId: motionGroup.motionGroupId,
          operationMode: operation_mode,
          safetyState: safety_state,
        }}
        activation={{
          ...activation,
          // As RobotPad: not at an emergency stop or another stop
          disabled: safety_state !== "SAFETY_STATE_NORMAL",
        }}
        actions={
          <>
            <IconButton
              aria-label="Notifications"
              onClick={(event) => setNotifications(event.currentTarget)}
              sx={(theme) => ({
                width: "30px",
                height: "30px",
                padding: "5px",
                borderRadius: "10px",
                border: `1px solid ${theme.palette.divider}`,
                background: theme.paletteExt?.secondary?.tonal,
                "& svg": { width: "20px", height: "20px" },
              })}
            >
              <NotificationsFilled />
            </IconButton>
            <Menu
              anchorEl={notifications}
              open={notifications !== null}
              onClose={() => setNotifications(null)}
            >
              <MenuItem disabled>No notifications</MenuItem>
            </Menu>
            {/* As RobotPad: the cell's page of the settings app */}
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<LinkFilled />}
              href={`${instance.url}/settings/cells/${instance.cellId}`}
              target="_blank"
            >
              Add robot
            </Button>
          </>
        }
      />
    )
  },
)

/**
 * RobotPad's activation: the robot is active while its controller is in
 * control mode; the switch sets the controller's default mode and waits
 * for the controller to report it
 */
function useActivation(
  instance: PlaygroundInstance,
  motionGroup: ConnectedMotionGroup,
) {
  const [changing, setChanging] = useState<
    "activating" | "deactivating" | null
  >(null)
  const active = motionGroup.controllerState.mode === "MODE_CONTROL"
  // The change ends when the controller reports the mode it asked for
  const done =
    (changing === "activating" && active) ||
    (changing === "deactivating" && !active)
  const state: RobotHeaderActivationState =
    changing && !done ? changing : active ? "active" : "inactive"
  // Done: a later change of the mode, e.g. by another app, shows as it is
  useEffect(() => {
    if (done) setChanging(null)
  }, [done])

  async function onToggle() {
    const activate = !active
    setChanging(activate ? "activating" : "deactivating")
    try {
      await instance.nova.api.controller.setDefaultMode(
        instance.cellId,
        motionGroup.controllerId,
        activate ? "ROBOT_SYSTEM_MODE_CONTROL" : "ROBOT_SYSTEM_MODE_MONITOR",
      )
    } catch (error) {
      console.error("Changing the controller's mode failed:", error)
      setChanging(null)
    }
  }

  return { state, onToggle: () => void onToggle() }
}
