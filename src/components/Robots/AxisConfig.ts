export interface AxisConfig {
  axis_1: number;
  axis_2: number;
  axis_3: number;
  axis_4: number;
  axis_5: number;
  axis_6: number;
  useSkill: boolean;
  showCalibrationPoints: boolean;
}

export const defaultAxisConfig: AxisConfig = {
  axis_1: 2 * Math.PI,
  axis_2: 2 * Math.PI,
  axis_3: 2 * Math.PI,
  axis_4: 2 * Math.PI,
  axis_5: 2 * Math.PI,
  axis_6: 2 * Math.PI,
  useSkill: false,
  showCalibrationPoints: false,
};
