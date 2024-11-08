import { Box, Button, Stack, Typography, useTheme } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"

import { externalizeComponent } from "../src/externalizeComponent"
import componentSamples from "./MuiSamples"

const MUIComponents = externalizeComponent(() => {
  const theme = useTheme()

  return (
    <Box
      component="div"
      sx={{
        "& .MuiStack-root:not(:first-of-type)": {
          marginTop: "2rem",
        },
        color: `${theme.palette.text.primary}`,
      }}
    >
      {componentSamples.map(({ id, title, component, docs }) => (
        <Stack key={id} id={id}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            marginBottom="1rem"
          >
            <Typography variant="h5" gutterBottom margin={0}>
              {title}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              href={docs}
              target="_blank"
              rel="noreferrer"
            >
              {"Docs"}
            </Button>
          </Stack>
          <div>{component}</div>
        </Stack>
      ))}
    </Box>
  )
})

const meta: Meta<typeof MUIComponents> = {
  tags: ["!dev", "!autodocs"],
  component: MUIComponents,
}

export default meta

type Story = StoryObj<typeof MUIComponents>

export const muiComponents: Story = {}
