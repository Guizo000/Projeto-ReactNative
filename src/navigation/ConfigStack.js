import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Configuracoes, AlterarSenha } from  '../telas'

const Stack = createNativeStackNavigator();

//Telas da tab configuracoes
export default function HomeStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Configuracoes" component={Configuracoes} options={{ title: 'Configurações' }}/>
        <Stack.Screen name="AlterarSenha" component={AlterarSenha} options={{ title: 'Alterar Senha' }}/>
    </Stack.Navigator>
  );
}