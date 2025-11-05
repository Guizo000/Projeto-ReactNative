import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert} from 'react-native';
import { getDecks, excluirDeck} from '../utils/decks';
import { usuarioLogado } from '../utils/usuario'
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
      const usuarioAtual = await usuarioLogado();
      setUsuario(usuarioAtual);
  }

  //UseEffect para quando isFocused ou usuario mudam
  //Serve para dar reload nos decks sempre que o usuário volta pra essa pagina
  //usuario serve pra primeira
  useEffect(() => {
    if (usuario) carregarDecks();
  }, [usuario, isFocused]);

  //Função que carrega os decks
  async function carregarDecks() {
    try{
      const dados = await getDecks(usuario);
      setDecks(dados);
    }catch(erro){
      console.log(erro);
      Alert.alert('Erro', 'Não foi possível carregar os decks!');
    }
  }

  //Confirmar remoção de deck
  async function confirmarRemocao(deckID) {
    Alert.alert(
      'Excluir Deck',
      'Tem certeza que deseja excluir este deck?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => removerDeck(deckID) },
      ]
    );
  }

  //Função que exlui o deck
  async function removerDeck(deckId) {
    await excluirDeck(usuario, deckId);
    carregarDecks(); // recarrega lista
  }

  //Função para ir a pagina de criação de decks
  function criarDeck(){
    navigation.navigate("CriarDeck");
  }

  //Função para ir a pagina de detalhes de um deck
  function acessarDeck(deckId){
    navigation.navigate("DeckDetalhes", {deckId});
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
            <View> 
              <TouchableOpacity onPress={() => confirmarRemocao(item.id)}>
                <Text>{item.titulo}</Text>
                <Text>{item.cards.length} cards</Text>
              </TouchableOpacity>

              <Button
              title="Excluir"
              onPress={() => removerDeck(item.id)}
              color="red"
              />
            </View>
          )}
        />
      )}

    </View>
  );
}