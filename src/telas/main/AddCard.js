import { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { addCardToDeck } from '../utils/decks';
import { usuarioLogado } from '../utils/usuario'

export default function AddCard() {
  const [usuario, setUsuario] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
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

  //Função para salvar um card
  async function salvarCard() {
    //Verifica se tanto pergunta ou resposta estão vazias
    if (!pergunta.trim() || !resposta.trim()) {
      Alert.alert('Erro', 'Preencha a pergunta e a resposta!');
      return;
    }

    //Cria a estrutura do card
    const novoCard = {
      id: Date.now().toString(),
      pergunta,
      resposta,
    };

    //Chama função para adicionar card ao deck
    await addCardToDeck(usuario, deckId, novoCard);
    Alert.alert('Sucesso', 'Card adicionado!');
    navigation.goBack();
  }

  return (
    <View>
      <TextInput
        placeholder="Pergunta"
        value={pergunta}
        onChangeText={setPergunta}
      />
      <TextInput
        placeholder="Resposta"
        value={resposta}
        onChangeText={setResposta}
      />
      <Button title="Salvar Card" onPress={salvarCard} />
    </View>
  );
}
