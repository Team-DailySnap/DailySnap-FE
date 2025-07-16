import React, { useState } from "react";
import { TouchableOpacity, Text, Alert, ActivityIndicator } from "react-native";
import type { SocialLoginProps } from "../model/types";
import { handleGoogleSignIn } from "../api/googleAuth";

export const GoogleLoginButton: React.FC<SocialLoginProps> = ({ onLoginSuccess, onLoginError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const result = await handleGoogleSignIn();

      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else {
        onLoginError(result.error || "구글 로그인 중 오류가 발생했습니다.");
        Alert.alert("로그인 실패", result.error || "구글 로그인 중 오류가 발생했습니다.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      onLoginError(errorMessage);
      Alert.alert("로그인 실패", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      className="w-full bg-white border border-gray-300 py-4 rounded-xl items-center justify-center flex-row"
      onPress={handleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#4285F4" />
      ) : (
        <Text className="text-black font-semibold text-base">구글로 시작하기</Text>
      )}
    </TouchableOpacity>
  );
};
