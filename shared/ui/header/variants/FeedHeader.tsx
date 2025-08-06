import CommonHeader from "../CommonHeader";
import BackButton from "../items/BackButton";
import TodayKeyword from "../items/TodayKeyword";
import MoreButton from "../items/MoreButton";

export default function FeedHeader() {
  return (
    <CommonHeader
      left={<BackButton />}
      center={<TodayKeyword title="피드 테스트" dateString="2025.08.06" />}
      right={<MoreButton />}
    />
  );
}
