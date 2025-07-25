export default {
  expo: {
    name: "DailySnap-FE",
    slug: "DailySnap-FE",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "dailysnap",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.jhsonny.DailySnapFE"
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#ffffff"
      },
      package: "com.jhsonny.DailySnapFE"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
        plugins: [
      "expo-router", 
      "expo-font"
    ],
    experiments: {
      typedRoutes: true
    }
  }
}; 