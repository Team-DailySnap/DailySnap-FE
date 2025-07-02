export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImage?: string;
  accessToken: string;
}

export interface SocialLoginProps {
  onLoginSuccess: (userInfo: UserInfo) => void;
  onLoginError: (error: string) => void;
}

export type SocialProvider = "kakao" | "naver" | "google";
