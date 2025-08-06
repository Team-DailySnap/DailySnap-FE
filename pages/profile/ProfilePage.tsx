import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../features/auth/model/AuthContext";
import { SearchHeader } from "@/shared/ui/header";

export default function ProfilePage() {
  const { userInfo } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-background-color" edges={["left", "right", "bottom"]}>
      <SearchHeader />
      <View className="items-center mb-10">
        <Text>{userInfo?.nickname || "사용자 닉네임"}</Text>
        <Text>{userInfo?.email || "이메일 없음"}</Text>
      </View>
    </SafeAreaView>
  );
}
