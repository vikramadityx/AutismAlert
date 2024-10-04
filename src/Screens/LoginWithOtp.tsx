import { View, Alert, Linking } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Box, VStack, Input, Button, Center, FormControl, Text } from 'native-base'
import { StackActions } from '@react-navigation/native';
import Otp from './Otp'
import GetOtp from './GetOtp'

const LoginWithOtp = ({ navigation, setLoginWithOtp }) => {

    const [phone, setPhone] = useState(null)
    const [getOtp, setGetOtp] = useState(false)

    return (
        <Box p={5} alignSelf="center" justifyContent="center" w="100%" h="100%">
            <Otp setGetOtp={setGetOtp} navigation={navigation} setLoginWithOtp={setLoginWithOtp} />
        </Box>
    )
}

export default LoginWithOtp