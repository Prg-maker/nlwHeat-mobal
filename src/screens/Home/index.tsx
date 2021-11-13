import React from 'react';
import {View , Text} from 'react-native'

import {styles} from './styles' 

import {Header} from '../../components/Header'
import { MessageList } from '../../components/MessageList';
import { SingBox } from '../../components/SingBox';



export function Home() {
  return(
    <View style={styles.container}>

      <Header/>
      <MessageList/>
      <SingBox/>
    </View>
  )
}