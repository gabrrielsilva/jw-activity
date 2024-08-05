import React, { useContext } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { AuthContext } from '@/contexts/auth';
import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VStack } from '@/components/ui/vstack';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ProfileScreen() {
  const { signOut, user } = useContext(AuthContext);
  
  if (!user) return <Redirect href='/sign-in' />;

  return (
    <Box className='items-center justify-start flex-1'>
      <SafeAreaView>
        <StatusBar backgroundColor='#c9fec6' />
        <VStack space='3xl' reversed={false} className='w-screen h-72 p-4 bg-[#c9fec6]'>
          <Box className='flex flex-row items-center justify-between'>
            <Box className='flex flex-row items-center gap-5'>
              <Button variant='link' onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#043d35" />
              </Button>
              <Heading className='text-2xl font-bold text-[#043d35]'>Meu perfil</Heading>
            </Box>
            <Button size='md' variant='link' action='primary' onPress={() => signOut()}>
              <ButtonText>
                <MaterialIcons name="logout" size={24} color="#043d35" />
              </ButtonText>
            </Button>
          </Box>
          <Box className='flex-col items-center justify-center w-full'>
            <Avatar size="xl">
              <AvatarFallbackText>{user?.displayName}</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: user?.photoURL as string,
                }}
              />
              <AvatarBadge />
            </Avatar>
            <Text className='text-2xl font-bold'>{user?.displayName}</Text>
            <Text className='text-lg'>{user?.email}</Text>
          </Box>
        </VStack>

        <VStack space='3xl' reversed={false} className='w-screen h-full p-4 pt-8 bg-white'>
          {/* <Box className='flex-row justify-between w-full'>
            <VStack>
              <Heading className='text-3xl font-bold'>11h25</Heading>
              <Text className='-mt-2 text-lg font-medium text-gray-500'>concluído</Text>
            </VStack>
            <VStack className='flex items-end'>
              <Heading className='text-3xl font-bold'>30h</Heading>
              <Text className='-mt-2 text-lg font-medium text-gray-500'>objetivo</Text>
            </VStack>
          </Box>
          <VStack className='-mt-10'>
            <Text className='text-xl text-center'>37%</Text>
            <Progress value={40} className="w-full bg-gray-100" size="lg">
              <ProgressFilledTrack className='bg-[#29e2a2]' />
            </Progress>
          </VStack> */}
        </VStack>
      </SafeAreaView>
    </Box>
  );
}