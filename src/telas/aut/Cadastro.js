import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function gravar() {
    try {
      const senha = await AsyncStorage.getItem(user);

      //Verifica se senha não é null, caso n seja
      //Significa que esse nome de usuário já existe
      if(senha != null){
        Alert.alert('Erro', 'Usuário já cadastrado!');
        return;
      } 

      //Armazena a senha com a chave = nome de usuario no async storage
      await AsyncStorage.setItem(user, password);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.goBack();
      
    } catch (erro) {
      console.log(erro);
      Alert.alert('Erro', 'Falha ao cadastrar usuário!');
    }
  }

  return (
    <View>
      <Text>Cadastrar Usuário:</Text>
      <TextInput
        placeholder="Usuário"
        onChangeText={setUser}
      />

      <Text>Cadastrar Senha:</Text>
      <TextInput
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Cadastrar" onPress={gravar} />
    </View>
  );
}
