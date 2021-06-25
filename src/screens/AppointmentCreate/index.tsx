import React, { useState } from 'react';
import { ImageBackground, Text, View, FlatList, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles'
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Header } from '../../components/Header';
import { Member } from '../../components/Member';
import { theme } from '../../global/styles/theme';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ListDivider } from '../../components/ListDivider';
import { CategorySelect } from '../../components/CategorySelect';
import { TextArea } from '../../components/TextArea';
import { SmallInput } from '../../components/SmallInput';
import { Button } from '../../components/Button';
import BannerImg from '../../assets/banner.png'
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { GuildIcon } from '../../components/GuildIcon';


export function AppointmentCreate() {

     const [category, setCategory] = useState('')
     const [openGuildsModal, setOpenGuildsModal] = useState(false)
     const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

     function handlerOpenGuilds(){
          setOpenGuildsModal(true)
     }

     function handlerOpenGuildsSelect(guildSelected: GuildProps){
          setGuild(guildSelected)
          setOpenGuildsModal(false)
     }

  return (
     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
               <Background>
                    <Header 
                         title={'Agendar partida'}
                    />
                    <Text style={[styles.label, { marginLeft: 24, marginTop: 26, marginBottom: 18 }]}>Categoria</Text>
                    <CategorySelect
                         hasCheckBox
                         setCategory={setCategory}
                         categorySelected={category}
                    />
                    <View style={styles.form}>
                         <RectButton onPress={handlerOpenGuilds}>
                              <View style={styles.select}>
                                   { guild.icon ? <GuildIcon/> : <View style={styles.image}/> }
                                   <View style={styles.selectBody}>
                                        <Text style={styles.label}>{guild.name ? guild.name : 'Selecione um servidor'}</Text>
                                   </View>
                                   <Feather name={'chevron-right'} color={theme.colors.heading} size={18}/>

                              </View>
                         </RectButton>
                         <View style={styles.field}>
                              <View>
                                   <Text style={styles.label}>Dia e mês</Text>
                                   <View style={styles.column}>
                                        <SmallInput maxLength={2}/>
                                        <Text style={styles.divider}>/</Text>
                                        <SmallInput maxLength={2}/>
                                   </View>
                              </View>
                              <View>
                                   <Text style={styles.label}>Hora e minuto</Text>
                                   <View style={styles.column}>
                                        <SmallInput maxLength={2}/>
                                        <Text style={styles.divider}>:</Text>
                                        <SmallInput maxLength={2}/>
                                   </View>
                              </View>
                         </View>
                    </View>
                    <View style={[styles.field, { marginBottom: 12}]}>
                         <Text style={styles.label}>
                              Descrição
                         </Text>
                         <Text style={styles.caracteresLimit}>
                              Max 100 caracteres   
                         </Text>
                    </View>
                    <TextArea 
                         multiline
                         maxLength={100}
                         numberOfLines={5}
                         autoCorrect={false}
                    />

                    <View style={styles.footer}>
                         <Button title={'Aegndar'}/>
                    </View>
               </Background>
          </ScrollView>
          <ModalView visible={openGuildsModal}>
               <Guilds handleGuildSelected={handlerOpenGuildsSelect}/>
          </ModalView>
     </KeyboardAvoidingView>
  )
}