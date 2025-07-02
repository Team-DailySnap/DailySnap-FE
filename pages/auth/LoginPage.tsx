import React from "react";
import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SocialLoginButtons } from "@/features/auth/ui/SocialLoginButtons";
import { useAuth } from "../../features/auth/model/AuthContext";
import type { UserInfo } from "../../features/auth/model/types";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLoginSuccess = (userInfo: UserInfo) => {
    console.log("로그인 성공:", userInfo);
    login(userInfo);
    router.replace("/(tabs)/home");
  };

  const handleLoginError = (error: string) => {
    console.error("로그인 에러:", error);
    Alert.alert("로그인 실패", error, [{ text: "확인" }]);
  };

  return (
    <View className="flex-1 bg-[#195B35]">
      {/* 컨텐츠 */}
      <View className="flex-1 justify-center items-center px-4">
        <View className="mb-20">
          <Text className="text-white text-4xl font-bold text-center mb-2">DailySnap</Text>
        </View>

        {/* 소셜 로그인 버튼들 */}
        <SocialLoginButtons onLoginSuccess={handleLoginSuccess} onLoginError={handleLoginError} />
      </View>
    </View>
  );
}
