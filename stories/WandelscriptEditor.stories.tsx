import { useArgs } from "storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor, within } from "storybook/test"
import type { editor } from "monaco-editor"
import { WandelscriptEditor } from "../src"

const meta: Meta<typeof WandelscriptEditor> = {
  title: "Wandelscript/WandelscriptEditor",
  component: WandelscriptEditor,
}
export default meta

const defaultCode = `start = [832, -452, 289]  # The start position of the edge
end = [817, 168, 288]  # The end position of the edge
point_a = [602, 163, -100]  # Any point on the left plane (looking from start to end)
point_b = [1033, 173, -100]  # Any point on the right plane (looking from start to end)
radius = 20  # the desired radius of the final edge
spacing = 10  #  the distance between to zig-zag corners

n = int(distance(start, end) / spacing)

edge_poses = find_edge(start, end, point_a, start, end,point_b)
plane_orientations = {to_orientation(edge_poses[0]), to_orientation(edge_poses[1])}
center_rotation = interpolate(plane_orientations[0], plane_orientations[1], 0.5)

offset = [0, 0, -radius, 0, 0, 0]
offset_from_axis =  center_rotation ::[0, 0, distance_from_corner(edge_poses[0], edge_poses[1], radius), 0, 0, 0]:: ~center_rotation

move via p2p() to to_pose(start)::offset_from_axis :: plane_orientations[0] :: offset
for i = 0..<int(n / 2) - 1:
    a = interpolate(to_pose(start), to_pose(end),(2 * i + 1) / n )  ::offset_from_axis :: center_rotation :: offset
    b = interpolate(to_pose(start), to_pose(end),(2 * i + 2) / n )  ::offset_from_axis :: plane_orientations[modulo(i + 1, 2)] :: offset
    move via arc(a) to b
    if i == 10:
        test_pose = planned_pose()
`

export const Editor: StoryObj<typeof WandelscriptEditor> = {
  tags: ["!dev"],
  args: {
    code: defaultCode,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that the code editor is rendered
    await waitFor(
      async () => expect(canvas.getByRole("code")).toBeInTheDocument(),
      {
        timeout: 10000,
      },
    )
  },
  render: function Component(args) {
    const [, setArgs] = useArgs()

    function onChange(
      code: string | undefined,
      ev: editor.IModelContentChangedEvent,
    ) {
      if (args.onChange) {
        args.onChange(code, ev)
      } else {
        setArgs({ code })
      }
    }

    return (
      <div style={{ height: "400px" }}>
        <WandelscriptEditor {...args} onChange={onChange} />
      </div>
    )
  },
}
