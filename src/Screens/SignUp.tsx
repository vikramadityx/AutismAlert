import { View, Alert, Linking } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Box, VStack, Input, Button, Center, FormControl, Text } from 'native-base'
import { StackActions } from '@react-navigation/native';
import * as Yup from 'yup'
import { Formik } from 'formik'
import Auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { trigger } from "react-native-haptic-feedback";

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};


interface MyFormValues {
    name: string,
    email: string,
    password: string,
    confirmPwd: string,
    phone: string
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, "Minimum 4 Characters").max(16, "Maximum 16 Characters")
        .required("Password is Mandatory"),
    confirmPwd: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
});


const SignUp = ({ navigation, setNewUser }) => {

    // const SignUpSchema = Yup.object().shape({
    //     name: Yup.string()
    //         .min(2, "Too Short")
    //         .max(25, "Too Long")
    //         .required('Required'),
    //     email: Yup.string().email('Invalid email').required('Required'),
    // phone: Yup.number().min(10, "Please Enter The Number Correctly")
    //     .max(10, "Please Enter The Number Correctly").required("Required"),
    //     password: Yup.string().min(4, "Minimum 4 Characters").max(16, "Maximum 16 Characters")
    //         .required("Required")
    // })

    const handleSignUp = async (data: any) => {
        trigger("impactMedium", options);
        try {
            console.log(data.name)
            const response = await Auth().createUserWithEmailAndPassword(data.email, data.password);
            await response.user.updateProfile({
                displayName: data.name,
            })
            await response.user.sendEmailVerification();
            const userData = {
                id: response.user.uid,
                name: data.name,
                email: data.email,
                phone: data.phone
            }
            await firestore().collection("users").doc(response.user.uid).set(userData)
            console.log(response)
        }
        catch (error) {
            console.log(error);
        }
    }

    const initialValues: MyFormValues = {
        email: "",
        name: "",
        password: "",
        confirmPwd: "",
        phone: ""
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                handleSignUp(values);
            }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched
            }) => (
                <FormControl >
                    {console.log("errors => ", errors, "touched => ", touched)}
                    <VStack space={3}>
                        <Box>
                            <FormControl.Label isRequired>Name</FormControl.Label>
                            <Input
                                onChangeText={handleChange('name')}
                                value={values.name}
                                borderRadius={15} _focus={{
                                    focusOutlineColor: "fuchsia.500",
                                    bg: "fuchsia.100",
                                }} size="md" placeholder='Name' />
                            {
                                (errors.name)
                                    ?
                                    (
                                        <Text fontSize={12} mt={2} color="danger.900">
                                            {errors.name}
                                        </Text>
                                    ) :
                                    null
                            }
                        </Box>
                        <Box>
                            <FormControl.Label isInvalid={'email' in errors} isRequired>Email</FormControl.Label>
                            <Input
                                onChangeText={handleChange('email')}
                                value={values.email}
                                borderRadius={15} _focus={{
                                    focusOutlineColor: "fuchsia.500",
                                    bg: "fuchsia.100",
                                }} size="md" placeholder='Email' />
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
                            <FormControl.Label isInvalid={'phone' in errors} isRequired>Phone</FormControl.Label>
                            <Input
                                onChangeText={handleChange('phone')}
                                value={values.phone}
                                borderRadius={15} _focus={{
                                    focusOutlineColor: "fuchsia.500",
                                    bg: "fuchsia.100",
                                }} size="md" placeholder='Phone' />
                            {
                                (errors.phone)
                                    ?
                                    (
                                        <Text fontSize={12} mt={2} color="danger.900">
                                            {errors.phone}
                                        </Text>
                                    ) :
                                    null
                            }
                        </Box>
                        <Box>
                            <FormControl.Label isInvalid={'password' in errors} isRequired>Password</FormControl.Label>
                            <Input
                                type="password"
                                onChangeText={handleChange('password')}
                                value={values.password}
                                borderRadius={15} _focus={{
                                    focusOutlineColor: "fuchsia.500",
                                    bg: "fuchsia.100",
                                }} size="md" placeholder='Password' />
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
                        <Box>
                            <FormControl.Label isInvalid={'password' in errors} isRequired>Confirm Password</FormControl.Label>
                            <Input
                                type="password"
                                onChangeText={handleChange('confirmPwd')}
                                value={values.confirmPwd}
                                borderRadius={15} _focus={{
                                    focusOutlineColor: "fuchsia.500",
                                    bg: "fuchsia.100",
                                }} size="md" placeholder='Password' />
                            {
                                (errors.confirmPwd)
                                    ?
                                    (
                                        <Text fontSize={12} mt={2} color="danger.900">
                                            {errors.confirmPwd}
                                        </Text>
                                    ) :
                                    null
                            }
                        </Box>
                        <Button onPress={handleSubmit} borderRadius={15} shadow={5} _pressed={{
                            bg: "fuchsia.800",
                        }} bg={'fuchsia.500'}>Sign Up</Button>
                    </VStack>
                </FormControl>)}
        </Formik>
    )
}

export default SignUp