import React from 'react'
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler'
import {
     Text,
} from 'react-native'
import { styles } from './style'

type Props = RectButtonProperties & {
     title: string;     // opcionais, ?:
}

export function Button({title, ...rest} : Props) {
     return(
          <RectButton style={styles.container} {...rest} >
               <Text style={styles.title}>{title}</Text>
          </RectButton>
     )
}