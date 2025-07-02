import React from "react";
import { TouchableOpacity, Text } from "react-native";
import type { SocialLoginProps } from "../model/types";

export const NaverLoginButton: React.FC<SocialLoginProps> = ({ onLoginSuccess, onLoginError }) => {
  return (
    <TouchableOpacity>
      <Text>네이버로 시작하기</Text>
    </TouchableOpacity>
  );
};
