import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image } from "react-native";
import { Colors } from '@/constants/Colors';
import { ML_MODELS } from '@/constants/ModelOptions';
import ML_IMAGES from '@/constants/ModelPictures';
import { Pressable } from "react-native-gesture-handler";
import { useGlobalState } from './GlobalStateContext';
import { useEffect } from "react";
import { useNavigation } from 'expo-router';

export default function ModelScreen() {
  const { selectedModel, setSelectedModel } = useGlobalState();
  const navigation = useNavigation();
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

  const footerComp = <Text style={{ color: theme.text }}> End of Models </Text>;
  const separatorComp = <View style={styles.separator} />;

  useEffect(() => {
      navigation.setOptions({headerTitle: "Current Model: " + (selectedModel || 'None')})
  });

  return (
    <Container>
      <FlatList 
        data={ML_MODELS}
        keyExtractor={(item) => item.id.toString()} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => separatorComp}
        ListFooterComponent={footerComp}
        ListFooterComponentStyle={styles.footerComp}
        ListEmptyComponent={<Text>No data</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.modelTextRow}>
              <Text style={[styles.modelItemTitle, styles.modelItemText]}>{item.title}</Text>
              <Text style={styles.modelItemText}>{item.description}</Text>
            </View>
            <Pressable onPress={() => setSelectedModel(item.title)}>
              <Image source={ML_IMAGES[0]} style={styles.modelImage} />
            </Pressable>
          </View>
        )}
      />
    </Container>
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
      height: 100,
    },
  });
}
