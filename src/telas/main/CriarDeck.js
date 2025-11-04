import { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { saveDeck } from '../utils/decks';

export default function CriarDeck() {
  const [titulo, setTitulo] = useState('');
  const [usuario, setUsuario] = useState('');
  const navigation = useNavigation();

  //UseEffect para quando o compenente monta
  //Define o usuário logado atualmente
  useEffect(() => {
    setUsuarioLogado();
  }, []);

  //Função chamada no UseEffect para definir o usuário atualmente logado
  async function setUsuarioLogado() {
    try{
      const usuarioAtual = await AsyncStorage.getItem('@usuario');
      setUsuario(usuarioAtual);
    }catch(erro){
      console.log(erro);
      Alert.alert('Erro', 'Falha ao tentar retornar decks!');
    }
  }

  //Função que salva o deck
  async function salvar() {
    //Verifica se foi dado um nome ao deck
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Digite um nome para o deck!');
      return;
    }

    //Verifica se existe um usuário logado
    if (!usuario) {
      Alert.alert('Erro', 'Usuário não identificado!');
      return;
    }

    //Cria a estrutura do novo deck
    const novoDeck = {
      id: Date.now().toString(),
      titulo,
      cards: [],
    };

    //Chama a função para salvar o deck
    await saveDeck(usuario, novoDeck);
    Alert.alert('Sucesso', 'Deck criado com sucesso!');
    navigation.goBack();
  }

  return (
    <View>
      <Text>Nome do novo deck</Text>
      <TextInput
        placeholder="Nome do deck"
        value={titulo}
        onChangeText={setTitulo}
      />
      <Button title="Salvar Deck" onPress={salvar} />
    </View>
  );
}



