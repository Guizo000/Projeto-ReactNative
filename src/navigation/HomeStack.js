import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, CriarDeck, DeckDetalhes, AddCard, Estudo, EditarCard } from  '../telas'

const Stack = createNativeStackNavigator();

//Telas da tab home
export default function HomeStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }}/>
        <Stack.Screen name="CriarDeck" component={CriarDeck} options={{ title: 'Criar Deck' }}/>
        <Stack.Screen name="DeckDetalhes" component={DeckDetalhes} options={{ title: 'Detalhes do Deck' }}/>
        <Stack.Screen name="AddCard" component={AddCard} options={{ title: 'Adicionar Card' }}/>
        <Stack.Screen name="Estudo" component={Estudo} options={{ title: 'Estudo' }}/>
        <Stack.Screen name="EditarCard" component={EditarCard} options={{ title: 'Editar Card' }}/>
    </Stack.Navigator>
  );
}