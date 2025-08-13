import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Icon } from "@/shared/ui/icon";

export default function BackButton() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()} hitSlop={8}>
      <Icon name="back" width={24} height={24} />
    </Pressable>
  );
}
