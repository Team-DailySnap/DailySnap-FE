import { useState } from "react";
import { ActivityIndicator, Alert, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { WebViewNavigation } from "react-native-webview";
import WebView from "react-native-webview";
import axios from "axios";

// 환경변수에서 env파일에서 가져옴
const NAVER_CLIENT_ID = process.env.EXPO_PUBLIC_NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET;
const NAVER_REDIRECT_URI = process.env.EXPO_PUBLIC_NAVER_REDIRECT_URI;

interface NaverLoginWebViewProps {
  onLoginSuccess: (userInfo: any) => void;
  onLoginError: (error: any) => void;
  onClose: () => void;
}

export function NaverLoginWebView({
  onLoginSuccess,
  onLoginError,
  onClose,
}: NaverLoginWebViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);

  // CSRF 방지를 위한 state 값 생성 (랜덤 문자열)
  const STATE = Math.random().toString(36).substring(2, 15);

  // 인증 코드를 받아서 액세스 토큰으로 교환하고 사용자 정보를 가져옵니다.
  const requestToken = async (code: string, state: string) => {
    try {
      setIsLoading(true);

      // 1: 인증 코드를 액세스 토큰으로 교환
      const tokenResponse = await axios({
        method: "POST",
        url: "https://nid.naver.com/oauth2.0/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: NAVER_CLIENT_ID!,
          client_secret: NAVER_CLIENT_SECRET!,
          code,
          state,
        }),
      });

      const accessToken = tokenResponse.data.access_token;

      // 2: 액세스 토큰으로 네이버 사용자 정보 조회
      const userResponse = await axios({
        method: "GET",
        url: "https://openapi.naver.com/v1/nid/me",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { response } = userResponse.data;

      const userInfo = {
        id: response.id,
        email: response.email,
        name: response.name,
        nickname: response.nickname,
        profileImage: response.profile_image,
        accessToken,
      };

      onLoginSuccess(userInfo);
    } catch (error: any) {
      console.error("네이버 로그인 에러:", error);
      onLoginError(error);
      Alert.alert("로그인 실패", "네이버 로그인 중 오류가 발생했습니다.", [
        { text: "확인", onPress: onClose },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // WebView URL 변경 처리
  const handleNavigationChangeState = (event: WebViewNavigation) => {
    console.log("▶️ URL 변화", event.url);
    // 네이버에서 리다이렉트될 때, redirect_uri?code=...&state=... 형태
    if (event.url.startsWith(`${NAVER_REDIRECT_URI}?`) && event.url.includes("code=")) {
      const urlParams = new URLSearchParams(event.url.split("?")[1]);
      const code = urlParams.get("code");
      const state = urlParams.get("state") ?? STATE;
      if (code) {
        requestToken(code, state);
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
          uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
            NAVER_REDIRECT_URI!
          )}&state=${STATE}`,
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
