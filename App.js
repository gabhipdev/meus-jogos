import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { JogosProvider } from './context/JogosContext';

import Home from './screens/Home';
import Detalhes from './screens/Detalhes';
import Formulario from './screens/Formulario';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <JogosProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#1A1A24' }, 
              headerTintColor: '#00F0FF', 
              headerTitleStyle: { fontWeight: 'bold', fontFamily: 'monospace' }, 
            }}
          >
            <Stack.Screen name="Home" component={Home} options={{ title: 'MEUS JOGOS' }} />
            <Stack.Screen
              name="Detalhes"
              component={Detalhes}
              options={({ route }) => ({ title: route.params?.jogo?.titulo ?? 'DETALHES' })}
            />
            <Stack.Screen name="Formulario" component={Formulario} options={{ title: 'NOVO JOGO' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </JogosProvider>
    </SafeAreaProvider>
  );
}