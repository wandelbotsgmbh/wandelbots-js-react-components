import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { LinkFilled } from "@wandelbots/icons/LinkFilled"
import { NotificationsFilled } from "@wandelbots/icons/NotificationsFilled"
import {
  ConnectionWarning,
  RobotHeader,
  type RobotSession,
} from "@wandelbots/wandelbots-js-react-components"
import { useState } from "react"
import type { PlaygroundInstance } from "../instance"
import { RobotPadIcon } from "../RobotPadIcon"
import { isPageId, PAGES, type PageId } from "."

/**
 * RobotHeader as Robot Pad's top bar: the app menu opens the playground's
 * pages, the select picks the motion group, and the safety state and the
 * activation switch are the session's
 */
export function RobotHeaderDemo({
  instance,
  session,
  motionGroupIds,
  onMotionGroupChange,
  onPageChange,
}: {
  instance: PlaygroundInstance
  session: RobotSession
  motionGroupIds: string[]
  onMotionGroupChange: (motionGroupId: string) => void
  onPageChange: (page: PageId) => void
}) {
  const [notifications, setNotifications] = useState<HTMLElement | null>(null)

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
        value: session.motionGroupId,
        onChange: onMotionGroupChange,
      }}
      session={session}
      actions={
        <>
          {/* As RobotPad: when the robot's live state stops arriving */}
          <ConnectionWarning session={session} />
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
}
