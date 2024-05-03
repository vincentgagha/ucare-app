import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Input, Text, HStack, Center,Pressable, Button, ScrollView, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_DB, storage } from '../firebaseauth/firebaseConfig';
import { SafeAreaView, ActivityIndicator, StyleSheet, View, Image} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function Uploadscreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [todo, setTodo] = useState('');
  const [descr, setDesc] = useState('');
  const [alamat, setAlamat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access media library is required');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }
  

  const uploadImageAndData = async () => {
    if (!todo || !alamat ||!descr) {
      setErrorMessage('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const user = getAuth().currentUser;
      if (user) {
        const TODOSData = {
          title: todo,
          address: alamat,
          deskripsi:descr,
          image: image,
          uploaderUid: user.uid,
        };

        // Upload image to storage
        await uploadImage(image, 'image');

        // Upload data to Firestore
        await addDoc(collection(FIREBASE_DB, 'TODOS'), TODOSData);
        // Handle successful upload here, e.g., navigate to a different screen
        // Reset state after successful upload
        setTodo('');
        setAlamat('');
        setDesc('');
        setImage(null);
        setLoading(false);
        navigation.navigate('bawah');
      } else {
        setErrorMessage('You must be logged in');
      }
    } catch (error) {
      setErrorMessage('Error creating todo: ' + error.message);
      setLoading(false);
    }
  

  async function uploadImage(uri, fileType) {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      // Create a unique filename based on the current timestamp
      const filename = new Date().getTime() + '_' + fileType;
      const storageRef = ref(storage, 'Stuff/' + filename);
  
      // Upload the image
      const uploadTask = uploadBytesResumable(storageRef, blob);
  
      // Listen for changes in the upload state
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload progress: ' + progress + '%');
        navigation.navigate('bawah');
      }, (error) => {
        console.error('Error uploading image:', error);
      }, () => {
        // Upload completed successfully
        console.log('Upload completed');
  
        // Get the download URL for the uploaded image
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            // Store the download URL in your Firestore document or perform any other desired action
            console.log('Download URL:', downloadURL);
            // Example: updateDoc(yourFirestoreDocumentRef, { image: downloadURL });
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
          });
      });
      navigation.navigate('bawah');
    } catch (error) {
      console.error('Error preparing image for upload:', error);
    }
  }
};
  return (
    <SafeAreaView style={styles.container}>
      <HStack space={3} w="full" bgColor="#5EBC67" py="11" alignItems="center" marginBottom={3} safeAreaTop>
        <Center w="full" py="2">
          <Text color="white" fontSize={25} bold>
            Add
          </Text>
        </Center>
      </HStack>

      <ScrollView marginTop={5}>
        <View flex={1} alignItems="center" justifyContent="center">
          <Pressable onPress={pickImage} w="70%" my={4} alignItems="center">
            <MaterialIcons name="add-photo-alternate" size={24} color="black" />
            <Text fontSize={15} color="black" fontWeight="bold">
              SELECT IMAGE
            </Text>
          </Pressable>
          {image && <Image 
          source={{ uri: image }} 
          props = "merdeka" 
          style={{ width: 300, height: 300 }} 
          my={4} />}

          <Box style={{ backgroundColor: '#5EBC67', padding: 20, borderRadius: 20, marginBottom: 20, marginTop: 20 }}>
          <Input
            my={4}
            placeholder="Enter title"
            placeholderTextColor="white"
            w="70%"
            variant="underlined"
            pl={2}
            color="white"
            onChangeText={(text) => setTodo(text)}
            value={todo}
          />

          <Input
            my={4}
            placeholder="Address"
            placeholderTextColor="white"
            w="70%"
            variant="underlined"
            pl={2}
            color="white"
            onChangeText={(text) => setAlamat(text)}
            value={alamat}
          />

          <Input
            my={4} // Add margin bottom
            placeholder="Enter description"
            placeholderTextColor="white"
            w="70%"
            variant="underlined"
            pl={2}
            color="white"
            onChangeText={(text) => setDesc(text)}
            value={descr}
          />
          </Box>

          {errorMessage ? (
            <Text color="red" fontSize={15} my={2}>
              {errorMessage}
            </Text>
          ) : null}

          <Button my={35} w="70%" rounded={20} bgColor="#262626" onPress={uploadImageAndData} disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> : <Text color="white">UPLOAD</Text>}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
