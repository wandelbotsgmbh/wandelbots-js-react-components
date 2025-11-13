import { Manufacturer } from "@wandelbots/nova-js/v2"

/**
 * Default home configs for different robot manufacturers.
 * These joint configurations represent safe home configs for each manufacturer's robots.
 * All angles are in radians.
 */
export const MANUFACTURER_HOME_CONFIGS: Record<Manufacturer, number[]> = {
  [Manufacturer.Abb]: [0.0, 0.0, 0.0, 0.0, Math.PI / 2, 0.0, 0.0],
  [Manufacturer.Fanuc]: [0.0, 0.0, 0.0, 0.0, -Math.PI / 2, 0.0, 0.0],
  [Manufacturer.Yaskawa]: [0.0, 0.0, 0.0, 0.0, -Math.PI / 2, 0.0, 0.0],
  [Manufacturer.Kuka]: [
    0.0,
    -Math.PI / 2,
    Math.PI / 2,
    0.0,
    Math.PI / 2,
    0.0,
    0.0,
  ],
  [Manufacturer.Universalrobots]: [
    0.0,
    -Math.PI / 2,
    -Math.PI / 2,
    -Math.PI / 2,
    Math.PI / 2,
    -Math.PI / 2,
    0.0,
  ],
}

/**
 * Extracts manufacturer from modelFromController string.
 * @param modelFromController - String in format "Manufacturer_ModelName"
 * @returns Manufacturer enum value or null if not recognized
 */
export function extractManufacturer(
  modelFromController: string,
): Manufacturer | null {
  const [manufacturerString] = modelFromController.split("_")

  // Handle the mapping from string to enum
  switch (manufacturerString) {
    case "ABB":
      return Manufacturer.Abb
    case "FANUC":
      return Manufacturer.Fanuc
    case "YASKAWA":
      return Manufacturer.Yaskawa
    case "KUKA":
      return Manufacturer.Kuka
    case "UniversalRobots":
      return Manufacturer.Universalrobots
    default:
      return null
  }
}

/**
 * Gets the default home config for a robot based on its model identifier.
 * @param modelFromController - String in format "Manufacturer_ModelName"
 * @param defaultJointConfig - Optional custom default configuration to use if manufacturer not found
 * @returns Array of joint positions in radians, or null if no configuration available
 */
export function getDefaultHomeConfig(
  modelFromController: string,
  defaultJointConfig?: number[],
): number[] | null {
  const manufacturer = extractManufacturer(modelFromController)

  if (manufacturer && manufacturer in MANUFACTURER_HOME_CONFIGS) {
    return MANUFACTURER_HOME_CONFIGS[manufacturer]
  }

  return defaultJointConfig || null
}
