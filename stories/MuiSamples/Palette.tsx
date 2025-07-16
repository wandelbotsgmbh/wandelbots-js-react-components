import { Box, Grid, Tooltip, Typography, type Theme } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import React from "react"

const colorCategories: Array<
  keyof Theme["palette"] | keyof Theme["paletteExt"]
> = [
  "primary",
  "secondary",
  "tertiary",
  "error",
  "warning",
  "info",
  "success",
  "grey",
  "text",
  "background",
  "action",
  "common",
  "backgroundPaperElevation",
]

const PaletteOverview: React.FC = () => {
  const theme = useTheme()

  return (
    <Box component="div" sx={{ width: 1 }}>
      {colorCategories.map((category) => (
        <Box component="div" key={category} sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "0",
              justifyContent: "flex-start",
              alignItems: "baseline",
            }}
          >
            {theme.palette[category] &&
              Object.keys(theme.palette[category]).map((shade) => (
                <Grid key={shade} sx={{ alignItems: "center" }}>
                  <Typography variant="body2">{shade}</Typography>
                  <Tooltip title={(theme.palette[category] as any)[shade]}>
                    <Box
                      component="div"
                      sx={{
                        bgcolor: (theme.palette[category] as any)[shade],
                        width: 40,
                        height: 20,
                      }}
                    />
                  </Tooltip>
                </Grid>
              ))}
            {category === "primary" &&
              theme.paletteExt?.primary &&
              Object.keys(theme.paletteExt.primary).map((shade) => (
                <Grid key={shade} sx={{ alignItems: "center" }}>
                  <Typography variant="body2">{shade}</Typography>
                  <Tooltip title={(theme.paletteExt?.primary as any)?.[shade]}>
                    <Box
                      component="div"
                      sx={{
                        bgcolor:
                          (theme.paletteExt?.primary as any)?.[shade] ??
                          "transparent",
                        width: 40,
                        height: 20,
                      }}
                    />
                  </Tooltip>
                </Grid>
              ))}
            {category === "secondary" &&
              theme.paletteExt?.secondary &&
              Object.keys(theme.paletteExt.secondary).map((shade) => (
                <Grid key={shade} sx={{ alignItems: "center" }}>
                  <Typography variant="body2">{shade}</Typography>
                  <Tooltip
                    title={(theme.paletteExt?.secondary as any)?.[shade]}
                  >
                    <Box
                      component="div"
                      sx={{
                        bgcolor:
                          (theme.paletteExt?.secondary as any)?.[shade] ??
                          "transparent",
                        width: 40,
                        height: 20,
                      }}
                    />
                  </Tooltip>
                </Grid>
              ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default PaletteOverview
