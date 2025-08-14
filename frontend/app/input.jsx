import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Dropdown from 'react-native-input-select';
import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image, TextInput, KeyboardAvoidingView } from "react-native";
import { Colors } from '@/constants/Colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler';
import { useGlobalState } from './GlobalStateContext';
import { runOnJS } from 'react-native-reanimated';
export default function Input()  
{
    const {selectedModel, setSelectedModel} = useGlobalState();
    const {modelID, setModelID} = useGlobalState();
    const [applicantIncome, setApplicantIncome] = useState('');
    const [coApplicantIncome, setCoApplicantIncome] = useState(''); 
    const [loanAmount, setLoanAmount] = useState('');
    const [creditScore, setCreditScore] = useState('');
    const [propertyArea, setPropertyArea] = useState('');
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(theme, colorScheme);
    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView; 
    const minScore = 350; 
    const maxScore = 850; 

    const handleInput = () =>
        {
          const num = parseInt(creditScore, 10);
          if (num>=minScore && num<=maxScore)
            {
                //don't do anything
            }
          else 
          {
            alert("Credit Score input is invalid! (Must be a score from 350-850)")
            setCreditScore('')
          }  
        } 

        const sendData = async() => {
              //make sure that a model is selected
                try{
                  console.log("1");
                  const response = await fetch('http://192.168.4.63:8000/predict',{
                    method: "POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(
                        {
                          ApplicantIncome: parseFloat(applicantIncome),
                          CoapplicantIncome: parseFloat(coApplicantIncome),
                          LoanAmount: parseFloat(loanAmount),
                          Credit_History: parseFloat(creditScore) >= 630 ? 1.0 : 0.0,
                          model_id: parseInt(modelID),
                          Property_Area: parseInt(propertyArea)
                        })
                    });
                    console.log("2");
                     const data = await response.json(); 
                     if (response.ok)
                      {
                        //alert('We got a result');
                        console.log("GOOD");
                        //console.log(data);
                        if (JSON.stringify(data).includes("Approved"))
                          {
                            alert("Loan Approved!")
                          }
                        else
                        {
                          alert("Loan not approved.")
                        }
                      }
                      else{
                        alert("Did not work");
                        console.log("BAD");
                      }
                      

                    }
                    
                catch(error){
                      console.log(error.message);
                  }
                  
                    };

    const pressed = useSharedValue(false);
    const tap = Gesture.Tap()
        .onBegin(() => {
          pressed.value = true;
        })
        .onEnd((_event, success) => {
          // This callback is invoked when the gesture successfully completes (finger lifts up within maxDuration)
          if (success) 
            {
              if(!applicantIncome || !coApplicantIncome || !creditScore || !loanAmount || !propertyArea)
                { runOnJS (alert) ("Please fill in all boxes");
                  return;
                }
                console.log("Sending data:", {
                    ApplicantIncome: parseFloat(applicantIncome),
                    CoapplicantIncome: parseFloat(coApplicantIncome),
                    LoanAmount: parseFloat(loanAmount),
                    Credit_History: parseFloat(creditScore) >= 630 ? 1.0 : 0.0,
                    model_id: parseInt(modelID),
                    PropertyArea: parseInt(propertyArea)
});
               runOnJS(sendData)();
          }
        }
        )
        .onFinalize(() => {
          pressed.value = false;
        });

        const animatedStyles = useAnimatedStyle(() => ({
              backgroundColor: pressed.value ? 'green' : '#2B2B2B',
              transform: [{scale: withTiming
                (
                  pressed.value ? 1.2 : 1,
                  { duration: 120 } 
                )
              }],
            }));

    return(
    
    <KeyboardAvoidingView style = {styles.container} behavior='padding'>

        <GestureHandlerRootView style={{ alignItems: 'center', width: '100%' }} >
        <Text style = {styles.text}> Applicant Income </Text>
        <TextInput style = {styles.input}
        keyboardType="numeric"
        placeholder='Please enter only digits, no commas'
        value={applicantIncome}
        //onChangeText={(text) => setApplicantIncome(text)}
        textAlign='center'  
        onChangeText={setApplicantIncome}
        />

        <Text style = {styles.text}> CoApplicant Income </Text>
        <TextInput style = {styles.input}
        keyboardType='numeric'
        placeholder='Please enter only digits, no commas'
        value={coApplicantIncome}
        //onChangeText={(text) => setApplicantIncome(text)}
        textAlign='center'
        onChangeText={setCoApplicantIncome}
        />

        <Text style = {styles.text}> Loan Amount </Text>    
        <TextInput style = {styles.input}
        keyboardType="numeric"
        placeholder='Please enter only digits, no commas'
        value={loanAmount}
        //onChangeText={(text) => setApplicantIncome(text)}
        textAlign='center'
        onChangeText={setLoanAmount}
        />
        


        <Text style = {styles.text}> Credit Score </Text>
        <TextInput style = {styles.input}
        keyboardType="numeric"
        placeholder='Enter a value between 350 and 850'
        value={creditScore}
        //onChangeText={(text) => setApplicantIncome(text)}
        textAlign='center'
        onChangeText={setCreditScore}
        onEndEditing={handleInput}
        />

      <View style={{ width: 300, marginBottom: 20 }}>
      <Dropdown 
        label="Choose which best represent area of residence"
        placeholder="Select an option..."
        options={[
          { label: 'Urban', value: '0' },
          { label: 'Semi-Urban', value: '1' },
          { label: 'Rural', value: '2' },
        ]}
        selectedValue={propertyArea}
        onValueChange={(value) => setPropertyArea(value)}
        
        dropdownStyle={
          {
            borderWidth: 10,
            backgroundColor: theme.color,
            width: 290,
            alignItems: 'center',
            borderColor:'white',
            borderWidth: 1
          
          }

        }

        selectedItemStyle={
          {
              color: "white",
              justifyContent: 'center'
          }}

        placeholderStyle={{
          color: 'white'
        }}
        labelStyle={{color:"white", fontSize: 14, fontWeight: 'bold'}}
      
    />
    </View>

        <GestureDetector gesture={tap}>
            <Animated.View style ={[styles.button, animatedStyles]}>
                <Text style={styles.buttonText}>Submit</Text>
            </Animated.View>
        </GestureDetector>

        </GestureHandlerRootView>

    </KeyboardAvoidingView>
    );
}

function createStyles(theme,colorScheme){
return StyleSheet.create(
    {
        container:
        {
            flex:1,
            backgroundColor: colorScheme == 'dark' ? 'black' : 'white',
            alignItems: 'center',
            justifyContent: 'center'
        },
        input: 
        {
            borderWidth: 1,
            borderColor: colorScheme === 'dark' ? 'white' : '#000',
            color: theme.text,
            padding:10,
            margin:4,
            marginBottom:20,
            width: 300
        },
        text:
        {
            color: theme.text,
            fontSize: 15,
            fontWeight: 'bold'
            //alignContent: 'center'
        },
        button: {
            height: 30,
            borderRadius: 20,
            justifyContent: 'center',
            backgroundColor: '#2B2B2B', //rgba(255, 255, 255, 0.75)
            padding: 6,
            margin:20,
            height: 39,
            width: 150
          },
          buttonText: {
            color: 'white',
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 4,
          },
    }
);
}