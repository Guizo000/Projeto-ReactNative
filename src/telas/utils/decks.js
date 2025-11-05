import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Adiciona um novo deck ao usuário 
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
    //Retorna o deckAtualizado
    return deckAtualizado;
  }catch(erro){
    console.log(erro);
    Alert.alert('Erro', 'Falha ao tentar salvar deck!'); 
  }
}


// Adiciona um novo card a um deck específico
export async function addCardToDeck(usuario, deckId, card) {
  try{
    const key = `@decks_${usuario}`;
    const decks = await getDecks(usuario);

    //Cria um novo deck atualizado
    //Map percorre cada deck, ao encontrar o deck cm id certo
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
