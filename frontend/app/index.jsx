import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import loanImage from "@/assets/images/iphoneblack1.webp";
import { Link, useRouter } from 'expo-router';
import { useGlobalState } from './GlobalStateContext';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

const Home = () => {
  const { selectedModel } = useGlobalState();
  const router = useRouter();
  const navigateToInput = () => {
    router.push('/input');
  };
  const navigateToInput2 = () => {
    router.push('/model')
  };

  const pressed = useSharedValue(false);
  const pressed2 = useSharedValue(false);


  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onEnd((_event, success) => {
      if (success) {
        runOnJS(navigateToInput)(); // Use runOnJS to call a JS thread function
      }
    })
    .onFinalize(() => {
      pressed.value = false;
    });


    const tap2 = Gesture.Tap()
    .onBegin(() => {
      pressed2.value = true;
    })
    .onEnd((_event, success) => {
      // This callback is invoked when the gesture successfully completes (finger lifts up within maxDuration)
      if (success) {
        // IMPORTANT: Trigger navigation here
        runOnJS(navigateToInput2)(); // Use runOnJS to call a JS thread function
      }
    })
    .onFinalize(() => {
      pressed2.value = false; 
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


    const animatedStyles2 = useAnimatedStyle(() => ({
      backgroundColor: pressed2.value ? 'green' : '#2B2B2B',
      transform: [{scale: withTiming
        (
          pressed2.value ? 1.2 : 1,
          { duration: 120 } 
        )
      }],
    }));



  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Wrap everything */}
    
      <View style={styles.container}>
        <ImageBackground source={loanImage} resizeMode="cover" style={styles.image}>
          <Text style={styles.title}>
            Loan Approval System
            </Text>
            
          <Text style={styles.model}>
            Current Algorithm Selected: {selectedModel || 'None'}   
          </Text>

          <View style = {{flexDirection: 'row'}}>


        
          <Link href="/input" style={{marginHorizontal: 'auto' }} asChild>
          <GestureDetector gesture={tap}>
            <Animated.View style ={[styles.button, animatedStyles]}>
              <Text style={styles.buttonText}>Check Approval</Text>
            </Animated.View>
          </GestureDetector>
          </Link>

          <Link href="/input" style={{marginHorizontal: 'auto' }} asChild>
          <GestureDetector gesture={tap2}>
            <Animated.View style ={[styles.button, animatedStyles2]}>
              <Text style={styles.buttonText}>Browse Models</Text>
            </Animated.View>
          </GestureDetector>
          </Link>

          </View> 
        </ImageBackground>
      </View>
    </GestureHandlerRootView>
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
    justifyContent: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold', 
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginTop: 100,
    marginBottom: 200
  
  },
  link: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: '#2B2B2B',
    padding: 2,
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#2B2B2B', //rgba(255, 255, 255, 0.75)
    padding: 6,
    margin:20,
    height: 89,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  },
  model: {
    paddingTop: 30,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    backgroundColor: '#2B2B2B',
    borderRadius: 20,
    height: 120, 
    marginBottom: 40
  }
});
