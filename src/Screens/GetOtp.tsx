import { View, Alert, Linking } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Box, VStack, Input, Button, Center, FormControl, Text } from 'native-base'
import { StackActions } from '@react-navigation/native';

const GetOtp = ({ navigation, route }) => {

    const {SignUp} = route.params

    return (
        <Box p={5} alignSelf="center" justifyContent="center" w="100%" h="100%">
            { SignUp && <Text alignSelf="center" color="danger.600" mb={2} fontSize={12}>PLEASE VERIFY THE EMAIL SENT TO YOU. CHECK YOUR INBOX</Text>}
            <FormControl>
                <VStack borderRadius={15} p={5} borderStyle="solid" borderColor="fuchsia.500" borderWidth={1} space={4} w="100%">
                    <Box>
                        <FormControl.Label isRequired>Enter OTP</FormControl.Label>
                        <Input borderRadius={15} _focus={{
                            focusOutlineColor: "fuchsia.500",
                            bg: "fuchsia.100",
                        }} size="md" />
                    </Box>
                    <Button borderRadius={15} shadow={5} _pressed={{
                        bg: "fuchsia.800",
                    }} bg={'fuchsia.500'}>Enter</Button>
                </VStack>
            </FormControl>
        </Box>
    )
}

export default GetOtp