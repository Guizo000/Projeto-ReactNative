import { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { addCardToDeck } from '../utils/decks';
import { usuarioLogado } from '../utils/usuario';

export default function AddCard() {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { deckId } = route.params;

  async function chamaSalvarCard() {
    const usuario = await usuarioLogado();

    if (!pergunta.trim() || !resposta.trim()) {
      Alert.alert('Erro', 'Preencha a pergunta e a resposta!');
      return;
    }

    const novoCard = {
      id: Date.now().toString(),
      pergunta,
      resposta,
    };

    await addCardToDeck(usuario, deckId, novoCard);
    Alert.alert('Sucesso', 'Card adicionado com sucesso!');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Novo Card</Text>

      <Text style={styles.label}>Pergunta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a pergunta"
        value={pergunta}
        onChangeText={setPergunta}
        placeholderTextColor="#9ca3af"
      />

      <Text style={styles.label}>Resposta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a resposta"
        value={resposta}
        onChangeText={setResposta}
        placeholderTextColor="#9ca3af"
      />

      <View style={styles.botaoContainer}>
        <Button title="Salvar Card" onPress={chamaSalvarCard} color="#2563eb" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 25,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 20,
  },
  botaoContainer: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
