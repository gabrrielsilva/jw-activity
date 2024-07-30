import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function TabThreeScreen() {
  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Text>Tab 3</Text>
      <StatusBar style="dark" />
    </View>
  );
}