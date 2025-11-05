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
import { getDecks, excluirDeck } from '../utils/decks';
import { usuarioLogado } from '../utils/usuario';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function Home() {
  const [decks, setDecks] = useState([]);
  const [usuario, setUsuario] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    setUsuarioLogado();
  }, []);

  async function setUsuarioLogado() {
    const usuarioAtual = await usuarioLogado();
    setUsuario(usuarioAtual);
  }

  useEffect(() => {
    if (usuario) carregarDecks();
  }, [usuario, isFocused]);

  async function carregarDecks() {
    const dados = await getDecks(usuario);
    setDecks(dados);
  }

  async function confirmarRemocao(deckId) {
    Alert.alert('Excluir Deck', 'Tem certeza que deseja excluir este deck?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => chamarExcluirDeck(deckId) },
    ]);
  }

  async function chamarExcluirDeck(deckId) {
    await excluirDeck(usuario, deckId);
    carregarDecks();
  }

  function acessarCriarDeck() {
    navigation.navigate('CriarDeck');
  }

  function acessarDeckDetalhes(deckId) {
    navigation.navigate('DeckDetalhes', { deckId });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.boasVindas}>Olá, {usuario} 👋</Text>

      <View style={styles.btnContainer}>
        <Button title="Criar Novo Deck" onPress={acessarCriarDeck} color="#3b82f6" />
      </View>

      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deckCard}>
            <TouchableOpacity onPress={() => acessarDeckDetalhes(item.id)}>
              <Text style={styles.deckTitulo}>{item.titulo}</Text>
              <Text style={styles.deckInfo}>{item.cards.length} cards</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => confirmarRemocao(item.id)}
            >
              <Text style={styles.textoExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Nenhum deck criado ainda 💤</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  boasVindas: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  btnContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  deckCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  deckTitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  deckInfo: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  botaoExcluir: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  textoExcluir: {
    color: '#fff',
    fontWeight: '600',
  },
  listaVazia: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 50,
    fontSize: 16,
  },
});
