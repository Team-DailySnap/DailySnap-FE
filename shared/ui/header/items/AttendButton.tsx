import { Pressable, Text } from "react-native";
import { Icon } from "@/shared/ui/icon";

interface AttendButtonProps {
  onPress?: () => void;
}

// Todo: api연결해서 몇 일 연속 출석인지 표시
export default function AttendButton({ onPress }: AttendButtonProps) {
  return (
    <Pressable onPress={onPress} className="mr-4 flex-row items-center">
      <Icon name="attend" width={24} height={24} />
      <Text className="text-main-color1 text-sm ml-2">34</Text>
    </Pressable>
  );
}
