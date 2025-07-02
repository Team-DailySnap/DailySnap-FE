import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

// 사용자 정보 타입 정의
interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImage?: string;
  accessToken: string;
}

interface AuthContextType {
  userInfo: UserInfo | null; // 현재 로그인된 사용자 정보
  login: (userInfo: UserInfo) => void; // 로그인 함수
  logout: () => void; // 로그아웃 함수
  isLoggedIn: boolean; // 로그인 상태 확인
}

// React Context 생성 (초기값은 undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 인증 컨텍스트를 사용하기 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  // AuthProvider 외부에서 사용하려고 하면 에러 발생
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// 인증 상태를 관리하는 Provider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 사용자 정보 상태 관리 (null이면 로그아웃 상태)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const login = (userInfo: UserInfo) => {
    setUserInfo(userInfo);
  };

  const logout = () => {
    setUserInfo(null);
  };

  const isLoggedIn = !!userInfo;

  // Context Provider로 하위 컴포넌트들에게 인증 상태와 함수들 제공
  return (
    <AuthContext.Provider value={{ userInfo, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
