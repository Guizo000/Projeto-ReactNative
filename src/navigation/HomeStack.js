import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, CriarDeck } from  '../telas'

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CriarDeck" component={CriarDeck} />
    </Stack.Navigator>
  );
}