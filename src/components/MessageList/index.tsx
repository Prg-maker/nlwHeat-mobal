import React from 'react';
import { ScrollView} from 'react-native';

import { styles } from './styles';

import {Message} from '../Message'

export function MessageList(){

  const message = {
    id: '1',
    text: 'nlwHeat',
    user:{
      name: 'Daniel',
      avatar_url: "https://github.com/Prg-Maker.png" 
    }
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >

      <Message data={message}/>
      <Message data={message}/>
      <Message data={message}/>
      
   
    </ScrollView>
  );
}