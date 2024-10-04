import { Box, Button, Text, Modal, Center, FormControl, Input, Spinner, HStack, VStack, ScrollView } from 'native-base'
import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, Alert } from 'react-native';
import XLSX from 'xlsx'
import { writeFile, readFile, DownloadDirectoryPath } from 'react-native-fs'
import firestore from '@react-native-firebase/firestore';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { Table, Row, Rows } from 'react-native-table-component';

function Admin() {

    const [allpatientData, setAllPatientData] = useState<any>([])

    const [csvData, setCsvData] = useState([])

    const exportDataToExcel = async () => {
        let data = csvData;

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Patients');
        const wbout = XLSX.write(wb, { type: 'base64' });

        const filename = DownloadDirectoryPath + `/${fileName}-${getTime()}.xlsx`

        writeFile(
            filename,
            wbout,
            'base64'
        ).then(res => {
            Alert.alert('Export Data Successfully')
        }).catch(e => {
            console.log("Error..", e)
        })

    }

    const getTime = () => {
        var today = new Date()
        let curTime = today.getHours() + '' + today.getMinutes() + '' +today.getSeconds() + '' +today.getMilliseconds()
        return curTime
    };

    const handleClick = async () => {
        try {
            let isPermittedExternalStorage = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );

            if (!isPermittedExternalStorage) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission needed',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                        message: "Please Allow Access to Your Storeage",
                    },
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    exportDataToExcel();
                    console.log("Permission Granted");
                }
                else {
                    console.log("Permission Denied");
                }
            } else {
                exportDataToExcel();
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    const getAllData = async () => {
        try {
            const patients = firestore()
                .collection('patients')
                .onSnapshot(query => {
                    let patients: Array<Object> = [];
                    query.forEach(documentSnapshot => {
                        const temp = {
                            id: documentSnapshot.id,
                            patientName: documentSnapshot.data().name,
                            patientAge: documentSnapshot.data().age,
                            patientTotalScore: documentSnapshot.data().totalScore,
                            patientCity: documentSnapshot.data().city,
                            degreeOfAutism: documentSnapshot.data().degreeOfAutism,
                            percentageOfDisability: documentSnapshot.data().percentageOfDisability,
                            patientGender: documentSnapshot.data().gender,
                            testResult: documentSnapshot.data().testResult,
                        }
                        patients.push(temp);
                    })
                    // console.log(patients)
                    setAllPatientData(patients);
                })

        } catch (e) {
            console.log(e)
        }
    }



    const convertAlldata = () => {
        const tempArr = []
        for (let i = 0; i < allpatientData.length; i++) {
            const temp = {};
            temp.id = allpatientData[i].id
            temp.age = allpatientData[i].patientAge
            temp.city = allpatientData[i].patientCity
            temp.gender= allpatientData[i].patientGender
            // temp["totalScore"] = allpatientData[i].patientTotalScore
            // temp["percentageOfDisability"] = allpatientData[i].percentageOfDisability
            // temp["degreeOfAutism"] = allpatientData[i].degreeOfAutism
            // temp.result = allpatientData[i].testResult
            const testRes = JSON.stringify(allpatientData[i].testResult)
            // console.log("test res" , testRes)
            for (let j = 0; j < 40; j++) {

                const data = JSON.parse(testRes);
                // const data2 = JSON.parse(data)
                // console.log("at i =>", i, data[j].answer);
                if (data.length > 0) {
                    temp[`Q${j + 1}`] = data[j].answer
                } else {
                    temp[`Q${j + 1}`] = "NAN"
                }
            }
            tempArr.push(temp);
            // console.log(allpatientData[i].patientName, allpatientData[i].patientAge)
        }
        setCsvData(tempArr);
    }

    useEffect(() => {
        getAllData();
        console.log(allpatientData)
        // console.log("length", csvData);

    }, [])

    // const headers = [
    //     { label: "Name", key: "patientName" },
    //     { label: "Age", key: "patientAge" },
    //     { label: "Q1", key: "testResult[0].answer" },
    //     { label: "Q2", key: "testResult[1].answer" },
    //     { label: "Q3", key: "testResult[2].answer" },
    //     { label: "Q4", key: "testResult[3].answer" },
    //     { label: "Q5", key: "testResult[4].answer" },
    //     { label: "Q6", key: "testResult[5].answer" },
    //     { label: "Q7", key: "testResult[6].answer" },
    //     { label: "Q8", key: "testResult[7].answer" },
    //     { label: "Q9", key: "testResult[8].answer" },
    //     { label: "Q10", key: "testResult[9].answer" },
    //     { label: "Q11", key: "testResult[10].answer" },
    //     { label: "Q12", key: "testResult[11].answer" },
    //     { label: "Q13", key: "testResult[12].answer" },
    //     { label: "Q14", key: "testResult[13].answer" },
    //     { label: "Q15", key: "testResult[14].answer" },
    //     { label: "Q16", key: "testResult[15].answer" },
    //     { label: "Q17", key: "testResult[16].answer" },
    //     { label: "Q18", key: "testResult[17].answer" },
    //     { label: "Q19", key: "testResult[18].answer" },
    //     { label: "Q20", key: "testResult[19].answer" },
    //     { label: "Q21", key: "testResult[20].answer" },
    //     { label: "Q22", key: "testResult[21].answer" },
    //     { label: "Q23", key: "testResult[22].answer" },
    //     { label: "Q24", key: "testResult[23].answer" },
    //     { label: "Q25", key: "testResult[24].answer" },
    //     { label: "Q26", key: "testResult[25].answer" },
    //     { label: "Q27", key: "testResult[26].answer" },
    //     { label: "Q28", key: "testResult[27].answer" },
    //     { label: "Q29", key: "testResult[28].answer" },
    //     { label: "Q30", key: "testResult[29].answer" },
    //     { label: "Q31", key: "testResult[30].answer" },
    //     { label: "Q32", key: "testResult[31].answer" },
    //     { label: "Q33", key: "testResult[32].answer" },
    //     { label: "Q34", key: "testResult[33].answer" },
    //     { label: "Q35", key: "testResult[34].answer" },
    //     { label: "Q36", key: "testResult[35].answer" },
    //     { label: "Q37", key: "testResult[36].answer" },
    //     { label: "Q38", key: "testResult[37].answer" },
    //     { label: "Q39", key: "testResult[38].answer" },
    //     { label: "Q40", key: "testResult[39].answer" }
    // ]
    const [showModal, setShowModal] = useState(false);

    const [fileName, setFileName] = useState("")

    return (
        <ScrollView>
            <Box py={4} p={1} justifyContent={"center"} alignItems="center">
                <Button borderRadius="full" isDisabled={allpatientData.length === 0 ? true : false} w={"100%"} colorScheme={"fuchsia"} onPress={() => convertAlldata()}>Generate CSV File</Button>
                <Button borderRadius={"full"} isDisabled={csvData.length === 0 ? true : false} mt={2} w={"100%"} colorScheme={"fuchsia"} onPress={() => setShowModal(true)}>Save Data</Button>
                <Center>
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Body>
                                <FormControl mt="3">
                                    <FormControl.Label>File Name</FormControl.Label>
                                    <Input onChangeText={(e) => setFileName(e)} mt={2} />
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button colorScheme={"fuchsia"} onPress={() => {
                                        handleClick();
                                        setShowModal(false);
                                    }}>
                                        Save
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Center>
                <Box mt={8}>
                    <Box borderRadius="10" alignItems="center" px={1} h={"50px"} bgColor={"fuchsia.900"} justifyContent={"space-between"} flexDirection="row">
                        <Box w="25%">
                            <Text color="fuchsia.100">Name</Text>
                        </Box>
                        <Box w="10%">
                            <Text color="fuchsia.100">Age</Text>
                        </Box>
                        <Box w="25%">
                            <Text color="fuchsia.100">City</Text>
                        </Box>
                        <Box w="20%">
                            <Text color="fuchsia.100">Gender</Text>
                        </Box>
                        <Box w="20%">
                            <Text color="fuchsia.100">Total Score</Text>
                        </Box>
                    </Box>
                    {allpatientData.length === 0 ?
                        <Spinner mt={4} color="fuchsia.500" colorScheme={"fuchsia"} size="lg" />
                        :
                        <VStack mt={2} space={2}>
                            {
                                allpatientData.map((item, index) => {
                                    return (
                                        <HStack key={index} alignItems="center" borderRadius="10" h="50px" bgColor={index % 2 === 0 ? "fuchsia.400" : "fuchsia.200"} justifyContent={"space-between"} >
                                            <Box shadow={5} p={1} w="25%">
                                                <Text numberOfLines={1}>{item.patientName}</Text>
                                            </Box>
                                            <Box shadow={5} w="10%">
                                                <Text>{item.patientAge}</Text>
                                            </Box>
                                            <Box shadow={5} w="25%">
                                                <Text>{item.patientCity}</Text>
                                            </Box>
                                            <Box shadow={5} w="20%">
                                                <Text>{item.patientGender}</Text>
                                            </Box>
                                            <Box shadow={5} w="20%">
                                                <Text>{item.patientTotalScore}</Text>
                                            </Box>
                                        </HStack>
                                    )
                                })
                            }
                        </VStack>}
                </Box>
            </Box >
        </ScrollView>
    )
}

export default Admin