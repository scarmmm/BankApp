import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image, TextInput } from "react-native";
import { Colors } from '@/constants/Colors';
import { Pressable } from "react-native-gesture-handler";
import { useGlobalState } from './GlobalStateContext';
import { useEffect } from "react";
import { useNavigation } from 'expo-router';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from "react";

export default function Analysis()
{
  const { selectedModel, setSelectedModel } = useGlobalState();
  const navigation = useNavigation();
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

  const footerComp = <Text style={{ color: theme.text }}> End of Models </Text>;
  const separatorComp = <View style={styles.separator} />;
  const [applicantIncome, setApplicantIncome] = React.useState("Enter value here");
  const [coApplicantIncome, setCoApplicantIncome] = React.useState('');
  
  return(
    <Container{...(Platform.OS === 'web' ? { contentContainerStyle: styles.contentContainer } : { style: styles.contentContainer })}>
       <View style = {styles.contentContainer} >
          <Text style = {styles.text}> Please enter the applicant's annual income below</Text>
          <TextInput style = {styles.inputtext} placeholder ="Enter Value Here"/>
       </View>
     </Container>
  );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
      contentContainer: {
        flex: 1,
        backgroundColor: theme.background,
      },
      text:
      {
        fontSize: 20,
        textAlign: 'center', 
        color: theme.text
      },
      inputtext: 
      {
        borderWidth: 1,
        borderColor: colorScheme === 'dark' ? 'grey' : '#000',
        color: theme.text,
        textAlign: 'center'
      }
    });
  }