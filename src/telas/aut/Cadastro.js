import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function gravar() {
    try {
      const senha = await AsyncStorage.getItem(user);
      if(senha != null){
        Alert.alert('Erro', 'Usuário já cadastrado!');
        return;
      } 

      await AsyncStorage.setItem(user, password);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      setUser('');
      setPassword('');
    } catch (erro) {
      console.log(erro);
      Alert.alert('Erro', 'Falha ao cadastrar usuário!');
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Cadastrar Usuário:</Text>
      <TextInput
        placeholder="Usuário"
        onChangeText={setUser}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Cadastrar Senha:</Text>
      <TextInput
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Button title="Cadastrar" onPress={gravar} />
    </View>
  );
}
