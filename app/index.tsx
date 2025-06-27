/*eslint-disable */
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../features/auth/model/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function App() {
  const router = useRouter();
  const { userInfo } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInfo) {
        // 로그인된 사용자면, 홈 네비게이션으로 이동
        router.replace("/(tabs)/home");
      } else {
        // 로그인되지 않았으면 로그인 페이지로 이동
        router.replace("/login");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [userInfo, router]);

  // 로딩 화면 표시. TODO: 추후에 디자인 된 로딩스피너로 수정
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#195B35" />
    </View>
  );
}
