import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Box, Text, FormControl, VStack, Input, Button, ScrollView, Select, CheckIcon, Radio, HStack } from 'native-base'
import { StackActions } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth'
import Firestore from '@react-native-firebase/firestore'
import ShortUniqueId from 'short-unique-id';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik'
import * as Yup from 'yup'
import { trigger } from "react-native-haptic-feedback";

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

const uid = new ShortUniqueId({ length: 10 });


interface MyFormValues {
    name: string,
    age: string,
    gender: string,
    city: string
}


const AddPatient = ({ navigation }) => {

    // const navigation = useNavigation()

    const AddPatientSchema = Yup.object().shape({
        name: Yup.string().max(16, 'Max 16 Characters').required('Name is Required'),
        age: Yup.string().required("Age is Mandatory"),
        gender: Yup.string().required("Gender is Required"),
        city: Yup.string().required("City is Required"),
    });

    const [patientData, setPatientData] = useState<Array<object>>([]);

    const [name, setName] = useState<string>("")
    const [age, setAge] = useState<number>()
    // const [patients, setPatients] = useState<Array<string>>([])
    const [lang, setLang] = useState("en")
    const [city, setCity] = useState("")
    const [gender, setGender] = useState<string>("Male")

    const handleTakeTest = (data: any) => {
        trigger("impactMedium", options);
        navigation.navigate("Main", {
            id: uid(),
            name: data.name,
            age: data.age,
            city: data.city,
            gender: data.gender,
            testResult: [],
            lang: lang
        })
    }

    const handleLogOut = async () => {
        await Auth().signOut()
    }

    const handlePatientHistory = () => {
        trigger("impactMedium", options);
        navigation.navigate("PatientHistory")
    }

    const initialValues: MyFormValues = {
        name: "",
        age: "",
        gender: "",
        city: ""
    }

    return (
        <Box justifyContent="space-between" h="100%" p={5} w="100%">
            <ScrollView>
                <Box h="40px" flexDirection="row" alignItems={"center"} justifyContent="space-between" w="100%">
                    <Box px={2} borderRadius="10px" shadow={2} h="100%" justifyContent={"center"} alignItems={"center"} bgColor="fuchsia.200">
                        <Text lineHeight={20} color="fuchsia.900" fontSize={20}>Hi {Auth().currentUser?.displayName} !</Text>
                    </Box>
                    <Button
                        h="40px"
                        onPress={() => { handleLogOut() }}
                        // position="absolute"
                        // top={5}
                        // right={5}
                        alignItems="flex-end"
                        w={100}
                        colorScheme="fuchsia"
                    >Logout</Button>
                </Box>
                <Box flexGrow={1} my={10} justifyItems="center" borderStyle="dashed" borderWidth={2} borderColor="#9c9c9c" p={3} borderRadius={10} bgColor="fuchsia.100">
                    <ScrollView>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={AddPatientSchema}
                            onSubmit={(values) => {
                                handleTakeTest(values)
                            }}>
                            {
                                ({
                                    handleSubmit,
                                    handleChange,
                                    values,
                                    errors,
                                    touched
                                }) => (
                                    <FormControl>
                                        <VStack space={4} w="100%">
                                            <Box>
                                                <FormControl.Label isRequired>Patient Name</FormControl.Label>
                                                <Input
                                                    onChangeText={handleChange('name')}
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
                                                <FormControl.Label isRequired>Patient Age <Text fontWeight={300} fontStyle={"italic"}>(in months)</Text></FormControl.Label>
                                                <Input
                                                    onChangeText={handleChange('age')}
                                                    borderRadius={15} _focus={{
                                                        focusOutlineColor: "fuchsia.500",
                                                        bg: "fuchsia.100",
                                                    }} size="md" placeholder='Age' />
                                                {
                                                    (errors.age)
                                                        ?
                                                        (
                                                            <Text fontSize={12} mt={2} color="danger.900">
                                                                {errors.age}
                                                            </Text>
                                                        ) :
                                                        null
                                                }
                                            </Box>
                                            <Box>
                                                <FormControl.Label isRequired>Gender</FormControl.Label>
                                                <Radio.Group colorScheme={"fuchsia"} name="myRadioGroup" accessibilityLabel="favorite number" value={values.gender} onChange={handleChange("gender")}>
                                                    <HStack w={"100%"} justifyContent={"space-between"}>
                                                        <Radio value="Male" my={1}>
                                                            Male
                                                        </Radio>
                                                        <Radio value="Female" my={1}>
                                                            Female
                                                        </Radio>
                                                        <Radio value="Other" my={1}>
                                                            Other
                                                        </Radio>
                                                    </HStack>
                                                </Radio.Group>
                                                {
                                                    (errors.gender)
                                                        ?
                                                        (
                                                            <Text fontSize={12} mt={2} color="danger.900">
                                                                {errors.gender}
                                                            </Text>
                                                        ) :
                                                        null
                                                }
                                            </Box>
                                            <Box>
                                                <FormControl.Label isRequired>City</FormControl.Label>
                                                <Input
                                                    onChangeText={handleChange('city')}
                                                    borderRadius={15} _focus={{
                                                        focusOutlineColor: "fuchsia.500",
                                                        bg: "fuchsia.100",
                                                    }} size="md" placeholder='City' />
                                                {
                                                    (errors.city)
                                                        ?
                                                        (
                                                            <Text fontSize={12} mt={2} color="danger.900">
                                                                {errors.city}
                                                            </Text>
                                                        ) :
                                                        null
                                                }
                                            </Box>
                                            <Box>
                                                <Box><FormControl.Label>Select Language</FormControl.Label></Box>
                                                <Box mt={2} justifyContent="space-between" flexDirection="row">
                                                    <Button _text={{
                                                        color: lang === 'en' ? "fuchsia.100" : "fuchsia.900"
                                                    }} bgColor={lang === 'en' ? "fuchsia.900" : "fuchsia.200"} onPress={() => setLang("en")} w="48%">English</Button>
                                                    <Button _text={{
                                                        color: lang === 'hi' ? "fuchsia.100" : "fuchsia.900"
                                                    }} bgColor={lang === 'hi' ? "fuchsia.900" : "fuchsia.200"} onPress={() => setLang("hi")} w="48%">Hindi</Button>
                                                </Box>
                                            </Box>
                                            <Button borderRadius={15} onPress={handleSubmit} shadow={5} _pressed={{
                                                bg: "fuchsia.300",
                                            }} bg={'fuchsia.200'} >
                                                <Text color="fuchsia.900">
                                                    Take Test
                                                </Text>
                                            </Button>
                                        </VStack>
                                    </FormControl>
                                )
                            }
                        </Formik>
                    </ScrollView>
                </Box>
                <Button
                    onPress={handlePatientHistory}
                    w="100%"
                    colorScheme="fuchsia"
                >Patient History</Button>
            </ScrollView >
        </Box >
    )
}

export default AddPatient