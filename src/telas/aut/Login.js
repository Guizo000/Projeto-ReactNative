import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  async function ler() {
    try {
      //Pega a senha do usuário
      const senhaSalva = await AsyncStorage.getItem(usuario);

      //Verifica se a senha não é null
      if (senhaSalva !== null) {
        //Verifica se a senha inserida coincide com a senha salva
        if (senhaSalva === senha) {
          Alert.alert('Sucesso', 'Logado com sucesso!');
          await AsyncStorage.setItem('@usuario', usuario); // Guarda o usuário logado para usar no futuro
          navigation.replace('MainTabs'); // Troca a navegação pra o app principal
        } else {
          Alert.alert('Erro', 'Senha incorreta!');
        }
      } else {
        Alert.alert('Erro', 'Usuário não encontrado!');
      }
    } catch (erro) {
      console.log(erro);
      Alert.alert('Erro', 'Falha ao tentar logar!');
    }
  }

  return (
    <View>
      <Text>Usuário:</Text>
      <TextInput
        placeholder="Digite seu usuário"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text>Senha:</Text>
      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Logar" onPress={ler} />
    </View>
  );
}
