import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="items-center justify-center flex-1 bg-white">
        <Text>This screen doesn't exist.</Text>
        <StatusBar style="dark" />
      </View>
    </>
  );
}