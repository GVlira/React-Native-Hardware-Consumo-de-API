import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PhotoFeed from './components/PhotoFeed';
import AddPhoto from './components/AddPhoto';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Feed" 
                    component={PhotoFeed} 
                    options={{
                        headerTitle: 'O céu que nós vemos',
                        headerStyle: { backgroundColor: '#87CEEB' },
                        headerTitleStyle: { color: 'white' },
                    }}
                />
                <Stack.Screen 
                    name="AddPhoto" 
                    component={AddPhoto} 
                    options={{ headerTitle: 'Adicionar Foto' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
