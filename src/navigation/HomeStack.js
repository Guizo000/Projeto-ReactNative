import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, CriarDeck, DeckDetalhes, AddCard, Estudo, EditarCard } from  '../telas'

const Stack = createNativeStackNavigator();

//Telas da tab home
export default function HomeStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CriarDeck" component={CriarDeck} />
        <Stack.Screen name="DeckDetalhes" component={DeckDetalhes} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="Estudo" component={Estudo} />
        <Stack.Screen name="EditarCard" component={EditarCard} />
    </Stack.Navigator>
  );
}