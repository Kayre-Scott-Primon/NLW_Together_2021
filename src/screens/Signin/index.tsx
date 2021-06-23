import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import { styles } from './style'
import IllustrationImg from '../../assets/illustration.png'
import { ButtonIcon } from "../../components/ButtonIcon";

export function Signin(){

  return(
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent/>
      <Image source={IllustrationImg} style={styles.image} resizeMode='stretch'/>
      <View style={styles.content}>
        <Text style={styles.title}>Organize{`\n`}suas jogatinas{`\n`}facilmente</Text>
        <Text style={styles.subtitle}>Crie grupos para jogar seus games{`\n`}favoritos com seus amigos</Text>
        <ButtonIcon activeOpacity={.5} title='Entrar com Discord'/>
      </View>
    </View>
  )
}