import React, { useState, useEffect } from 'react'
import UserStack from "./userStack";
import AuthStack from "./authStack";
import Auth from '@react-native-firebase/auth'

export default function RootNavigation() {

    const [authState, setAuthState] = useState<object | null>({});
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>()

    useEffect(() => {
        Auth().onAuthStateChanged(user => {
            console.log(user)
            setIsEmailVerified(user?.emailVerified)
            setAuthState(user);
        })
    }, [])


    return (authState === null) ? <AuthStack /> : <UserStack />
    // return <UserStack />
}