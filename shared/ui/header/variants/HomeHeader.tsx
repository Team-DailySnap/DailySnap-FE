import CommonHeader from "../CommonHeader";
import Logo from "../items/Logo";
import SearchButton from "../items/SearchButton";
import AttendButton from "../items/AttendButton";
import { View } from "react-native";

export default function HomeHeader() {
  return (
    <CommonHeader
      left={<Logo />}
      center={null}
      right={
        <View className="flex-row items-center">
          <AttendButton />
          <SearchButton />
        </View>
      }
    />
  );
}
