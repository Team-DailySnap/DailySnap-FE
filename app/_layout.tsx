import NetInfo from "@react-native-community/netinfo";
import { onlineManager, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from "../shared/api/query-client";
import { AuthProvider } from "../features/auth/model/AuthContext";
import "../global.css";

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

export { default as styled } from "nativewind";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            {/* 인증 관련 스크린 */}
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />

            {/* 메인 앱 스크린  */}
            <Stack.Screen name="(tabs)" />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
