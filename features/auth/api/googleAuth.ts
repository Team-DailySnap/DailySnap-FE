import * as WebBrowser from "expo-web-browser";
import axios from "axios";

const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const GOOGLE_REDIRECT_URI = process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_URI ?? "";
const SERVER_BASE_URL = process.env.EXPO_PUBLIC_SERVER_BASE_URL ?? "";

// 브라우저 로그인 결과 처리를 위한 타입
export interface GoogleAuthResult {
  type: "success" | "error" | "cancel";
  params?: {
    code?: string;
    error?: string;
  };
  error?: Error;
}

// 구글 로그인 인증 브라우저를 열고 인증 코드를 받아오는 함수
export async function signInWithGoogle(): Promise<GoogleAuthResult> {
  try {
    // OAuth URL
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent("profile email")}` +
      `&prompt=select_account`;

    // 기본 브라우저로 구글 로그인 페이지 열기. 구글로그인은 Webview보다 WebBroswer 권장.
    const result = await WebBrowser.openAuthSessionAsync(authUrl, GOOGLE_REDIRECT_URI);

    // 브라우저 결과 처리
    if (result.type === "success") {
      // URL에서 code 파라미터 추출
      const url = new URL(result.url);
      const code = url.searchParams.get("code");

      if (code) return { type: "success", params: { code } };

      const error = url.searchParams.get("error");
      return {
        type: "error",
        params: { error: error || "인증 코드를 받아오지 못했습니다." },
      };
    }

    return { type: "cancel" };
  } catch (error) {
    console.error("Google Auth Error:", error);
    return {
      type: "error",
      error: error instanceof Error ? error : new Error("알 수 없는 오류가 발생했습니다."),
    };
  }
}

// 백엔드와 통신해 사용자 정보 받아오는 함수
export async function exchangeGoogleCodeForUserInfo(code: string) {
  try {
    const response = await axios.post(`${SERVER_BASE_URL}/api/auth/google`, { code });
    return response.data;
  } catch (error) {
    console.error("Google Token Exchange Error:", error);
    throw error;
  }
}

// 구글 로그인 전체 플로우 처리
export async function handleGoogleSignIn() {
  try {
    const authResult = await signInWithGoogle();

    if (authResult.type === "success" && authResult.params?.code) {
      const userInfo = await exchangeGoogleCodeForUserInfo(authResult.params.code);
      return { success: true, user: userInfo };
    } else if (authResult.type === "cancel") {
      return { success: false, error: "로그인이 취소되었습니다." };
    } else {
      return {
        success: false,
        error: authResult.params?.error || "로그인 중 오류가 발생했습니다.",
      };
    }
  } catch (error) {
    console.error("Google Sign In Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}
