import CommonHeader from "../CommonHeader";
import BackButton from "../items/BackButton";
import TodayKeyword from "../items/TodayKeyword";

export default function UploadHeader() {
  return (
    <CommonHeader
      left={<BackButton />}
      center={<TodayKeyword title="고양이" dateString="2025.08.06" />}
    />
  );
}
