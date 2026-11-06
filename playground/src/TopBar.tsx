import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { AdornedSelect } from "@wandelbots/mui"
import {
  AppHeader,
  type ConnectedMotionGroup,
  SafetyBar,
} from "@wandelbots/wandelbots-js-react-components"
import { observer } from "mobx-react-lite"
import type { PlaygroundInstance } from "./instance"
import { isPageId, PAGES, type PageId, pageById } from "./pages"

type TopBarProps = {
  instance: PlaygroundInstance
  page: PageId
  onPageChange: (page: PageId) => void
  /** All motion groups of the cell, undefined while they load */
  motionGroupIds: string[] | undefined
  /** The selected motion group, undefined when the cell has none */
  motionGroupId: string | undefined
  onMotionGroupChange: (motionGroupId: string) => void
  /** The selected motion group, undefined while it connects */
  motionGroup: ConnectedMotionGroup | undefined
}

/**
 * The top bar of every page: AppHeader (its app menu switches the pages), the
 * motion group select and the SafetyBar of the selected motion group.
 */
export const TopBar = observer(function TopBar({
  instance,
  page,
  onPageChange,
  motionGroupIds = [],
  motionGroupId,
  onMotionGroupChange,
  motionGroup,
}: TopBarProps) {
  const current = pageById(page)
  // A motion group of the URL that is not in the cell stays visible
  const options =
    motionGroupId && !motionGroupIds.includes(motionGroupId)
      ? [...motionGroupIds, motionGroupId]
      : motionGroupIds

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={2}
      sx={{
        pr: 2,
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <AppHeader
        appIcon={current.icon}
        appName={current.name}
        apps={PAGES.map(({ id, name, icon }) => ({ id, name, icon }))}
        onAppSelect={(app) => {
          if (isPageId(app.id)) onPageChange(app.id)
        }}
        sx={{ flex: 1, minWidth: 0 }}
      />

      <Typography variant="body2" color="text.secondary" noWrap>
        {instance.url}, cell "{instance.cellId}"
      </Typography>

      <AdornedSelect
        adornedSize="small"
        fullWidth={false}
        placeholder="Motion group"
        value={motionGroupId ?? ""}
        onChange={(event) => onMotionGroupChange(String(event.target.value))}
        disabled={options.length === 0}
        sx={{ minWidth: 220 }}
      >
        {options.map((id) => (
          <MenuItem key={id} value={id}>
            {motionGroupIds.includes(id) ? id : `${id} (not in the cell)`}
          </MenuItem>
        ))}
      </AdornedSelect>

      {motionGroup && (
        <SafetyBar
          isVirtual={motionGroup.isVirtual}
          motionGroupId={motionGroup.motionGroupId}
          operationMode={motionGroup.controllerState.operation_mode}
          safetyState={motionGroup.controllerState.safety_state}
        />
      )}
    </Stack>
  )
})
