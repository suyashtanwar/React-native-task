import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Screens/Encryption"
import UploadScreen from "./Screens/UploadScreen"

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{title:"Home"}} component={HomeScreen} />
        <Stack.Screen name="Profile" options={{title:"Gallery"}} component={UploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
