import { View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  function deslogar(){
    navigation.replace('AutStack'); 
  }

  return (
    <View>
      <Button title="Deslogar" onPress={deslogar} />
    </View>
  );
}
