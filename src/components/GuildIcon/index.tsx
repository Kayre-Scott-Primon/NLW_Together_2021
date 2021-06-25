import React from "react";
import { View, Image } from "react-native";
import { styles } from './styles';

export function GuildIcon(){
     return(
          <Image 
           source={{ uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/198142ac-f410-423a-bf0b-34c9cb5d9609/dbtif5j-60306864-d6b7-44b6-a9ff-65e8adcfb911.png/v1/fill/w_512,h_512,q_80,strp/discord_metro_icon_by_destuert_dbtif5j-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvMTk4MTQyYWMtZjQxMC00MjNhLWJmMGItMzRjOWNiNWQ5NjA5XC9kYnRpZjVqLTYwMzA2ODY0LWQ2YjctNDRiNi1hOWZmLTY1ZThhZGNmYjkxMS5wbmciLCJ3aWR0aCI6Ijw9NTEyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.WL-Xf75hur9OgHLVMFHzeT885SMvKt_VZMQy1RqiEHQ' }} 
          style={ styles.image } 
          resizeMode='cover'/>
     )
}