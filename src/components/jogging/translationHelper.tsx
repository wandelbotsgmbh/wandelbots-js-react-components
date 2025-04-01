import { useTranslation } from "react-i18next"

export const getTabTranslation = (tab: string): string => {
  const { t } = useTranslation()
  if (tab === "cartesian") {
    return t("Jogging.Cartesian.bt")
  }

  return t("Jogging.Joints.bt")
}
