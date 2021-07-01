import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { api } from '../../services/api';

import { styles } from './styles';

type Props = { 
     handleGuildSelected: (guild: GuildProps) => void
}

export function Guilds({handleGuildSelected}: Props){
     const [guilds, setGuilds] = useState<GuildProps[]>([])
     const [loading, setLoading] = useState(true)

     async function fetchGuilds(){
          const response = await api.get('/users/@me/guilds')
          setGuilds(response.data)
          setLoading(false)
     }

     useEffect(() => {
          fetchGuilds()
     },[])

  return (
     <View style={styles.container}>
          {loading 
          ? <Load/> 
          :
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
          }
     </View>
  );
}

