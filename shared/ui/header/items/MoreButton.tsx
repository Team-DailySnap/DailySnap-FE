import { Pressable } from "react-native";
import { Icon } from "@/shared/ui/icon";

interface MoreButtonProps {
  onPress?: () => void;
}

export default function MoreButton({ onPress }: MoreButtonProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Icon name="more" width={24} height={24} />
    </Pressable>
  );
}
