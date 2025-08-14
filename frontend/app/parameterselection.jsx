import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image } from "react-native";
import { Colors } from '@/constants/Colors';
import {PARAMETERS} from '@/constants/ParameterOptions'
import { Pressable, GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { useGlobalState } from './GlobalStateContext';
import { useEffect } from "react";
import { useNavigation } from 'expo-router';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Checkbox from "expo-checkbox";

export default function ParameterSelection()
{
    const navigation = useNavigation();
    const colorScheme = Appearance.getColorScheme();
    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(theme, colorScheme);
    const headComp= <Text></Text> 
    const footerComp = <Text style={{ color: theme.text }}> End of Parameters </Text>;
    const { selectedParameters, setSelectedParameters } = useGlobalState();

    useEffect(() => {
        alert('The recommended setup is as follows');
        return () => 
            {
                setSelectedParameters({}); //will be called when the page closes to empty the object values
            };
        }, [setSelectedParameters]
    );
    
    return (
        <GestureHandlerRootView style = {{flex: 1, backgroundColor: theme.background}}>
            <Container style = {{flex: 1, justifyContent:'space-between'}}>
                <FlatList data = {PARAMETERS} // get data for flatlist
                numColumns={2}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.id.toString()} //define the keys that will track the instances of the items
                showsVerticalScrollIndicator = {false}
                ListEmptyComponent={<Text> No data is here</Text>}
                renderItem={({ item }) => (
                    <View style = {styles.view}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.modelTextRow}>{item.name}:</Text>
                            <BouncyCheckbox style={styles.button} fillColor="green" onPress={(isChecked) => {
                    // Update global state with the checkbox status keyed by item.id
                    setSelectedParameters(previousState => ({
                      ...previousState,
                      [item.id]: isChecked,
                    }));
                    console.log('Checkbox for item', item.id, 'set to', isChecked);
                  }}
                />
                        </View>
                        <Text style = {{paddingLeft: 7, color: theme.text}}> Parameter Rating: </Text>
                    </View>
                )}
                />
                <Pressable style={styles.press} onPress={() =>{ 
                    if (Object.values(selectedParameters).some(value => value === true)){
                    navigation.navigate('model');
                    }
                    else {
                        alert('Please select at least one parameter');
                    }
                }}>
                    <Text style = {{fontWeight: 'bold', color: theme.text}}> Click to Continue</Text>
                </Pressable>
            </Container>
        </GestureHandlerRootView>
    );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
      contentContainer: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 12,
        backgroundColor: theme.background,
        height: '96%',
        
      },
      press: 
      {
        alignItems: 'center',
        justifyContent: 'center', 
        borderStyle: 'solid', 
        borderWidth: 1,
        borderRadius: 30,
        borderColor: colorScheme === 'dark' ? 'grey' : '#000', 
        width: 140, 
        height: 90,
        marginLeft: 130,
        backgroundColor: theme.background 
      },
      view:{
        height:120,
        width: '50%',
        margin: 1,
        borderStyle: 'solid',
        borderColor: colorScheme === 'dark' ? 'grey' : '#000', 
        borderWidth:1,
        flexDirection: 'column',
      }, 
      modelTextRow: {
        width: '70%',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 5,
        marginBottom:20,
        flex: 1,
        color: theme.text
    
      },
      button: 
      {
        paddingTop: 10,
        paddingLeft: 5,
        marginBottom: 20,
        width: '20%'
      },
      test: {
        flexGrow: 1, 
        },
      separator: {
        height: 1,
        backgroundColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
        width: '50%',
        maxWidth: 300,
        marginHorizontal: 'auto',
        marginBottom: 10,
      },
      footerComp: {
        marginHorizontal: 'auto',
      },
      row: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 600,
        height: 100,
        marginBottom: 10,
        borderStyle: 'solid',
        borderColor: colorScheme === 'dark' ? 'grey' : '#000',
        borderWidth: 2,
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 'auto',
      },
     
      modelItemTitle: {
        fontSize: 18,
        textDecorationLine: 'underline',
      },
      modelItemText: {
        color: theme.text,
      },
      modelImage: {
        width: 100,
        height: 100,
      },
    });
  }
  