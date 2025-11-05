import { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
    if (!pergunta.trim() || !resposta.trim()) {
      Alert.alert('Erro', 'Preencha os dois campos antes de salvar!');
      return;
    }

    const usuario = await usuarioLogado();
    await editarCard(usuario, deckId, cardId, pergunta, resposta);
    Alert.alert('Sucesso', 'Card atualizado com sucesso!');
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.titulo}>Editar Card</Text>

      <Text style={styles.label}>Pergunta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a nova pergunta"
        value={pergunta}
        onChangeText={setPergunta}
      />

      <Text style={styles.label}>Resposta:</Text>
      <TextInput
        style={[styles.input, styles.respostaInput]}
        placeholder="Digite a nova resposta"
        multiline
        value={resposta}
        onChangeText={setResposta}
      />

      <View style={styles.botaoContainer}>
        <Button title="Salvar alterações" onPress={salvarAlteracoes} color="#2563eb" />
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  respostaInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  botaoContainer: {
    marginTop: 25,
  },
});
