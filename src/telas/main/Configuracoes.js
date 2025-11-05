import { View, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Configuracoes() {
  const navigation = useNavigation();

  function deslogar() {
    navigation.replace("AutTabs"); 
  }

  function acessarAlterarSenha() {
    navigation.navigate("AlterarSenha");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <View style={styles.botaoContainer}>
        <Button title="Alterar Senha" onPress={acessarAlterarSenha} color="#1976D2" />
      </View>

      <View style={[styles.botaoContainer, styles.botaoSair]}>
        <Button title="Deslogar" onPress={deslogar} color="#D32F2F" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  botaoContainer: {
    width: '80%',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  botaoSair: {
    marginTop: 30,
  },
});
