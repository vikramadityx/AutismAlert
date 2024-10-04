import React, { useState, useRef, useEffect } from 'react'
import { Box, Text, Avatar, HStack, Heading, FormControl, Radio, VStack, ScrollView, Button, FlatList, Modal, Alert, IconButton, CloseIcon } from 'native-base'
import { Dimensions } from 'react-native'
import data from '../data/data'
import dataHindi from '../data/dataHindi'
import Firestore from '@react-native-firebase/firestore'
import Auth from '@react-native-firebase/auth'
import { Formik } from 'formik'
import { StackActions } from '@react-navigation/native';

import { trigger } from "react-native-haptic-feedback";

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

const { height, width } = Dimensions.get('window')

const dataHindi2 = dataHindi;

const Question = (props: any) => {

    return (
        <Box alignItems="center" mx={2}>
            <Box w="95%" flexDirection="row" justifyContent="center" mt={10}>
                <Box w="15%">
                    <Text color="fuchsia.100" fontSize={20} fontWeight="black">Q{props.data[props.ques].questionNumber} </Text>
                </Box>
                <Box w="85%">
                    <Text color="fuchsia.100" fontSize={20}>{props.data[props.ques].question}</Text>
                </Box>
            </Box>
            <ScrollView mt={10}>
                <FormControl justifyContent="center" alignItems="center">
                    <Radio.Group
                        value={props.radioVal}
                        onChange={(val) => { props.handleChange(val) }}
                        name="exampleGroup"
                        accessibilityLabel="select prize"
                        defaultValue='0'>
                        <VStack pb={5} space={2}>
                            <Box shadow={2} p={2} borderRadius={15} bg="fuchsia.200" w={Dimensions.get('window').width - 50}>
                                <Radio colorScheme="fuchsia" size="lg" value="1" my="1">
                                    <Text fontWeight="bold">Score 1 - Upto 20%</Text><Text fontStyle="italic" >(Rarely)</Text>
                                </Radio>
                            </Box>
                            <Box shadow={2} p={2} borderRadius={15} bg="fuchsia.200" w={Dimensions.get('window').width - 50}>
                                <Radio colorScheme="fuchsia" size="lg" value="2" my="1">
                                    <Text fontWeight="bold">Score 2 - 21 - 40%</Text><Text fontStyle="italic" >(Sometimes)</Text>
                                </Radio>
                            </Box>
                            <Box shadow={2} p={2} borderRadius={15} bg="fuchsia.200" w={Dimensions.get('window').width - 50}>
                                <Radio colorScheme="fuchsia" size="lg" value="3" my="1">
                                    <Text fontWeight="bold">Score 3 - 41 - 60%</Text><Text fontStyle="italic" >(Frequently)</Text>
                                </Radio>
                            </Box>
                            <Box shadow={2} p={2} borderRadius={15} bg="fuchsia.200" w={Dimensions.get('window').width - 50}>
                                <Radio colorScheme="fuchsia" size="lg" value="4" my="1">
                                    <Text fontWeight="bold">Score 4 - 61 - 80%</Text><Text fontStyle="italic" >(Mostly)</Text>
                                </Radio>
                            </Box>
                            <Box shadow={2} p={2} borderRadius={15} bg="fuchsia.200" w={Dimensions.get('window').width - 50}>
                                <Radio colorScheme="fuchsia" size="lg" value="5" my="1">
                                    <Text fontWeight="bold">Score 5 - 81 - 100%</Text><Text fontStyle="italic" >(Always)</Text>
                                </Radio>
                            </Box>
                        </VStack>
                    </Radio.Group>
                </FormControl>
            </ScrollView>
        </Box>
    )
}

