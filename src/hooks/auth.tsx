import React , {createContext , useContext, useState , useEffect} from 'react'
import {api} from '../services/api'
import *  as AuthSession from 'expo-auth-session'
import  AsyncStorage from '@react-native-async-storage/async-storage'
import { useSharedValue } from 'react-native-reanimated'

type User = {
  id: string,
  avatar_url: string,
  name: string,
  login: string
}

type AuthContextData = {
  user: User | null,
  isSignIngIn: boolean,
  singIn: () => Promise<void>
  singOut: () => Promise<void>
}

type AuthProviderProps= {
  children: React.ReactNode
}


type AuthResponse = {
  token: string,
  user: User,

}

type AuthorizationResponse = {
  params: {
    code?: string,
    error?:string,
  },
  type?: string,

}

const CLIENT_ID = '213e18a328dfac942960'
const SCOPE = 'read:user'
const USER_STORAGE = '@nlwheat:user'
const TOKEN_STORAGE = '@nlwheat:token'

export const AuthContext = createContext({} as AuthContextData)


 function AuthProvider({children}: AuthProviderProps ){


  const [isSignIngIn , setIsSignIngIn] = useState(true)

  const [user, setUser] = useState<User | null>(null)


  async function singIn(){
    setIsSignIngIn(true)

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`  
    const authSessionResponse = await AuthSession.startAsync({authUrl}) as AuthorizationResponse

   
    try{

      if(authSessionResponse.type === "success" && authSessionResponse.params.error !== 'access_denied'){
        const  authResponse = await api.post('/authenticate', {code: authSessionResponse.params.code})
        const {user , token} = authResponse.data as AuthResponse
  
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await AsyncStorage.setItem(USER_STORAGE , JSON.stringify(user))
        await AsyncStorage.setItem(TOKEN_STORAGE , token)
  
        setUser(user)
      }
    }catch(err){
      console.log(err)
    }finally{
      setIsSignIngIn(false)
    }


    setIsSignIngIn(false)
  }

  async function singOut(){
    setUser(null) 
    await AsyncStorage.removeItem(USER_STORAGE)
    await AsyncStorage.removeItem(TOKEN_STORAGE)
  }

  useEffect(()=>{
    async function loadUserStorageDate(){
      const userStorage = await AsyncStorage.getItem(USER_STORAGE)
      const tokenStorage =  await AsyncStorage.getItem(TOKEN_STORAGE)

      if(userStorage && tokenStorage){
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
        setUser(JSON.parse(userStorage))
      }

      setIsSignIngIn(false)

    }

    loadUserStorageDate()

  } ,[])



  return(
    <AuthContext.Provider value={{
      singIn,
      singOut,
      user,
      isSignIngIn
    }}>
      {children}
    </AuthContext.Provider >
  )
} 

function  useAuth (){
  const context = useContext(AuthContext)

  return  context
}

export {
  useAuth,
  AuthProvider
}