import React from 'react';

import {View} from 'react-native';
import {useAuth} from '../../hooks/auth'

import { styles } from './styles';

import {Button} from '../Button'
import { COLORS } from '../../theme';

export function SingBox(){
  const {singIn , isSignIngIn} = useAuth()

  return (
    <View style={styles.container}>
        <Button 
          title="ENTRAR COM O GITHUB"
          color={COLORS.BLACK_PRIMARY}
          backgroundColor={COLORS.YELLOW}
          icon='github'
          onPress={singIn}
          isLoading={isSignIngIn}
        />
    </View>
  );
}