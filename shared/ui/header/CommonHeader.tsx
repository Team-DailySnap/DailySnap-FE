import { View } from "react-native";

export interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export default function CommonHeader({ left, center, right }: HeaderProps) {
  return (
    <View className="bg-main-color2 rounded-b-[16px] w-full">
      <View className="flex-row items-center justify-between px-6 h-[56px]">
        {/* 왼쪽 아이템 */}
        <View className="items-center justify-center">{left ?? <View className="w-6 h-6" />}</View>

        {/* 가운데 아이템 */}
        <View className="flex-1 items-center justify-center mt-2">{center}</View>

        {/* 오른쪽 아이템 */}
        <View className="items-center justify-center">{right ?? <View className="w-6 h-6" />}</View>
      </View>
    </View>
  );
}
