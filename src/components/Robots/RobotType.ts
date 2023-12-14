export type RobotType = "ur5e" | "ur10e" | "ar1440" | "ar2010";

export function parseRobotType(input: string): RobotType {
  const i = input.toLowerCase();
  if (i.includes("ur10")) {
    return "ur10e";
  }
  if (i.includes("ur5")) {
    return "ur5e";
  }
  if (i.includes("ar1440")) {
    return "ar1440";
  }
  if (i.includes("ar2010")) {
    return "ar2010";
  }
  return "ur10e";
}