const Main = ({ navigation, route }) => {


    const { id, name, age, lang, gender, city, } = route.params

    const [answer, setAnswer] = useState<Array<Object>>([]);
    // const [sum, setSum] = useState(0)
    const [ques, setQues] = useState(0);
    const [tempAns, setTempAns] = useState("1")
    const [radioVal, setRadioVal] = useState("0");
    const [modalVisible, setModalVisible] = useState(false);
    const [sum, setSum] = useState(0)

    const storeData = async () => {
        await Firestore().collection("users").doc(Auth().currentUser.uid).update({
            patients: Firestore.FieldValue.arrayUnion(id)
        })

        await Firestore().collection("patients").doc(id).set({
            userId: Auth().currentUser.uid,
            id: id,
            name: name,
            age: age,
            city: city,
            gender: gender,
            language: lang,
            testResults: [],
            degreeOfAutism: "",
            percentageOfDisability: "",
        })
    }

    const dataEng = data;


    useEffect(() => {
        storeData()
    }, [])


    // const totalSum = () => {
    //     var tempSum = 0;
    //     answer.map((item) => {
    //         tempSum = tempSum + item.answer;
    //     })

    //     setSum(tempSum);
    // }

    const handleNext = async () => {

        trigger("impactMedium", options);

        console.log(ques, "NEXT")

        setRadioVal("0");

        const index = answer.findIndex((x: any) => {
            return ques === x.questionNumber
        });

        console.log("index => ", index);

        console.log(answer);

        if (radioVal === "0") {
            setAlertVisible(true);
        }

        else if (ques === 39) {
            const temp = {
                questionNumber: ques,
                answer: tempAns
            }
            console.log(ques, "Question Number", tempAns, "Value")

            if (index === -1) {
                setAnswer([...answer, temp]);
            }
            else {
                let newTempArr = [...answer];
                newTempArr[index] = { ...newTempArr[index], answer: tempAns };
                setAnswer(newTempArr);
            }
            setModalVisible(true);
        }
        else if (ques < 39) {
            setQues(ques + 1);
            const temp = {
                questionNumber: ques,
                answer: tempAns
            }
            console.log(ques, "Question Number", tempAns, "Value")
            if (index === -1) {
                setAnswer([...answer, temp]);
            }
            else {
                let newTempArr = [...answer];
                newTempArr[index] = { ...newTempArr[index], answer: tempAns };
                setAnswer(newTempArr);
            }
        }
        else {
            console.log("You Are on the Last Question");
        }

    }

    const showResult = () => {
        trigger("impactMedium", options);
        navigation.dispatch(
            StackActions.replace('Results',
                {
                    answer: answer,
                    id: id
                }
            )
        );
    }

    const handlePrevious = () => {
        trigger("impactMedium", options);
        if (ques > 0) {
            setQues(ques - 1);
        }
        else {
            console.log("You Are on the First Question");
        }
    }

    const handleChange = (value) => {
        setRadioVal(value);
        setTempAns(parseInt(value))
    }

    const [alertVisible, setAlertVisible] = useState(false);

    return (
        <Box h="100%">
            <Box px={2} h="20%" justifyContent="center" alignItems="center">
                <Heading>{lang === "en" ? dataEng[ques].title : dataHindi2[ques].title}</Heading>
            </Box>

            <Box
                justifyContent="space-between"
                p={2}
                pb={5}
                w="100%"
                h="80%"
                bg="fuchsia.500"
                borderTopRightRadius={50}
                borderTopLeftRadius={50}
            // h={Dimensions.get('window').height - 150}
            >
                <Formik
                    initialValues={{
                        questionNumber: " ",
                        answer: ""
                    }}
                    onSubmit={(values) => console.log(values)}
                >
                    {({ values, handleSubmit }) =>
                    (
                        <>
                            <Question data={lang === "en" ? dataEng : dataHindi2} radioVal={radioVal} ques={ques} handleChange={handleChange} />
                            <HStack

                                alignSelf="center"
                                justifyContent="space-between"
                                w={Dimensions.get('window').width - 50}>
                                <Button onPress={() => handlePrevious()} borderRadius={10} shadow={5} w={100} colorScheme="fuchsia" _text={{
                                    color: "fuchsia.200"
                                }} bg="fuchsia.900">
                                    Previous
                                </Button>
                                {ques < 39 ?
                                    <Button isDisabled={radioVal === "0" ? true : false} onPress={() => handleNext()} borderRadius={10} shadow={5} w={100} colorScheme="fuchsia" _text={{
                                        color: "fuchsia.200"
                                    }} bg="fuchsia.900">
                                        Next
                                    </Button> :
                                    <Button onPress={() => handleNext()} borderRadius={10} shadow={5} w={100} colorScheme="fuchsia" _text={{
                                        color: "fuchsia.200"
                                    }} bg="fuchsia.900">
                                        Finish
                                    </Button>
                                }
                            </HStack>
                        </>
                    )}
                </Formik>



                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} safeAreaTop={true}>
                    <Modal.Content p={10} alignItems="center" borderRadius={15} maxWidth="350">
                        <Button onPress={() => showResult()} borderRadius={10} shadow={5} w={150} colorScheme="fuchsia" _text={{
                            color: "fuchsia.200"
                        }} bg="fuchsia.900">
                            Show Result
                        </Button>
                    </Modal.Content>
                </Modal>

                <Modal isOpen={alertVisible} onClose={() => setAlertVisible(false)} safeAreaTop={true}>
                    <Modal.Content>
                        <Alert w="100%" colorScheme="fuchsia">
                            <VStack space={2} flexShrink={1} w="100%">
                                <HStack flexShrink={1} space={2} justifyContent="space-between">
                                    <HStack space={2} flexShrink={1}>
                                        <Alert.Icon mt="1" />
                                        <Text fontSize="md" color="coolGray.800">
                                            Please select an option !
                                        </Text>
                                    </HStack>
                                    <IconButton onPress={() => setAlertVisible(false)} variant="unstyled" _focus={{
                                        borderWidth: 0
                                    }} icon={<CloseIcon size="3" />} _icon={{
                                        color: "coolGray.600"
                                    }} />
                                </HStack>
                            </VStack>
                        </Alert>
                    </Modal.Content>
                </Modal>
            </Box>
        </Box >
    )
}

export default Main