import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function gravar() {
    try {
      const senha = await AsyncStorage.getItem(user);

      if (senha != null) {
        Alert.alert('Erro', 'Usuário já cadastrado!');
        return;
      }

      await AsyncStorage.setItem(user, password);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.goBack();
    } catch (erro) {
      console.log(erro);
      Alert.alert('Erro', 'Falha ao cadastrar usuário!');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        placeholder="Nome de usuário"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={gravar} color="#3b82f6" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    elevation: 1,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden', // pra arredondar o botão do Android
  },
  voltar: {
    marginTop: 25,
    color: '#3b82f6',
    fontWeight: '500',
  },
});
