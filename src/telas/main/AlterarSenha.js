import { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usuarioLogado } from '../utils/usuario'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CriarDeck() {
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');
  const navigation = useNavigation();

  //UseEffect para quando o compenente monta
  //Define o usuário logado atualmente
  useEffect(() => {
    setUsuarioLogado();
  }, []);

  //Função chamada no UseEffect para definir o usuário atualmente logado
  async function setUsuarioLogado() {
      const usuarioAtual = await usuarioLogado();
      setUsuario(usuarioAtual);
  }

  //Função que salva a senha
  async function salvar() {
    //Verifica se foi escrito uma senha
    if (!senha.trim()) {
      Alert.alert('Erro', 'Digite uma senha!');
      return;
    }

    //Verifica se existe um usuário logado
    if (!usuario) {
      Alert.alert('Erro', 'Usuário não identificado!');
      return;
    }

    try{
        await AsyncStorage.setItem(usuario, senha);
        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        navigation.goBack();
    }catch(erro){
        console.log(erro);
        Alert.alert('Erro', 'Falha ao tentar alterar senha!');
    }
    //Chama a função para salvar a nova senha
    
  }

  return (
    <View>
      <Text>Nova Senha</Text>
      <TextInput
        placeholder="Nova Senha"
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Salvar Senha" onPress={salvar} />
    </View>
  );
}



