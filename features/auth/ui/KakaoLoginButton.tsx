import React, { useState } from "react";
import { TouchableOpacity, Text, Modal } from "react-native";
import { KakaoLoginWebView } from "./KakaoLoginWebView";
import type { SocialLoginProps } from "../model/types";

export const KakaoLoginButton: React.FC<SocialLoginProps> = ({ onLoginSuccess, onLoginError }) => {
  const [isShowWebView, setIsShowWebView] = useState(false);

  const handleKakaoLogin = () => {
    setIsShowWebView(true);
  };

  const handleLoginSuccess = (userInfo: any) => {
    console.log("카카오 로그인 성공:", userInfo);
    setIsShowWebView(false);
    onLoginSuccess(userInfo);
  };

  const handleLoginError = (error: any) => {
    console.error("카카오 로그인 실패:", error);
    setIsShowWebView(false);
    onLoginError(typeof error === "string" ? error : "카카오 로그인 중 오류가 발생했습니다.");
  };

  const handleClose = () => {
    setIsShowWebView(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleKakaoLogin}
        className="w-full bg-[#FEE500] py-4  rounded-xl items-center justify-center"
      >
        <Text className="text-black font-semibold text-base">카카오로 시작하기</Text>
      </TouchableOpacity>

      <Modal visible={isShowWebView} animationType="slide" presentationStyle="pageSheet">
        <KakaoLoginWebView
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
          onClose={handleClose}
        />
      </Modal>
    </>
  );
};
