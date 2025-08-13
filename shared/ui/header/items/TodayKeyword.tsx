import { Text, View } from "react-native";

interface TodayKeywordProps {
  dateString?: string;
  title: string;
}

export default function TodayKeyword({ title, dateString }: TodayKeywordProps) {
  return (
    <View className="flex-1 items-center">
      {dateString && <Text className="text-[8px] text-main-color1">{dateString}</Text>}
      <Text className="text-[24px] font-semibold text-main-color1">{title}</Text>
    </View>
  );
}
