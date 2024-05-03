import React, { useState, useEffect } from 'react';
import { View, Image,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase/app'; // Import the Firebase SDK
import 'firebase/storage';
import 'firebase/auth';
import { Button } from 'native-base';

// Initialize Firebase (make sure you have already configured Firebase)

export default function EditProfileScreen() {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImageToFirebase = async () => {
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();

      // Create a reference to the storage location
      const storageRef = firebase.storage().ref().child(`profile-images/${user.uid}`);

      // Upload the image to Firebase Storage
      await storageRef.put(blob);

      // You can also record the uploader's UID in your database here if needed
      // For example, with Firebase Firestore
      // const db = firebase.firestore();
      // const profileRef = db.collection('profiles').doc(user.uid);
      // await profileRef.set({ profileImage: storageRef.fullPath }, { merge: true });

      // Clear the image state
      setImage(null);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#5EBC67" }}>
      <Image
        source={{ uri: image || 'https://via.placeholder.com/150' }}
        style={{ width: 150, height: 150, borderRadius: 75 }}
      />
      <Button  onPress={pickImage}
        marginTop={10}
        padding={5}
        my={35}
        w="70%"
        rounded={20}
        bgColor="#262626">PICK IMAGE</Button>
      <Button  marginTop={2}
          my={35}
          padding={5}
          w="70%"
          rounded={20}
          bgColor="#262626"  >CHANGE PROFILE PICTURE</Button>
    </View>
  );
}
