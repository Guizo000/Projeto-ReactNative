import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Login, Cadastro } from  '../telas'

const Tab = createBottomTabNavigator();

// Telas de autenticação
export default function AutTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Criar Usuário"
        component={Cadastro}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-details" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}