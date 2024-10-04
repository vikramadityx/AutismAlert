import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Box, Text } from 'native-base'
import Firestore from '@react-native-firebase/firestore'

const Results = ({ route, navigation }) => {

    const { answer, id } = route.params


    const [sum, setSum] = useState(0)

    const totalSum = () => {
        var tempSum = 0;
        answer.map((item) => {
            tempSum = tempSum + item.answer;
        })
        setSum(tempSum);
        return tempSum;
    }


    const handleSum = async () => {
        await Firestore().collection("patients").doc(id).update({
            totalScore: sum,
            degreeOfAutism: degreeOfAutism(),
            percentageOfDisability: percentageOfDisability()
        })
    }

    const uploadData = async () => {
        try {
            const res = await Firestore().collection("patients").doc(id).update({
                testResult: answer,
            })
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        console.log("WK")
        totalSum();
        uploadData();
        handleSum()
    }, [sum])

    const degreeOfAutism = () => {
        if (sum < 70) {
            return "Normal"
        }
        else if (sum >= 70 && sum <= 106) {
            return "Mild Autism"
        }
        else if (sum >= 107 && sum <= 153) {
            return "Moderate Autism"
        }
        else {
            return "Severe Autism"
        }
    }

    const percentageOfDisability = () => {
        console.log(sum)
        if (sum <= 70) {
            return "40%"
        }
        else if (sum >= 71 && sum <= 88) {
            return "50%"
        }
        else if (sum >= 89 && sum <= 105) {
            return "60%"
        }
        else if (sum >= 106 && sum <= 123) {
            return "70%"
        }
        else if (sum >= 124 && sum <= 140) {
            return "80%"
        }
        else if (sum >= 141 && sum <= 158) {
            return "90%"
        }
        else {
            return "100%"
        }
    }



    return (
        <Box h="100%" p={10}>
            <Box pt={20} pb={20} p={2} borderRadius={25} borderStyle="solid" justifyContent="space-between" borderColor="fuchsia.900" borderWidth={2} h="100%">
                <Box>
                    <Box>
                        <Text textAlign="center" fontWeight="bold" color="fuchsia.500" fontSize={30}>Your Total Score</Text>
                    </Box>
                    <Box alignSelf="center" borderRadius={10} shadow={5} mt={2} bgColor="fuchsia.300" width={100}>
                        <Text textAlign="center" color="fuchsia.700" fontWeight="bold" fontSize={30}>{sum}</Text>
                    </Box>
                </Box>
                <Box alignItems="center" flexDirection="column" mt={10}>
                    <Box>
                        <Text color="fuchsia.500" fontWeight="bold" fontSize={25}>Degree of Autism :</Text>
                    </Box>
                    <Box mt={5} shadow={5} borderRadius={10} justifyContent="center" alignItems="center" p={2} bgColor="fuchsia.300">
                        <Text fontSize={25} fontWeight="bold" color="fuchsia.900">{degreeOfAutism()}</Text>
                    </Box>
                </Box>

                <Box alignItems="center" flexDirection="column" mt={10}>
                    <Box>
                        <Text color="fuchsia.500" fontWeight="bold" fontSize={25}>Percentage of Disability :</Text>
                    </Box>
                    <Box mt={5} shadow={5} borderRadius={10} justifyContent="center" alignItems="center" p={2} bgColor="fuchsia.300">
                        <Text fontSize={25} fontWeight="bold" color="fuchsia.900">{percentageOfDisability()}</Text>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default Results