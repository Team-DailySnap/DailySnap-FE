import CommonHeader from "../CommonHeader";
import BackButton from "../items/BackButton";
import SearchButton from "../items/SearchButton";
import TodayKeyword from "../items/TodayKeyword";

export default function SearchHeader() {
  return (
    <CommonHeader
      left={<BackButton />}
      //Todo: 검색 페이지 디자인에 따라 UI 수정 + api 연결
      center={<TodayKeyword title="검색 테스트" />}
      right={<SearchButton />}
    />
  );
}
