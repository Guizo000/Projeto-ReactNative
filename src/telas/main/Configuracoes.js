import { View, Button , Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Configuracoes() {
  const navigation = useNavigation();

  //Função para deslogar
  function deslogar(){
    navigation.replace("AutTabs"); 
  }

  //Função para ir a página de alteração de senha
  function acessarAlterarSenha(){
    navigation.navigate("AlterarSenha");
  }

  return (
    <View>
        <Button title="Deslogar" onPress={deslogar} />
        <Button title="Alterar Senha" onPress={acessarAlterarSenha} />
    </View>
  );
}
