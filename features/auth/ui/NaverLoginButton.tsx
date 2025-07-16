import React, { useState } from "react";
import { TouchableOpacity, Text, Modal } from "react-native";
import { NaverLoginWebView } from "./NaverLoginWebView";
import type { SocialLoginProps } from "../model/types";

export const NaverLoginButton: React.FC<SocialLoginProps> = ({ onLoginSuccess, onLoginError }) => {
  const [showWebView, setShowWebView] = useState(false);

  const handleNaverLogin = () => {
    setShowWebView(true);
  };

  const handleLoginSuccess = (userInfo: any) => {
    console.log("네이버 로그인 성공:", userInfo);
    setShowWebView(false);
    onLoginSuccess(userInfo);
  };

  const handleLoginError = (error: any) => {
    console.error("네이버 로그인 실패:", error);
    setShowWebView(false);
    onLoginError(typeof error === "string" ? error : "네이버 로그인 중 오류가 발생했습니다.");
  };

  const handleClose = () => {
    setShowWebView(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleNaverLogin}
        className="w-full bg-[#03C75A] py-4 rounded-xl items-center justify-center"
      >
        <Text className="text-white font-semibold text-base">네이버로 시작하기</Text>
      </TouchableOpacity>

      <Modal visible={showWebView} animationType="slide" presentationStyle="pageSheet">
        <NaverLoginWebView
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
          onClose={handleClose}
        />
      </Modal>
    </>
  );
};
