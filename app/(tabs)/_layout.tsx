import { Icon } from "@/shared/ui/icon";
import { DefaultNavigationOptions } from "@/shared/ui/navigation";
import { Tabs } from "expo-router";
import { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const screenOptions = useMemo(() => {
    return {
      ...DefaultNavigationOptions,
    };
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen
          name="home"
          options={{
            title: "홈",
            tabBarIcon: ({ focused }) => <Icon name={focused ? "home_active" : "home"} />,
          }}
        />
        <Tabs.Screen
          name="archive"
          options={{
            title: "아카이빙",
            tabBarIcon: ({ focused }) => <Icon name={focused ? "archving_active" : "archving"} />,
          }}
        />
        <Tabs.Screen
          name="upload"
          options={{
            title: "업로드",
            tabBarIcon: ({ focused }) => <Icon name={focused ? "uploading_active" : "uploading"} />,
          }}
        />
        <Tabs.Screen
          name="awards"
          options={{
            title: "우수작",
            tabBarIcon: ({ focused }) => <Icon name={focused ? "ranking_active" : "ranking"} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "마이",
            tabBarIcon: ({ focused }) => <Icon name={focused ? "my_active" : "my"} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
