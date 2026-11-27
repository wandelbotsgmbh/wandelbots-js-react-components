/**
 * The data types of the Robot control panel that other parts use too (the
 * pose bar): on their own, so that such a part does not load the panel.
 */

/** Whether a jog moves the TCP along the axes or turns it about them */
export type JogMotion = "translate" | "rotate"

/** A choice of one of the panel's selects */
export type RobotControlOption = {
  id: string
  /** As shown, e.g. "Flange" */
  label: string
}

/** A select of the panel, e.g. the TCP: the app gives its choices */
export type RobotControlSelect = {
  options: RobotControlOption[]
  /** The `id` of the chosen option */
  value: string
  onChange: (id: string) => void
}

/**
 * A pose of the TCP: the position in mm and the orientation as a rotation
 * vector in rad, as NOVA gives it
 */
export type RobotControlPose = {
  position: [number, number, number]
  orientation: [number, number, number]
}

/**
 * Joint values as a target of Move to, one per joint: in rad, or in mm for
 * a linear axis
 */
export type RobotControlJointTarget = { joints: number[] }

/** Where Move to goes: a pose of the TCP, or joint values */
export type RobotControlTarget = RobotControlPose | RobotControlJointTarget
