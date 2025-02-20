import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import loanImage from "@/assets/images/paying-off-a-loan-early.jpg";
import { Link } from 'expo-router';
import { useGlobalState } from './GlobalStateContext';

const Home = () => {
  const { selectedModel } = useGlobalState();

  return (
    <View style={styles.container}>
      <ImageBackground source={loanImage} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Loan Approval Algorithm</Text>
        <Text style={styles.model}>
          Current Algorithm Selected: {selectedModel || 'None'}
        </Text>
        <Link href="/analysis" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Check Approval</Text>
          </Pressable>
        </Link>
        <Link href="/model" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Browse Models</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 120,
  },
  link: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 2,
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
    margin:10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  },
  model: 
  {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 6,
    backgroundColor: 'rgba(196, 176, 176, 0.75)'
  }
})