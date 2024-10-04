import { View, Alert, Linking } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Box, VStack, Input, Button, Center, FormControl, Text, Pressable, ScrollView } from 'native-base'
import { StackActions } from '@react-navigation/native';
import Login from './Login';
import SignUp from './SignUp';

const LoginSignUp = ({ navigation, setLoginWithOtp }) => {

    const [phone, setPhone] = useState(null)

    const [newUser, setNewUser] = useState(false)

    const handleAdminLogin = () => {
        navigation.navigate("Admin")
    }

    return (
        <ScrollView>
            <Box p={5} alignSelf="center" mt={10} w="100%" h="100%">
                <Box p={2} borderRadius={15} p={5} borderStyle="solid" borderColor="fuchsia.500" borderWidth={1} space={4}>
                    <Box borderStyle="solid" borderColor="fuchsia.500" borderWidth={1} borderRadius={15} flexDirection="row" h={35} mb={5} >
                        <Pressable onPress={() => setNewUser(false)} alignItems="center" justifyContent="center" borderRadius={10} w="50%" bgColor={newUser ? null : "fuchsia.500"}>
                            <Text color="fuchsia.900">Login</Text>
                        </Pressable >
                        <Pressable onPress={() => setNewUser(true)} borderRadius={10} alignItems="center" justifyContent="center" w="50%" bgColor={newUser ? "fuchsia.500" : null}>
                            <Text color="fuchsia.900">Sign Up</Text>
                        </Pressable >
                    </Box>
                    {!newUser ? <Login navigation={navigation} setLoginWithOtp={setLoginWithOtp} setNewUser={setNewUser} /> : <SignUp navigation={navigation} setNewUser={setNewUser} />}
                </Box>
                <Box>
                    <Button
                        onPress={() => handleAdminLogin()}
                        mt={5}
                        borderRadius={15}
                        shadow={5}
                        _pressed={{
                            bg: "fuchsia.800",
                        }}
                        bg={'fuchsia.500'}
                    >
                        Admin Login
                    </Button>
                </Box>
            </Box>

        </ScrollView>
    )
}

export default LoginSignUp