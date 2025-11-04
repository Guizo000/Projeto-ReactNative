import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDecks } from '../utils/decks';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function Home() {
  const [decks, setDecks] = useState([]);
  const [usuario, setUsuario] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

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
      Alert.alert('Erro', 'Falha ao tentar definir o usuário logado!');
    }
  }

  //UseEffect para quando isFocused ou usuario mudam
  //Serve para dar reload nos decks sempre que o usuário volta pra essa pagina
  //usuario serve pra primeira
  useEffect(() => {
    if (usuario) loadDecks();
  }, [usuario, isFocused]);

  //Função que carrega os decks
  async function loadDecks() {
    try{
      const dados = await getDecks(usuario);
      setDecks(dados);
    }catch(erro){
      console.log(erro);
      Alert.alert('Erro', 'Não foi possível carregar os decks!');
    }
  }

  //Função para deslogar
  function deslogar(){
    navigation.replace("AutTabs"); 
  }

  //Função para ir a pagina de criação de decks
  function criarDeck(){
    navigation.navigate("CriarDeck");
  }
      
  return (
    <View>
      <Text>Olá, {usuario}</Text>

      <Button title="Criar Deck" onPress={criarDeck} /> 

      {/*
      Operador ternário para renderizar lista de decks
        Caso  n seja encontrado nenhum deck renderiza uma 
        mensagem no lugar
      */}
      {decks.length === 0 ? ( <Text>Nenhum deck criado ainda.</Text>) : 
      (
        <FlatList
          data={decks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text>{item.titulo}</Text>
              <Text>{item.cards.length} cards</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Button title="Deslogar" onPress={deslogar} />
    </View>
  );
}