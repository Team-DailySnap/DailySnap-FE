import React from "react";
import { View } from "react-native";
import { KakaoLoginButton } from "./KakaoLoginButton";
import { NaverLoginButton } from "./NaverLoginButton";
import { GoogleLoginButton } from "./GoogleLoginButton";
import type { SocialLoginProps } from "../model/types";

export const SocialLoginButtons: React.FC<SocialLoginProps> = ({
  onLoginSuccess,
  onLoginError,
}) => {
  return (
    <View className="w-full max-w-sm space-y-3">
      {/* 카카오 로그인 */}
      <KakaoLoginButton onLoginSuccess={onLoginSuccess} onLoginError={onLoginError} />

      {/* 네이버 로그인 */}
      <NaverLoginButton onLoginSuccess={onLoginSuccess} onLoginError={onLoginError} />

      {/* 구글 로그인 */}
      <GoogleLoginButton onLoginSuccess={onLoginSuccess} onLoginError={onLoginError} />
    </View>
  );
};
