import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../features/auth/model/AuthContext";

export default function HomePage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 로그아웃 버튼 */}
      <TouchableOpacity className="bg-red-400 p-4  items-center" onPress={handleLogout}>
        <Text className="text-white">로그아웃 버튼</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
