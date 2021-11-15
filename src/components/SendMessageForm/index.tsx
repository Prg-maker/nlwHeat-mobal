import React , {useState} from 'react';

import {Alert, Keyboard, TextInput, View} from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm(){
  const [message , setMessage] = useState('')

  const [sendingMessage , setSendingMessage] = useState(false)
  

  async function handleMessageSubmit(){
    const messageFormatted = message.trim()
   

    if(messageFormatted.length > 0){
      setSendingMessage(true)

      await api.post('/message' , {message: messageFormatted})

      setMessage('')
      Keyboard.dismiss()
      setSendingMessage(false)
      Alert.alert('Mesagem enviada com sucesso!')

    }else{
      Alert.alert('Escreva a mesnagem para enviar')

    }
  }


  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual é usa expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        onChangeText={setMessage}
        value={message}
        maxLength={140}
        style={styles.input}
        editable={!sendingMessage}
      />
      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}