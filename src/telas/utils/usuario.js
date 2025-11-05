import AsyncStorage from '@react-native-async-storage/async-storage';

export async function usuarioLogado() {
    try{
      const usuarioAtual = await AsyncStorage.getItem('@usuario');
      return usuarioAtual;
    }catch(erro){
      console.log(erro);
      Alert.alert('Erro', 'Falha ao tentar definir o usuário logado!');
    }
}