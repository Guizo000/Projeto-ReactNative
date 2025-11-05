import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDecks } from '../utils/decks';
import { usuarioLogado } from '../utils/usuario';

export default function Estudo() {
  const [deck, setDeck] = useState(null);
  const [indice, setIndice] = useState(0);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { deckId } = route.params;

  // Carrega o deck
  useEffect(() => {
    carregarDeck();
  }, []);

  async function carregarDeck() {
    const usuario = await usuarioLogado();
    const decks = await getDecks(usuario);
    const deckSelecionado = decks.find((d) => d.id === deckId);
    setDeck(deckSelecionado);
  }

  if (!deck) return <Text style={styles.textoSimples}>Carregando deck...</Text>;

  const cards = deck.cards;

  function acertar() {
    setAcertos(acertos + 1);
    proximo();
  }

  function errar() {
    proximo();
  }

  function proximo() {
    if (indice + 1 < cards.length) {
      setIndice(indice + 1);
      setMostrarResposta(false);
    } else {
      setFinalizado(true);
    }
  }

  function reiniciar() {
    setIndice(0);
    setAcertos(0);
    setFinalizado(false);
    setMostrarResposta(false);
  }

  if (cards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.textoSimples}>Esse deck ainda não tem cards.</Text>
      </View>
    );
  }

  if (finalizado) {
    const total = cards.length;
    const porcentagem = ((acertos / total) * 100).toFixed(1);

    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Estudo Finalizado!</Text>
        <Text style={styles.resultado}>Acertos: {acertos} / {total}</Text>
        <Text style={styles.resultado}>Desempenho: {porcentagem}%</Text>

        <TouchableOpacity style={styles.botaoAzul} onPress={reiniciar}>
          <Text style={styles.textoBotao}>Reiniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoAzul, styles.botaoVoltar]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const cardAtual = cards[indice];

  return (
    <View style={styles.container}>
      <Text style={styles.progresso}>
        Card {indice + 1} de {cards.length}
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => setMostrarResposta(!mostrarResposta)}
      >
        <Text style={styles.textoCard}>
          {mostrarResposta ? cardAtual.resposta : cardAtual.pergunta}
        </Text>
        <Text style={styles.dica}>
          (Toque para {mostrarResposta ? 'ver a pergunta' : 'ver a resposta'})
        </Text>
      </TouchableOpacity>

      {mostrarResposta && (
        <View style={styles.containerBotoes}>
          <TouchableOpacity style={[styles.botao, styles.acerto]} onPress={acertar}>
            <Text style={styles.textoBotao}>Acertei</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, styles.erro]} onPress={errar}>
            <Text style={styles.textoBotao}>Errei</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  progresso: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 10,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  textoCard: {
    fontSize: 22,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
  },
  dica: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  containerBotoes: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 15,
  },
  botao: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  acerto: {
    backgroundColor: '#10b981',
  },
  erro: {
    backgroundColor: '#ef4444',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  textoSimples: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4b5563',
    marginTop: 30,
  },
  resultado: {
    fontSize: 20,
    color: '#111827',
    marginBottom: 8,
  },
  botaoAzul: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    width: '80%',
    marginTop: 15,
    alignItems: 'center',
  },
  botaoVoltar: {
    backgroundColor: '#6b7280',
  },
});
