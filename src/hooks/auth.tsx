import 
     React, 
     { 
          createContext, 
          useContext, 
          useState, 
          ReactNode 
     } 
from 'react';
import * as AuthSession from 'expo-auth-session'
import { 
     REDIRECT_URI,
     SCOPE,
     REPONSE_TYPE,
     CLIENT_ID,
     CDN_IMAGE
} from '../config'
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
     loading: boolean
}

type AuthProviderProps = {
     children: ReactNode
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
     params: {
          acces_token: string
     }
}

export const AuthCountext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
     const [user,setUser] = useState<User>({} as User)
     const [loading, setLoading] = useState(false)

     async function signIn(){
          try{
               setLoading(true)
               const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${REPONSE_TYPE}&scope=${SCOPE}`
               const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse
               if(type === 'success'){
                    api.defaults.headers.authorization = `Bearer ${params.acces_token}`

                    const userInfo = await api.get('/user/@me')

                    const firstname = userInfo.data.username.split(' ')[0]
                    userInfo.data.avatar =  `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

                    console.log(userInfo)
                    setUser({
                         ...userInfo.data,
                         firstname,
                         token: params.acces_token
                    })
                    setLoading(false)
               }else{
                    setLoading(false)
               }
          }catch{
               throw new Error('Não foi posivel aitenticar')
          }
     }

     return(
          <AuthCountext.Provider value={{
               user,
               loading,
               signIn
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

