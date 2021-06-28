import React from 'react';
import { View, FlatList } from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type Props = { 
     handleGuildSelected: (guild: GuildProps) => void
}

export function Guilds({handleGuildSelected}: Props){
     const guilds = [
          {
               id: '1',
               name: 'Lendários',
               icon: 'image.png',
               owner: true
          },
          {
               id: '2',
               name: 'AgoraVai',
               icon: 'image.png',
               owner: false
          },
          {
               id: '3',
               name: 'Lendários',
               icon: 'image.png',
               owner: true
          },
          {
               id: '4',
               name: 'AgoraVai',
               icon: 'image.png',
               owner: false
          }
     ]
  return (
     <View style={styles.container}>
          <FlatList
               data={guilds}
               keyExtractor={item => item.id}
               renderItem={({item}) => (
                    <Guild data={item} onPress={() => handleGuildSelected(item)}/>
               )}
               ItemSeparatorComponent={() => <ListDivider isCenter/>}
               showsVerticalScrollIndicator={false}
               style={styles.guilds}
               contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
               ListHeaderComponent={() => <ListDivider isCenter/>}
          />
     </View>
  );
}

