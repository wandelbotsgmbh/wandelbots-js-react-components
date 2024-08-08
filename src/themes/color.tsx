import { Box, Typography, useTheme } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"

export function ColorSection(props: { name: string; children: ReactNode }) {
  return (
    <>
      <Typography
        component="h2"
        sx={{
          marginTop: "1rem",
        }}
      >
        {props.name}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {props.children}
      </Box>
    </>
  )
}

export function Color({ name, color }: { name: string; color: string }) {
  const theme = useTheme()
  const [showCopied, setShowCopied] = useState(false)

  function handleClick(value: string) {
    if (!navigator.clipboard) {
      console.error("can't send value to clipboard")
      return
    }
    navigator.clipboard.writeText(value)
    setShowCopied(true)
  }

  useEffect(() => {
    if (showCopied) {
      setTimeout(() => {
        setShowCopied(false)
      }, 2000)
    }
  }, [showCopied])

  return (
    <li
      onClick={() => handleClick(color)}
      style={{
        borderRadius: "5px",
        border: "1px solid lightgray",
        padding: "5px",
        listStyleType: "none",
        width: "200px",
      }}
    >
      <span
        style={{
          backgroundColor: color,
          display: "block",
          height: "4em",
          marginBottom: "0.3em",
          borderRadius: "5px",
          // border: "1px solid lightgray",
        }}
      />
      <Typography component="span">{name}</Typography>
      <br />
      <Typography
        style={{
          opacity: 0.7,
          fontSize: "0.9em",
          fontFamily: "monospace",
        }}
      >
        {showCopied ? "Copied ✔︎" : color}
      </Typography>
    </li>
  )
}
