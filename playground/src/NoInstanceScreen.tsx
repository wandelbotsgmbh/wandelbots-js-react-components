import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { ElevationCard } from "@wandelbots/mui"
import type { ReactNode } from "react"

/** Shown when no NOVA instance is set: the playground has no mock mode */
export function NoInstanceScreen() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%", p: 3 }}
    >
      <ElevationCard sx={{ maxWidth: 720, p: 4 }}>
        <Stack gap={2}>
          <Typography variant="h5" component="h1">
            No NOVA instance
          </Typography>
          <Typography>
            The playground works only with a real NOVA instance. Set one of
            these values, and then start the playground again:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            <li>
              <Typography>
                <Code>NOVA_INSTANCE_URL</Code> in the environment, and{" "}
                <Code>NOVA_ACCESS_TOKEN</Code> for a cloud instance:
              </Typography>
              <Code block>
                NOVA_INSTANCE_URL=http://&lt;ip&gt; pnpm playground
              </Code>
            </li>
            <li>
              <Typography>
                <Code>WANDELAPI_BASE_URL=http://&lt;ip&gt;</Code> in{" "}
                <Code>.env.local</Code>
              </Typography>
            </li>
          </Box>
          <Typography color="text.secondary">
            These are the same values as for the e2e tests. The cell is "cell";
            set <Code>CELL_ID</Code> for another cell.
          </Typography>
        </Stack>
      </ElevationCard>
    </Stack>
  )
}

function Code({ children, block }: { children: ReactNode; block?: boolean }) {
  return (
    <Box
      component={block ? "pre" : "code"}
      sx={{
        fontFamily: "monospace",
        bgcolor: "background.default",
        borderRadius: 1,
        px: 0.5,
        ...(block && { p: 1.5, my: 1, overflowX: "auto" }),
      }}
    >
      {children}
    </Box>
  )
}
