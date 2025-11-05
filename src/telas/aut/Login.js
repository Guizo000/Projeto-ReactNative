import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';

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
          await AsyncStorage.setItem('@usuario', usuario);
          navigation.replace('MainTabs');
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
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.appTitle}>Dragon Study</Text>
      <Text style={styles.title}>Bem-vindo de volta!</Text>

      <TextInput
        placeholder="Usuário"
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={ler} color="#3b82f6" />
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 20,
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
    overflow: 'hidden',
  },
});
