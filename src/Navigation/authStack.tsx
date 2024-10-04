import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EntryScreen from '../Screens/EntryScreen'
import LoginWithOtp from '../Screens/LoginWithOtp'
import GetOtp from '../Screens/GetOtp'
import Admin from '../Screens/Admin'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name='EntryScreen'
                    component={EntryScreen} />
                <Stack.Screen
                    name='LoginWithOtp'
                    component={LoginWithOtp} />
                <Stack.Screen
                    name='GetOtp'
                    component={GetOtp} />
                <Stack.Screen
                    name='Admin'
                    component={Admin} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack