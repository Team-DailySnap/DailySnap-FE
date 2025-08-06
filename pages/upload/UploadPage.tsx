import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UploadHeader } from "@/shared/ui/header";

export default function UploadPage() {
  return (
    <SafeAreaView className="flex-1 bg-background-color" edges={["left", "right", "bottom"]}>
      <UploadHeader />
      <View className="items-center mb-10">
        <Text className="">업로드</Text>
      </View>
    </SafeAreaView>
  );
}
