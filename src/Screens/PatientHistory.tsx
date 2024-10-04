import { Box, ScrollView, Text, VStack, Pressable } from 'native-base'
import React, { useState, useEffect, useRef } from 'react'
import { View, Animated } from 'react-native'
import Firestore from '@react-native-firebase/firestore'
import Auth from '@react-native-firebase/auth'

const PatientCard = ({ name, age, id, totalScore, city, gender }) => {

  const [toggle, setToggle] = useState(false)
  const patientCardHeight = useRef(new Animated.Value(0)).current
  const patientCardPadding = useRef(new Animated.Value(0)).current
  const patientCardOpacity = useRef(new Animated.Value(0)).current
  const handleToggle = () => {
    if (toggle) {
      Animated.timing(patientCardHeight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()
      Animated.timing(patientCardPadding, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()
      Animated.timing(patientCardOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()
    }
    else {
      Animated.timing(patientCardHeight, {
        toValue: 150,
        duration: 500,
        useNativeDriver: false
      }).start()
      Animated.timing(patientCardPadding, {
        toValue: 15,
        duration: 500,
        useNativeDriver: false
      }).start()
      Animated.timing(patientCardOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start()
    }
    setToggle(!toggle);
  }

  return (
    <React.Fragment>
      <Pressable
        onPress={() => handleToggle()}
        shadow={2}
        flexDirection="row"
        justifyContent="space-between"
        borderBottomLeftRadius={toggle ? 0 : 10}
        borderBottomRightRadius={toggle ? 0 : 10}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        bgColor="fuchsia.300"
        p={2}>
        <Box flexDirection="row" justifyContent="space-between">
          <Text>{name} <Text fontWeight={300} fontStyle="italic">({id}) </Text> </Text>
          {/* <Text>{age}</Text> */}
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          {/* <Text>{age}</Text> */}
        </Box>
      </Pressable>
      <Animated.View style={{
        height: patientCardHeight,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "fuchsia",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopWidth: 0,
        padding: patientCardPadding,
        justifyContent: 'center',
        opacity: patientCardOpacity
      }}>
        <VStack space={2}>
          <Box w="100%" justifyContent={"space-between"} flexDirection={"row"} >
            <Box>
              <Text>Name</Text>
            </Box>
            <Box>
              <Text>{name}</Text>
            </Box>
          </Box>
          <Box w="100%" justifyContent={"space-between"} flexDirection={"row"} >
            <Box>
              <Text>Age <Text fontWeight={300} fontStyle="italic">(in months)</Text> </Text>
            </Box>
            <Box>
              <Text>{age}</Text>
            </Box>
          </Box>
          <Box w="100%" justifyContent={"space-between"} flexDirection={"row"} >
            <Box>
              <Text>Gender</Text>
            </Box>
            <Box>
              <Text>{gender}</Text>
            </Box>
          </Box>
          <Box w="100%" justifyContent={"space-between"} flexDirection={"row"} >
            <Box>
              <Text>City</Text>
            </Box>
            <Box>
              <Text>{city}</Text>
            </Box>
          </Box>
        </VStack>
      </Animated.View>
    </React.Fragment>
  )
}

const PatientHistory = () => {

  const allData = [];


  const [patientData, setPatientData] = useState<Array<object>>([]);

  const getData = async () => {

    try {
      const patient = Firestore()
        .collection('patients')
        .where("userId", "==", Auth().currentUser.uid)
        .onSnapshot(query => {
          let patients: Array<Object> = [];
          query.forEach(documentSnapshot => {
            const temp = {
              id: documentSnapshot.id,
              patientName: documentSnapshot.data().name,
              patientAge: documentSnapshot.data().age,
              patientCity: documentSnapshot.data().city,
              patientGender: documentSnapshot.data().gender,
              patientTotalScore: documentSnapshot.data().totalScore
            }
            patients.push(temp);
          })
          setPatientData(patients);
        })

      return () => patient();

    } catch (e) {
      console.log("error", e);
    }
  }

  useEffect(() => {
    getData();
  }, [])


  // const [toggle, setToggle] = useState(false)
  // const onPress = () => {

  // }

  return (
    <Box p={5}>
      < Box h="100%" borderStyle="solid" borderColor="fuchsia.500" borderRadius={10} borderWidth={1} p={5} >
        <ScrollView>
          {patientData.length === 0 ?
            <Box>
              <PatientCard name="loading...." />
            </Box>
            :
            <VStack space={4}>
              {
                patientData.map((item, index) => {
                  return (
                    <Box key={index} >
                      <PatientCard age={item.patientAge} city={item.patientCity} gender={item.patientGender} name={item.patientName} age={item.patientAge} id={item.id} />

                    </Box>
                  )
                })
              }
            </VStack>}
        </ScrollView>
      </Box >
    </Box >
  )
}

export default PatientHistory