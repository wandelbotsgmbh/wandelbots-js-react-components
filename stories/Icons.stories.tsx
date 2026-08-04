import type { Meta, StoryObj } from "@storybook/react"

const ICONS_PACKAGE_URL = "https://www.npmjs.com/package/@wandelbots/icons"
const DESIGN_SYSTEM_ICONS_URL =
  "https://wandelbotsgmbh.github.io/nova-design-system/#icons"

const IconsMoved = () => (
  <div
    style={{
      background: "#020617",
      border: "1px solid rgba(142, 86, 252, 0.24)",
      borderRadius: 12,
      color: "rgba(255, 255, 255, 0.8)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: 24,
    }}
  >
    <h2 style={{ color: "#FFFFFF", margin: 0 }}>Icons have moved</h2>
    <p style={{ margin: 0 }}>
      The <code>/wb-icons</code> entry point has been removed from this library.
      Icons now live in the dedicated{" "}
      <a href={ICONS_PACKAGE_URL} style={{ color: "#B18CFF" }}>
        @wandelbots/icons
      </a>{" "}
      package.
    </p>
    <pre
      style={{
        background: "rgba(142, 86, 252, 0.06)",
        borderRadius: 8,
        margin: 0,
        padding: 12,
      }}
    >
      <code>
        {
          'import { Home } from "@wandelbots/icons/Home"\nimport { Robot } from "@wandelbots/icons/Robot"'
        }
      </code>
    </pre>
    <p style={{ margin: 0 }}>
      Browse the full icon set in the{" "}
      <a href={DESIGN_SYSTEM_ICONS_URL} style={{ color: "#B18CFF" }}>
        Nova Design System icon gallery
      </a>
      .
    </p>
  </div>
)

const meta: Meta = {
  title: "Components/Icons",
  component: IconsMoved,
  tags: ["!dev"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "The `/wb-icons` entry point has been removed. Use the dedicated [`@wandelbots/icons`](https://www.npmjs.com/package/@wandelbots/icons) package instead. Each icon is imported from its own subpath — there is no bulk export:",
          "",
          "```tsx",
          'import { Home } from "@wandelbots/icons/Home"',
          'import { Robot } from "@wandelbots/icons/Robot"',
          "```",
          "",
          "Browse the full icon set at https://wandelbotsgmbh.github.io/nova-design-system/#icons",
          "",
          "For standard UI icons (arrows, chevrons, info, etc.), use `@mui/icons-material` directly.",
        ].join("\n"),
      },
    },
  },
}

export default meta

type Story = StoryObj

export const Interactive: Story = {}
