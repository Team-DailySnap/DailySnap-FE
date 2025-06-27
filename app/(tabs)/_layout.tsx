import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "홈",
        }}
      />

      <Tabs.Screen
        name="archive"
        options={{
          title: "아카이브",
        }}
      />

      <Tabs.Screen
        name="upload"
        options={{
          title: "업로드",
        }}
      />

      <Tabs.Screen
        name="awards"
        options={{
          title: "우수작",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "마이",
        }}
      />
    </Tabs>
  );
}
