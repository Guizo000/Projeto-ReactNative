import { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveDeck } from '../utils/decks';
import { usuarioLogado } from '../utils/usuario';

export default function CriarDeck() {
  const [titulo, setTitulo] = useState('');
  const [usuario, setUsuario] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    setUsuarioLogado();
  }, []);

  async function setUsuarioLogado() {
    const usuarioAtual = await usuarioLogado();
    setUsuario(usuarioAtual);
  }

  async function chamaSalvarDeck() {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Digite um nome para o deck!');
      return;
    }

    if (!usuario) {
      Alert.alert('Erro', 'Usuário não identificado!');
      return;
    }

    const novoDeck = {
      id: Date.now().toString(),
      titulo,
      cards: [],
    };

    await saveDeck(usuario, novoDeck);
    Alert.alert('Sucesso', 'Deck criado com sucesso!');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Novo Deck</Text>

      <Text style={styles.label}>Nome do deck:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do deck"
        value={titulo}
        onChangeText={setTitulo}
        placeholderTextColor="#9ca3af"
      />

      <View style={styles.botaoContainer}>
        <Button title="Salvar Deck" onPress={chamaSalvarDeck} color="#2563eb" />
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
