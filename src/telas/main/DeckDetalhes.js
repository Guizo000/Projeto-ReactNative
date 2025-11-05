import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { getDecks, excluirCard } from '../utils/decks';
import { usuarioLogado } from '../utils/usuario';

export default function DeckDetails() {
  const [deck, setDeck] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { deckId } = route.params;

  useEffect(() => {
    carregarDeck();
  }, [isFocused]);

  async function carregarDeck() {
    const usuario = await usuarioLogado();
    if (!usuario) {
      Alert.alert('Erro', 'Usuário não identificado!');
      return;
    }
    const decks = await getDecks(usuario);
    const deckEncontrado = decks.find(d => d.id === deckId);
    setDeck(deckEncontrado);
  }

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

  async function removerCard(cardId) {
    const usuario = await usuarioLogado();
    await excluirCard(usuario, deckId, cardId);
    carregarDeck();
  }

  function acessarEditarCard(deckId, cardId, perguntaInicial, respostaInicial) {
    navigation.navigate('EditarCard', { deckId, cardId, perguntaInicial, respostaInicial });
  }

  function acessarAddCard() {
    navigation.navigate('AddCard', { deckId });
  }

  function acessarEstudo() {
    navigation.navigate('Estudo', { deckId });
  }

  if (!deck) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{deck.titulo}</Text>
      <Text style={styles.subtitulo}>{deck.cards.length} cards</Text>

      <View style={styles.botoesTopo}>
        <Button title="➕ Novo Card" onPress={acessarAddCard} color="#2563eb" />
        <Button title="📚 Estudar" onPress={acessarEstudo} color="#16a34a" />
      </View>

      <FlatList
        data={deck.cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                acessarEditarCard(deckId, item.id, item.pergunta, item.resposta)
              }
            >
              <Text style={styles.cardPergunta}>{item.pergunta}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => confirmarRemover(item.id)}
              style={styles.botaoExcluir}
            >
              <Text style={styles.textoExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum card ainda</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  botoesTopo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardPergunta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  botaoExcluir: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  textoExcluir: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#6b7280',
    marginTop: 50,
  },
  empty: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 16,
    marginTop: 30,
  },
});
