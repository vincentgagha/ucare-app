import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Pressable, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const ImageViewScreen = ({ route, navigation }) => {
  const { imageURL,} = route.params;
  // Use the useNavigation hook to access the navigation object

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageURL }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  goBackButton: {
    position: 'absolute',
    top: 20, // Adjust the value to position the button vertically
    left: 10, // Adjust the value to position the button horizontally
    backgroundColor: 'transparent',
    padding: 10,
  },
  goBackText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ImageViewScreen;
