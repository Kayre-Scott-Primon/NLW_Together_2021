import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { styles } from './styles';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { theme } from '../../global/styles/theme';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ListDivider } from '../../components/ListDivider';
import BannerImg from '../../assets/banner.png'
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load'
import * as Linking from 'expo-linking'
import { api } from '../../services/api';

type Params = {
     guildSelected: AppointmentProps
}

type  GuildWidget = {
     id: string
     name: string
     instant_invite: string
     members: MemberProps[]
}

export function AppointmentDetails() {
     const route = useRoute()
     const { guildSelected } = route.params as Params;
     const [ widget, setWidget ] = useState<GuildWidget>({} as GuildWidget)
     const [ loading, setLoading ] = useState(true)

     async function fetchGuildWidget() {
          try{
               const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
               setWidget(response.data)
          } catch (error) {
               Alert.alert('Verefique as configurações do servidor. Será que o widget está habilitado?')
          } finally{
               setLoading(false)
          }
     }

     function handlerShareInvitation() {
          const message = Platform.OS === 'ios'
          ? `Junte-se a ${guildSelected.guild.name}`
          : widget.instant_invite

          Share.share({
               message,
               url: widget.instant_invite
          })
     }

     function handlerOpenGuild(){
          Linking.openURL(widget.instant_invite)
     }

     useEffect(() => {
          fetchGuildWidget()
     },[])

  return (
     <Background>
          <Header 
               title={'Detalhes'}
               action={
                    guildSelected.guild.owner &&
                    <BorderlessButton>
                         <Fontisto name={'share'} size={24} color={theme.colors.primary} onPress={handlerShareInvitation}/>
                    </BorderlessButton>
               }
          />
          <ImageBackground source={BannerImg} style={styles.banner}>
               <View style={styles.bannerContent}>
                    <Text style={styles.title}>{ guildSelected.guild.name }</Text>
                    <Text style={styles.subtitle}>{ guildSelected.description }</Text>
               </View>
          </ImageBackground>
          {loading 
               ? <Load/>
               :
                    <>
                         <ListHeader title={'Jogadores'} subtitle={`Total ${widget.members.length}`}/>
                         <FlatList
                              data={widget.members}
                              keyExtractor={item => item.id}
                              renderItem={({ item }) => (
                                   <Member data={item}/>
                              )}
                              ItemSeparatorComponent={() => <ListDivider isCenter/>}
                              style={styles.members}
                         />
                    </>
          }
          {guildSelected.guild.owner &&
               <View style={styles.footer}>
                    <ButtonIcon title={'Entrar na partida'} onPress={ handlerOpenGuild}/>
               </View>
          }
     </Background>
  )
}