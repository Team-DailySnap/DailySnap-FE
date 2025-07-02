import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UploadPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center mb-10">
        <Text className="">업로드</Text>
      </View>
    </SafeAreaView>
  );
}
