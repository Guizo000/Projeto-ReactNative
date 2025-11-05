import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
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
    await editarCard(usuario, deckId, cardId, pergunta, resposta);
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
      <Button title="Salvar alterações" onPress={salvarAlteracoes} />
    </View>
  );
}
