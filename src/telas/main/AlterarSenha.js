import { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usuarioLogado } from '../utils/usuario';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlterarSenha() {
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  async function salvar() {
    if (!senha.trim()) {
      Alert.alert('Erro', 'Digite uma senha!');
      return;
    }

    const usuario = await usuarioLogado();
    if (!usuario) {
      Alert.alert('Erro', 'Usuário não identificado!');
      return;
    }

    try {
      await AsyncStorage.setItem(usuario, senha);
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      navigation.goBack();
    } catch (erro) {
      console.log(erro);
      Alert.alert('Erro', 'Falha ao tentar alterar senha!');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a nova senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <View style={styles.botaoContainer}>
        <Button title="Salvar Senha" onPress={salvar} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    elevation: 2, // sombra leve no Android
  },
  botaoContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden', // mantém o botão com bordas arredondadas
  },
});
