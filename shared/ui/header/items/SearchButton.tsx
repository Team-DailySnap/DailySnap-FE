import { Pressable } from "react-native";
import { Icon } from "@/shared/ui/icon";

interface SearchButtonProps {
  onPress?: () => void;
}

export default function SearchButton({ onPress }: SearchButtonProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Icon name="search" width={24} height={24} />
    </Pressable>
  );
}
