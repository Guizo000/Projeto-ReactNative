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
      const senhaSalva = await AsyncStorage.getItem(usuario);

      if (senhaSalva !== null) {
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
    <View style={{ padding: 20 }}>
      <Text>Usuário:</Text>
      <TextInput
        placeholder="Digite seu usuário"
        value={usuario}
        onChangeText={setUsuario}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Senha:</Text>
      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Button title="Logar" onPress={ler} />
    </View>
  );
}
