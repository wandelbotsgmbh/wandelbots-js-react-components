## Connect to a motion group

The library provides an easy to use way to access properties of a motion group.

```ts
import { NovaClient, ConnectedMotionGroup } from "@wandelbots/nova-js/v2"

const nova = new NovaClient({ instanceUrl: "nova-instance-url" })
const activeRobot = await ConnectedMotionGroup.connect(nova, "motion-group-id")
```

This connected motion group opens a websocket and listens to changes of the current joints and the TCP pose. You can read out those values by using the `rapidlyChangingMotionState` of the object. Along other properties it also provides the current `safetySetup` and `tcps`.

```ts
const newJoints = activeRobot.rapidlyChangingMotionState.joint_position
```

**Api V2 change:** Please not that joints are now directly accessible in `rapidlyChangingMotionState.joint_position`, previously there were nested in `.rapidlyChangingMotionState.state.joint_position.joints`.
