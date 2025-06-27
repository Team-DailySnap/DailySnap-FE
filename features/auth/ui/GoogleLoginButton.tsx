import React from "react";
import { TouchableOpacity, Text } from "react-native";
import type { SocialLoginProps } from "../model/types";

export const GoogleLoginButton: React.FC<SocialLoginProps> = ({ onLoginSuccess, onLoginError }) => {
  return (
    <TouchableOpacity>
      <Text className="">구글로 시작하기</Text>
    </TouchableOpacity>
  );
};
