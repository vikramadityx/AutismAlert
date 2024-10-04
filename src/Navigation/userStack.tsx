import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux';
import Main from '../Screens/Main';
import { NativeBaseProvider } from 'native-base'
import Results from '../Screens/Results';
import AddPatient from '../Screens/addPatient'
import PatientHistory from '../Screens/PatientHistory';

const Stack = createNativeStackNavigator()

const UserStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name='AddPatient'
                    component={AddPatient} />
                <Stack.Screen
                    name='PatientHistory'
                    component={PatientHistory} />
                <Stack.Screen
                    name='Main'
                    component={Main} />
                <Stack.Screen
                    name='Results'
                    component={Results} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default UserStack