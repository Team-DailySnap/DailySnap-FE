import * as Icons from "@/assets/icons";
import type { SvgProps } from "react-native-svg";

export type IconsType = typeof Icons;

export type IconName = keyof IconsType;

export interface IconProps extends SvgProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  // eslint-disable-next-line import/namespace
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.error(`Icon with name ${name} not found`);
    return null;
  }

  return <IconComponent {...props} />;
}
