import 
     React, 
     { 
          createContext, 
          useContext, 
          useState, 
          ReactNode,
          useEffect
     } 
from 'react';
import * as AuthSession from 'expo-auth-session'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLETION_USERS } from '../config/database';

const { REDIRECT_URI } = process.env
const { SCOPE } = process.env
const { REPONSE_TYPE } = process.env
const { CLIENT_ID } = process.env
const { CDN_IMAGE } = process.env

import { api } from '../services/api';

type User = {
     id: string
     username: string
     firstName: string
     avatar: string
     email: string
     token: string
}

type AuthContextData = {
     user: User
     signIn: () => Promise<void>
     signOut: () => Promise<void>
     loading: boolean
}

type AuthProviderProps = {
     children: ReactNode
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
     params: {
          access_token?: string
          error?: string
     }
}

export const AuthCountext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
     const [user, setUser] = useState<User>({} as User)
     const [loading, setLoading] = useState(false)

     async function signIn(){
          try{
               setLoading(true)
               const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${REPONSE_TYPE}&scope=${SCOPE}`
               const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse
               if(type === 'success' && !params.error){
                    api.defaults.headers.authorization = `Bearer ${params.access_token}`

                    const userInfo = await api.get('/users/@me')

                    const firstname = userInfo.data.username.split(' ')[0]
                    userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

                    console.log(userInfo.data.username)

                    const userData = {
                         ...userInfo.data,
                         firstname,
                         token: params.access_token
                    }

                    await AsyncStorage.setItem(COLLETION_USERS, JSON.stringify(userData))

                    setUser(userData)
               }
          }catch{
               throw new Error('Não foi posivel aitenticar')
          } finally {
               setLoading(false)
          }
     }

     async function signOut() {
          setUser({} as User)
          await AsyncStorage.removeItem(COLLETION_USERS)
     }

     async function  loadUserStorageData() {
          const storage = await AsyncStorage.getItem(COLLETION_USERS)
          if(storage){
               const userLoged = JSON.parse(storage) as User
               api.defaults.headers.authorization = `Bearer ${userLoged.token}`
               setUser(userLoged)
          }
     }

     useEffect(() => {
          loadUserStorageData()
     },[])

     return(
          <AuthCountext.Provider value={{
               user,
               loading,
               signIn,
               signOut
          }}>
               { children }
          </AuthCountext.Provider>
     )
}

function useAuth(){
     const context = useContext(AuthCountext)
     return context
}

export {
     AuthProvider,
     useAuth
}

