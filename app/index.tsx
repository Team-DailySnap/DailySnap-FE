import { SafeAreaView, ScrollView, Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ScrollView style={{ width: '100%', paddingHorizontal: 16 }}>
        <Text>App.tsx to start working on your app!</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
