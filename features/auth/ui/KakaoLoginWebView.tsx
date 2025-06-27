import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { WebViewNavigation } from "react-native-webview";
import WebView from "react-native-webview";
import axios from "axios";

// kakao developer 환경변수에서 카카오 API 키와 서버 URL을 가져옴
const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
const SERVER_BASE_URL = process.env.EXPO_PUBLIC_SERVER_BASE_URL;
const REDIRECT_URI = `${SERVER_BASE_URL}/api/auth/login`;

interface KakaoLoginWebViewProps {
  onLoginSuccess: (userInfo: any) => void;
  onLoginError: (error: any) => void;
  onClose: () => void;
}

export function KakaoLoginWebView({
  onLoginSuccess,
  onLoginError,
  onClose,
}: KakaoLoginWebViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);

  // 카카오 인증 코드를 받아서 액세스 토큰으로 교환하고 사용자 정보를 가져오는 함수
  const requestToken = async (code: string) => {
    try {
      setIsLoading(true);

      // 1단계: 인증 코드를 액세스 토큰으로 교환
      const tokenResponse = await axios({
        method: "POST",
        url: "https://kauth.kakao.com/oauth/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: KAKAO_REST_API_KEY!,
          redirect_uri: REDIRECT_URI,
          code,
        }),
      });

      console.log("토큰 응답:", tokenResponse.data);
      const kakaoAccessToken = tokenResponse.data.access_token;

      // 2단계: 액세스 토큰으로 카카오 사용자 정보 조회
      const userResponse = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
        url: "https://kapi.kakao.com/v2/user/me",
      });

      console.log("user 응답:", userResponse.data);

      // 받아온 사용자 정보를 앱에서 사용할 형태로 변환
      const userInfo = {
        id: userResponse.data.id,
        email: userResponse.data.kakao_account?.email,
        nickname: userResponse.data.kakao_account?.profile?.nickname,
        profileImage: userResponse.data.kakao_account?.profile?.profile_image_url,
        accessToken: kakaoAccessToken,
      };

      onLoginSuccess(userInfo);
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
      onLoginError(error);
      Alert.alert("로그인 실패", "카카오 로그인 중 오류가 발생했습니다.", [
        { text: "확인", onPress: onClose },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 웹뷰의 URL이 변경될 때마다 호출되는 함수
  const handleNavigationChangeState = (event: WebViewNavigation) => {
    console.log("Navigation state change:", event.url);

    // 리다이렉트 URL에 인증 코드가 포함되어 있는지 확인
    if (event.url.includes(`${REDIRECT_URI}?code=`)) {
      const urlParams = new URLSearchParams(event.url.split("?")[1]);
      const code = urlParams.get("code");

      if (code) {
        console.log("Authorization code received:", code);
        setIsLoading(true);
        // 인증 코드를 카카오에서 받아서, 토큰 교환 함수 호출
        requestToken(code);
        return;
      }
    }

    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView className="flex-1">
      {(isLoading || isChangeNavigate) && (
        <View className="absolute w-full h-screen bg-white pb-24 items-center justify-center z-10">
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript="window.ReactNativeWebView.postMessage('')"
        onNavigationStateChange={handleNavigationChangeState}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        allowsBackForwardNavigationGestures={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        bounces={true}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        decelerationRate="normal"
        allowsFullscreenVideo={false}
        allowsProtectedMedia={false}
        dataDetectorTypes="none"
        {...(Platform.OS === "ios" && {
          allowsLinkPreview: false,
          automaticallyAdjustContentInsets: false,
        })}
      />
    </SafeAreaView>
  );
}
