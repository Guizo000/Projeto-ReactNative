import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { editarCard } from '../utils/decks';
import { usuarioLogado } from '../utils/usuario';
import { useRoute, useNavigation } from '@react-navigation/native';


export default function EditarCard() {
  const route = useRoute();
  const navigation = useNavigation();
  const { deckId, cardId, perguntaInicial, respostaInicial } = route.params;
  const [pergunta, setPergunta] = useState(perguntaInicial);
  const [resposta, setResposta] = useState(respostaInicial);

  async function salvarAlteracoes() {
    const usuario = await usuarioLogado();
    const sucesso = await editarCard(usuario, deckId, cardId, pergunta, resposta);

    if (sucesso) {
      Alert.alert('Sucesso', 'Card atualizado!');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Falha ao atualizar card.');
    }
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
      <Button title="Salvar alterações" onPress={salvarAlteracoes} />
    </View>
  );
}
