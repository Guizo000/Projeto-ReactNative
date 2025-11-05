import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
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
  

  // Chama função para carregar o deck
  useEffect(() => {
    carregarDeck();
  }, []);

  // Função para carregar o deck
  async function carregarDeck(){
    //Retorna o usuário logado
    const usuario = await usuarioLogado();
    //Busca os decks do usuario 
    const decks = await getDecks(usuario);
    //Acha o deck que ele selecionou para estudo
    const deckSelecionado = decks.find(d => d.id === deckId);
    setDeck(deckSelecionado);
  }

  //Verifica se o deck ja foi carregado
  if (!deck) return <Text>Carregando deck...</Text>;

  // Armazena todos os cards numa constante
  const cards = deck.cards;

  // Quando o usuário acerta
  function acertar() {
    setAcertos(acertos + 1);
    proximo();
  }

  // Quando o usuário erra
  function errar() {
    proximo();
  }

  // Avança para o próximo card
  function proximo() {
    // Verifica se ainda existem cards para estudo
    if (indice + 1 < cards.length) {
      setIndice(indice + 1);
      setMostrarResposta(false);
    } else {
      setFinalizado(true);
    }
  }

  // Reinicia o estudo do deck
  function reiniciar() {
    setIndice(0);
    setAcertos(0);
    setFinalizado(false);
    setMostrarResposta(false);
  }

  // Exibe mensagem caso o deck não posssua nenhum card
  if (cards.length === 0) {
    return (
      <View>
        <Text>Esse deck ainda não tem cards.</Text>
      </View>
    );
  }

  // Tela de resultado final
  if (finalizado) {
    const total = cards.length;
    const porcentagem = ((acertos / total) * 100).toFixed(1);
    return (
      <View>
        <Text>Estudo Finalizado!</Text>
        <Text>Acertos: {acertos} / {total}</Text>
        <Text>Desempenho: {porcentagem}%</Text>
        <Button title="Reiniciar" onPress={reiniciar} />
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  // Atualiza o card atual 
  const cardAtual = cards[indice];

  return (
    <View>
      <Text>
        Card {indice + 1} de {cards.length}
      </Text>

      <Text>
        {mostrarResposta ? cardAtual.resposta : cardAtual.pergunta}
      </Text>

      <Button
        title={mostrarResposta ? "Ocultar Resposta" : "Mostrar Resposta"}
        onPress={() => setMostrarResposta(!mostrarResposta)}
      />

      {mostrarResposta ? 
        (
            <View>
            <Button title="Acertei" onPress={acertar} />
            <Button title="Errei" onPress={errar} />
            </View>
        ) : null}
    </View>
  );
}

