import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { getDecks } from '../utils/decks';
import { usuarioLogado } from '../utils/usuario'

export default function DeckDetails() {
  const [usuario, setUsuario] = useState('');
  const [deck, setDeck] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { deckId } = route.params;

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
    if (usuario) carregarDeck();
  }, [usuario, isFocused]);

  //Carrega o deck selecionado pelo usuario na tela anterior
  async function carregarDeck() {
    //Retorna todos os decks do usuario
    const decks = await getDecks(usuario);
    //Procura o deck selecionando pelo usuario na tela anterior
    const deckEncontrado = decks.find(d => d.id === deckId);
    setDeck(deckEncontrado);
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
        onPress={() => navigation.navigate('AddCard', { deckId: deck.id })}
      />

      <Button
        title="Iniciar Estudo"
        onPress={() => navigation.navigate('Estudo', { deckId: deck.id })}
      />
      
      <FlatList
        data={deck.cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>{item.pergunta}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Nenhum card ainda</Text>}
      />
    </View>
  );
}


