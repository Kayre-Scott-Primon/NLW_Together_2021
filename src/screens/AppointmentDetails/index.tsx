import React from 'react';
import { ImageBackground, Text, View, FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { styles } from './styles';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Header } from '../../components/Header';
import { Member } from '../../components/Member';
import { theme } from '../../global/styles/theme';
import { ListDivider } from '../../components/ListDivider';
import BannerImg from '../../assets/banner.png'

export function AppointmentDetails() {
     const menbers = [
          {
               id: '1',
               username: 'Rodrigo',
               avatar_url: 'https://github.com/rodrigorgtic.png',
               status: 'online'
          },
          {
               id: '2',
               username: 'Fred',
               avatar_url: 'https://github.com/rodrigorgtic.png',
               status: 'offline'
          }
     ]

  return (
     <Background>
          <Header 
               title={'Detalhes'}
               action={
                    <BorderlessButton>
                         <Fontisto name={'share'} size={24} color={theme.colors.primary}/>
                    </BorderlessButton>
               }
          />
          <ImageBackground source={BannerImg} style={styles.banner}>
               <View style={styles.bannerContent}>
                    <Text style={styles.title}>Lendario</Text>
                    <Text style={styles.subtitle}>É hoje que vamos chegar ao chelleger sem perder uma partida de md10</Text>
               </View>
          </ImageBackground>
          <ListHeader title={'Jogadores'} subtitle={'Total 3'}/>
          <FlatList
               data={menbers}
               keyExtractor={item => item.id}
               renderItem={({ item }) => (
                    <Member data={item}/>
               )}
               ItemSeparatorComponent={() => <ListDivider/>}
               style={styles.members}
          />
     </Background>
  )
}