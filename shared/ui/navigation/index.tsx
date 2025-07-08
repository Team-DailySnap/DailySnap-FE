import { basicColors } from "@/shared/tokens/colors";

export const DefaultNavigationOptions = {
  tabBarActiveTintColor: basicColors.green100,
  tabBarInactiveTintColor: basicColors.green50,
  tabBarIconStyle: {
    marginBottom: 4,
    width: 32,
    height: 32,
  },
  tabBarStyle: {
    paddingHorizontal: 34,
    backgroundColor: basicColors.beige,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
  headerShown: false,
} as const;
