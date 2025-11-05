import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { getDecks, excluirCard } from '../utils/decks';
import { usuarioLogado } from '../utils/usuario'

export default function DeckDetails() {
  const [deck, setDeck] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { deckId } = route.params;

  //UseEffect para quando isFocused muda
  //Serve para dar reload nos decks sempre que o usuário volta pra essa pagina
  useEffect(() => {
    carregarDeck();
  }, [isFocused]);

  //Carrega o deck selecionado pelo usuario na tela anterior
  async function carregarDeck() {
    //Retorna usuario logado
    const usuario = await usuarioLogado();
    //Verifica se existe um usuário logado
    if (!usuario) {
      Alert.alert('Erro', 'Usuário não identificado!');
      return;
    }
    //Retorna todos os decks do usuario
    const decks = await getDecks(usuario);
    //Procura o deck selecionando pelo usuario na tela anterior
    const deckEncontrado = decks.find(d => d.id === deckId);
    setDeck(deckEncontrado);
  }

  //Confirmar remoção de card
  async function confirmarRemover(cardId) {
    Alert.alert(
      'Excluir Card',
      'Tem certeza que deseja excluir este card?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => removerCard(cardId) },
      ]
    );
  }

  //Remoção de card
  async function removerCard(cardId) {
    const usuario = await usuarioLogado();
    await excluirCard(usuario, deckId, cardId);
    carregarDeck(); // recarrega o deck atualizado
  }

  //Função para acessar EditarCard
  function acessarEditarCard(deckId, cardId, perguntaInicial, respostaInicial){
    navigation.navigate("EditarCard", {deckId, cardId, perguntaInicial, respostaInicial});
  }

  //Função para acessar AddCard
  function acessarAddCard(){
    navigation.navigate('AddCard', { deckId })
  }

  //Função para acessar Estudo
  function acessarEstudo(){
    navigation.navigate('Estudo', { deckId })
  }

  //Verifica se o deck ja foi carregado antes de renderizar
  if (!deck) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View>
      <Text>{deck.titulo}</Text>

      <Button
        title="Adicionar Card"
        onPress={acessarAddCard}
      />

      <Button
        title="Iniciar Estudo"
        onPress={acessarEstudo}
      />
      
      <FlatList
        data={deck.cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => acessarEditarCard(deckId, item.id, item.pergunta, item.resposta)}>
              <Text>{item.pergunta}</Text>
            </TouchableOpacity>

            <Button
            title="Excluir"
            color="red"
            onPress={() => confirmarRemover(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum card ainda</Text>}
      />
    </View>
  );
}


