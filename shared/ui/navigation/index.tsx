import { basicColors } from "@/shared/tokens/colors";

export const DefaultNavigationOptions = {
  tabBarActiveTintColor: basicColors.green100,
  tabBarInactiveTintColor: basicColors.green50,
  tabBarIconStyle: {
    marginTop: 4,
    marginBottom: 4,
    width: 32,
    height: 32,
  },
  tabBarStyle: {
    position: "absolute",
    paddingHorizontal: 34,
    borderRadius: 24, // 모서리 둥글기
    height: 100, // 탭바 높이
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
  headerShown: false,
} as const;
