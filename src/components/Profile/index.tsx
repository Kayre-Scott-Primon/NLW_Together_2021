import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { Avatar } from "../Avatar";

export function Profile(){
     return(
          <View style={styles.container}>
               <Avatar urlImage={'https://github.com/Kayre-Scott-Primon.png'}/>
               <View>
                    <View style={styles.user}>
                         <Text style={styles.greeting}>Ola</Text>
                         <Text style={styles.username}>Rodrigo</Text>
                    </View>
                    <Text style={styles.message}>Hoje é dia de vitória</Text>
               </View>
          </View>
     )
}