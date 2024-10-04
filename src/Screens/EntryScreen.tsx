import { View, Text } from 'react-native'
import React, { useState } from 'react'
import LoginSignUp from './LoginSignUp'
import LoginWithOtp from './LoginWithOtp'

const EntryScreen = ({ navigation }) => {

    const [newUser, setNewUser] = useState(0);
    const [loginWithOtp, setLoginWithOtp] = useState(true);

    return (
        <LoginSignUp setLoginWithOtp={setLoginWithOtp} navigation={navigation} />
    )
}

export default EntryScreen