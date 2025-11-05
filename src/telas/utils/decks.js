import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Retorna todos os decks de um usuário 
export async function getDecks(usuario) {
  try {
    //Define a chave para acessar os decks do usuário atual
    const key = `@decks_${usuario}`;
    //Retorna os decks do usuário atual
    const data = await AsyncStorage.getItem(key);
    /*
    Retorna os decks no formato de objeto JavaScript,
    Caso não encontre nada retorna um array vazio
    */
    return data ? JSON.parse(data) : [];

  }catch(erro){
    console.log(erro);
    Alert.alert('Erro', 'Falha ao tentar retornar decks!');
  }
}

// Adiciona um novo deck  
export async function saveDeck(usuario, novoDeck) {
  try {
    //Define a chave para acessar os decks do usuário atual
    const key = `@decks_${usuario}`;
    //Retorna os decks do usuário atual
    const decks = await getDecks(usuario);
    //Cria um deck atualizado adicionando o novo na última posição dos já existentes
    const deckAtualizado = [...decks, novoDeck];
    //Atualiza os decks do usuário no async storage
    await AsyncStorage.setItem(key, JSON.stringify(deckAtualizado));
    Alert.alert('Sucesso', 'Deck criado com sucesso!');
    //Retorna o deckAtualizado
    return deckAtualizado;

  }catch(erro){
    console.log(erro);
    Alert.alert('Erro', 'Falha ao tentar salvar deck!'); 
  }
}

// Exclui um deck
export async function excluirDeck(usuario, deckId) {
  try {
    // Busca todos os decks do usuário
    const jsonValue = await AsyncStorage.getItem(`@decks_${usuario}`);
    const decks = jsonValue ? JSON.parse(jsonValue) : [];

    // Filtra de forma a selecionar todos menos o deck a ser excluído
    const decksAtualizados = decks.filter(d => d.id !== deckId);

    // Salva os decks atualizados sem o deck a ser removido
    await AsyncStorage.setItem(`@decks_${usuario}`, JSON.stringify(decksAtualizados));

  } catch (erro) {
    console.log(erro);
    Alert.alert('Erro', 'Falha ao tentar excluir deck'); 
  }
}

// Adiciona um novo card a um deck específico
export async function addCardToDeck(usuario, deckId, card) {
  try{
    const key = `@decks_${usuario}`;
    const decks = await getDecks(usuario);

    //Cria um novo deck atualizado
    //Map percorre cada deck, ao encontrar o deck com id certo
    //Cria um novo objeto
    const decksAtualizados = decks.map(deck => {
      if (deck.id === deckId) {
        return { ...deck, cards: [...deck.cards, card] };
      }
      return deck;
    });

    await AsyncStorage.setItem(key, JSON.stringify(decksAtualizados));
    return decksAtualizados; 

  }catch(erro){
    console.log(erro);
    Alert.alert('Erro', 'Falha ao tentar adicionar carta ao deck'); 
  }
  
}

// Exclui um card específico de um deck
export async function excluirCard(usuario, deckId, cardId) {
  try {
    const decks = await getDecks(usuario);
    // Encontra o deck alvo
    const decksAtualizados = decks.map(deck => {
      if (deck.id === deckId) {
        // Remove o card com o id correspondente
        const cardsFiltrados = deck.cards.filter(card => card.id !== cardId);
        return { ...deck, cards: cardsFiltrados };
      }
      return deck;
    });

    // Salva os decks atualizados
    await AsyncStorage.setItem(`@decks_${usuario}`, JSON.stringify(decksAtualizados));

  } catch (erro) {
    console.log(erro);
    Alert.alert('Erro', 'Falha ao tentar excluir card'); 
  }
}

// Edita um card existente
export async function editarCard(usuario, deckId, cardId, novaPergunta, novaResposta) {
  try {
    // Pega todos os decks do usuário
    const decks = await getDecks(usuario);

    // Acha o deck correto
    const deckIndex = decks.findIndex(d => d.id === deckId);

    // Acha o card correto dentro do deck
    const cardIndex = decks[deckIndex].cards.findIndex(c => c.id === cardId);

    // Atualiza os dados do card
    decks[deckIndex].cards[cardIndex] = {
      ...decks[deckIndex].cards[cardIndex],
      pergunta: novaPergunta,
      resposta: novaResposta,
    };

    // Salva os decks atualizados de volta no AsyncStorage
    await AsyncStorage.setItem(`@decks_${usuario}`, JSON.stringify(decks));
    Alert.alert('Sucesso', 'Card atualizado!');

  } catch (erro) {
    console.log(erro);
    Alert.alert('Erro', 'Falha ao atualizar card.');
  }
}
