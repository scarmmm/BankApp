import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image } from "react-native";
import { Colors } from '@/constants/Colors';
import { ML_MODELS } from '@/constants/ModelOptions';
import ML_IMAGES from '@/constants/ModelPictures';
import { Pressable, GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { useGlobalState } from './GlobalStateContext';
import { useEffect } from "react";
import { useNavigation } from 'expo-router';

export default function ModelScreen() {
  const { selectedModel, setSelectedModel } = useGlobalState();
  const {modelID, setModelID} = useGlobalState();
  const navigation = useNavigation();
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const Container = Platform.OS === 'web' ? ScrollView : View; //determines which of the two we will use

  const footerComp = <Text style={{ color: theme.text }}></Text>;
  const separatorComp = <View style={styles.separator} />;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={{ color: theme.text }}>Current Model: {selectedModel || 'None'}</Text>,
    });
  }, [navigation, selectedModel, theme.text]);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container style = {{backgroundColor: theme.background, flex: 1}}>
        <FlatList
          data={ML_MODELS}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={footerComp}
          ListFooterComponentStyle={styles.footerComp}
          ListEmptyComponent={<Text>No data</Text>}
          renderItem={({ item }) => (
            <View style={styles.row}>

              <View style={styles.modelTextRow}>
                <Text style={[styles.modelItemTitle, styles.modelItemText]}>{item.title}</Text>
                <Text style={styles.modelItemText}>{item.description}</Text>
              </View> 

              <Pressable onPress={() =>{setSelectedModel(item.title); setModelID (item.id); console.log(item.id)}}>
                <Image source={ML_IMAGES[item.id - 1]} style={styles.modelImage} />
              </Pressable>
            </View>
          )}
        />
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
    },
    separator: {
      height: 1,
      backgroundColor: colorScheme === 'dark' ? 'white' : '#000',
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
      height: 105,
      marginBottom: 20,
      borderStyle: 'solid',
      borderColor: colorScheme === 'dark' ? 'white' : '#000',
      borderWidth: 2,
      borderRadius: 20,
      overflow: 'hidden',
      marginHorizontal: 'auto',
    },
    modelTextRow: {
      width: '65%',
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 5,
      flexGrow: 1,
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
      height: 105,
    },
  });
}
