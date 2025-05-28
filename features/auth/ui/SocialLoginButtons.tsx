import { View, Button } from 'react-native';

export function SocialLoginButtons() {
  return (
    <View>
      <Button
        title="Login with Google"
        onPress={() => console.log('Google Login')}
      />
    </View>
  );
}
