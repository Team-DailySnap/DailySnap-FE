import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../features/auth/model/AuthContext";

export default function ProfilePage() {
  const { userInfo } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center mb-10">
        <Text>{userInfo?.nickname || "사용자 닉네임"}</Text>
        <Text>{userInfo?.email || "이메일 없음"}</Text>
      </View>
    </SafeAreaView>
  );
}
