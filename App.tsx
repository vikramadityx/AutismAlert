import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux';
import EntryScreen from './src/Screens/EntryScreen';
import Main from './src/Screens/Main';
import Account from './src/Screens/Account';
import { NativeBaseProvider } from 'native-base'
import Results from './src/Screens/Results';
import AddPatient from './src/Screens/addPatient'
import RootNavigation from './src/Navigation/index';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NativeBaseProvider>
      <RootNavigation />
    </NativeBaseProvider>
  )
}

export default App