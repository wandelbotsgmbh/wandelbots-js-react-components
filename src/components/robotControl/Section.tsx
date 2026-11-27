import Stack from "@mui/material/Stack"
import type { ReactNode } from "react"

/** A section of a tab of the panel, spaced as in the design */
export function Section({ children }: { children: ReactNode }) {
  return <Stack sx={{ padding: "16px 20px", gap: "16px" }}>{children}</Stack>
}
