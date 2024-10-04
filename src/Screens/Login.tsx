import { View, Alert, Linking } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Box, VStack, Input, Button, Center, FormControl, Text } from 'native-base'
import { StackActions } from '@react-navigation/native';
import { Formik } from 'formik'
import * as Yup from 'yup'
import auth from '@react-native-firebase/auth'
import { trigger } from "react-native-haptic-feedback";

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};


const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, "Minimum 4 Characters").max(16, "Maximum 16 Characters")
        .required("Password is Mandatory"),
});

interface MyFormValues {
    email: string,
    password: string
}

const Login = ({ navigation, setNewUser, setLoginWithOtp }) => {

    const [phone, setPhone] = useState(null)

    const initialValues: MyFormValues = {
        email: "",
        password: ""
    }

    const handleLogin = async (data: any) => {
        trigger("impactMedium", options);
        try {
            const isUserLogin = await auth().signInWithEmailAndPassword(
                data.email,
                data.password
            )
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                handleLogin(values);
            }}>


            {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched
            }) => (
                <FormControl>
                    <VStack space={3}>
                        <Box>
                            <FormControl.Label isRequired>Email / Username</FormControl.Label>
                            <Input
                                value={values.email}
                                onChangeText={handleChange('email')} borderRadius={15} _focus={{
                                    focusOutlineColor: "fuchsia.500",
                                    bg: "fuchsia.100",
                                }} size="md" placeholder='Email / Username' />
                            {
                                (errors.email)
                                    ?
                                    (
                                        <Text fontSize={12} mt={2} color="danger.900">
                                            {errors.email}
                                        </Text>
                                    ) :
                                    null
                            }
                        </Box>
                        <Box>
                            <FormControl.Label isRequired>Password</FormControl.Label>
                            <Input value={values.password} onChangeText={handleChange('password')} borderRadius={15} _focus={{
                                focusOutlineColor: "fuchsia.500",
                                bg: "fuchsia.100",
                            }} size="md" type="password" placeholder='Password' />
                            {
                                (errors.password)
                                    ?
                                    (
                                        <Text fontSize={12} mt={2} color="danger.900">
                                            {errors.password}
                                        </Text>
                                    ) :
                                    null
                            }
                        </Box>
                        <Button
                            onPress={handleSubmit}
                            borderRadius={15}
                            shadow={5}
                            _pressed={{
                                bg: "fuchsia.800",
                            }}
                            bg={'fuchsia.500'}>
                            Login
                        </Button>
                        {/* <VStack space={2} alignItems="center">
                            <Box>
                                <Text color="fuchsia.500" fontSize={25}>or</Text>
                            </Box>
                            <Box>
                                <Text onPress={() => { navigation.navigate('LoginWithOtp') }} color="fuchsia.900" underline={true} fontSize={20}>Login with OTP</Text>
                            </Box>
                        </VStack> */}
                    </VStack>
                </FormControl>
            )}
        </Formik>
    )
}

export default Login