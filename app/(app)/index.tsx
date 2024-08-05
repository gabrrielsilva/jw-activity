import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { AuthContext } from '@/contexts/auth';
import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VStack } from '@/components/ui/vstack';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  if (!user) return <Redirect href='/sign-in' />;
  
  return (
    <Box className='items-center justify-start flex-1 bg-white'>
      <SafeAreaView>
        <StatusBar backgroundColor='#c9fec6' />
        <VStack space='3xl' reversed={false} className='w-screen h-40 p-6 bg-[#c9fec6] rounded-b-3xl'>
          <Box className='flex-row items-center justify-between w-full'>
            <Button variant='link' onPress={() => router.push('/profile')}>
              <Avatar size='md'>
                <AvatarFallbackText>{user?.displayName}</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: user?.photoURL as string,
                  }}
                />
                <AvatarBadge />
              </Avatar>
            </Button>
          </Box>
          <Box className='flex justify-center'>
            <Heading className='text-2xl font-bold text-[#043d35]'>Olá, {user.displayName?.split(' ')[0]}</Heading>
          </Box>
        </VStack>

        <VStack space='4xl' reversed={false} className='w-screen h-full px-6 pt-8'>
          <Box className='flex-row justify-between w-full'>
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
            <Progress value={40} className='w-full bg-gray-100' size='lg'>
              <ProgressFilledTrack className='bg-[#29e2a2]' />
            </Progress>
          </VStack>

          <HStack space='md' reversed={false} className='flex-row flex-wrap items-start justify-between mt-4'>
            <Box className='w-[calc(91%/4)] h-auto'>
              <Box className='flex items-center justify-center w-full bg-gray-200 rounded-full aspect-square'>
                <AntDesign name="team" size={30} color="black" />
              </Box>
              <Text className='text-xl font-bold text-center text-gray-700'>Campo</Text>
            </Box>
            <Box className='w-[calc(91%/4)] h-auto'>
              <Box className='flex items-center justify-center w-full bg-gray-200 rounded-full aspect-square'>
                <FontAwesome name="envelope-o" size={30} color="black" />
              </Box>
              <Text className='text-xl font-bold text-center text-gray-700'>Cartas</Text>
            </Box>
            <Box className='w-[calc(91%/4)] h-auto'>
              <Box className='flex items-center justify-center w-full bg-gray-200 rounded-full aspect-square'>
                <Feather name="map-pin" size={30} color="black" />
              </Box>
              <Text className='text-xl font-bold text-center text-gray-700'>Revisitas</Text>
            </Box>
            <Box className='w-[calc(91%/4)] h-auto'>
              <Box className='flex items-center justify-center w-full bg-gray-200 rounded-full aspect-square'>
                <AntDesign name="book" size={30} color="black" />
              </Box>
              <Text className='text-xl font-bold text-center text-gray-700'>Estudos</Text>
            </Box>
          </HStack>
        </VStack>
      </SafeAreaView>
    </Box>
  );
}