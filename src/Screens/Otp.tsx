import { View, Alert, Linking } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Box, VStack, Input, Button, Center, FormControl, Text } from 'native-base'
import { StackActions } from '@react-navigation/native';

const Otp = ({ navigation, setLoginWithOtp , setGetOtp}) => {

    const [phone, setPhone] = useState(null)

    return (
        <FormControl>
            <VStack borderRadius={15} p={5} borderStyle="solid" borderColor="fuchsia.500" borderWidth={1} space={4} w="100%">
                <Box>
                    <FormControl.Label isRequired>Email / Username</FormControl.Label>
                    <Input onChangeText={(e) => setPhone(e)} borderRadius={15} _focus={{
                        focusOutlineColor: "fuchsia.500",
                        bg: "fuchsia.100",
                    }} size="md" placeholder='Email / Username' />
                </Box>
                <Button onPress={() => {navigation.navigate("GetOtp") }} borderRadius={15} shadow={5} _pressed={{
                    bg: "fuchsia.800",
                }} bg={'fuchsia.500'}>Get OTP</Button>
                <VStack space={2} alignItems="center">
                    <Box>
                        <Text color="fuchsia.500" fontSize={25}>or</Text>
                    </Box>
                    <Box>
                        <Text onPress={() => navigation.navigate("EntryScreen")} color="fuchsia.900" underline={true} fontSize={20}>Login with Email</Text>
                    </Box>
                </VStack>
            </VStack>
        </FormControl>
    )
}

export default Otp