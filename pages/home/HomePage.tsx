import { basicColors } from "@/shared/tokens/colors";
import React, { useState, useRef } from "react";
import type { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 100;

// TODO : API 로 불러오는 이미지
// 현재는 더미 데이터
const images = [
  {
    uri: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=2070&auto=format&fit=crop",
    keyword: "고양이",
    keywordEn: "Cat",
    photographer: "피넛버터땅콩",
  },
  {
    uri: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=2070&auto=format&fit=crop",
    keyword: "새끼 고양이",
    keywordEn: "Kitten",
    photographer: "홍길동",
  },
  {
    uri: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=2070&auto=format&fit=crop",
    keyword: "줄무늬 고양이",
    keywordEn: "Tabby Cat",
    photographer: "Mingu",
  },
  {
    uri: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=2070&auto=format&fit=crop",
    keyword: "노란 눈",
    keywordEn: "Yellow Eyes",
    photographer: "Alex",
  },
  {
    uri: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=2070&auto=format&fit=crop",
    keyword: "겨울",
    keywordEn: "Winter",
    photographer: "Sora",
  },
  {
    uri: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=2070&auto=format&fit=crop",
    keyword: "눈",
    keywordEn: "Snow",
    photographer: "Yuki",
  },
  {
    uri: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=2070&auto=format&fit=crop",
    keyword: "호기심",
    keywordEn: "Curiosity",
    photographer: "Momo",
  },
];

// 오늘 날짜, 요일 불러오는 함수
const getToday = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][
    date.getDay()
  ];
  return `${month}.${day} ${dayOfWeek}`;
};

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        style={styles.scrollView}
      >
        {images.map((image, index) => (
          <ImageBackground
            key={index}
            source={{ uri: image.uri }}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.8)"]}
              style={styles.overlay}
            >
              <View style={styles.bottomContainer}>
                <View>
                  <Text style={styles.dateText}>{getToday()}</Text>
                  <View style={styles.keywordContainer}>
                    <Text style={styles.keywordText}>{image.keyword}</Text>
                    <Text style={styles.keywordEnText}>{image.keywordEn}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.photoByText}>Photo by</Text>
                  <Text style={styles.photographer}>{image.photographer}</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, activeIndex === index ? styles.paginationDotActive : {}]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
  },
  scrollView: {
    flex: 1,
  },
  imageBackground: {
    width: screenWidth,
    height: screenHeight - TAB_BAR_HEIGHT - 63,
    justifyContent: "flex-end",
    borderRadius: 24, // 원하는 만큼 둥글기 값 조절
    overflow: "hidden", // 둥근 모서리 밖의 이미지를 숨김
  },
  overlay: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  dateText: {
    color: basicColors.beige,
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
  },
  keywordContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  keywordText: {
    color: basicColors.beige,
    fontSize: 48,
    fontWeight: "400",
    marginRight: 4,
  },
  keywordEnText: {
    color: basicColors.beige,
    fontSize: 20,
    fontWeight: "400",
  },
  photographer: {
    color: basicColors.beige,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "right",
  },
  photoByText: {
    color: basicColors.beige,
    fontSize: 12,
    fontWeight: "400",
    textAlign: "right",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 120,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: basicColors.beige50,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: basicColors.beige,
  },
});
