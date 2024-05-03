import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image, Pressable, Alert } from 'react-native';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB, storage } from '../firebaseauth/firebaseConfig'; // Import Firebase Storage
import { Box, Button, Center, ScrollView, Text, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { ref, deleteObject } from 'firebase/storage'; // Import ref and deleteObject from Firebase Storage

const RinciScreen = ({ route, navigation }) => {
  const { title, deskripsi, address, uploaderUid, id } = route.params;
  const auth = getAuth();
  const [imageURL, setImageURL] = useState(null); // Store the image URL
  const [loadingEdit, setLoadingEdit] = useState(false); // Loading state for the Edit button
  const [loadingDelete, setLoadingDelete] = useState(false); // Loading state for the Delete button
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state to true


  useEffect(() => {
    const fetchUserData = async () => {
      if (!uploaderUid) {
        console.error('Uploader UID is missing.');
        return;
      }

      try {
        const userDocRef = doc(FIREBASE_DB, 'users', uploaderUid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
        } else {
          console.error('User data not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading state to false when fetching is complete
      }
    };

    fetchUserData();
  }, []); // Add uploaderUid to the dependency array

  const edit = () => {
    if (auth.currentUser.uid === uploaderUid) {
      navigation.navigate('milo', { id, title, address, deskripsi });
    } else {
      alert('You do not have permission to edit this data.');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!uploaderUid) {
        console.error('Uploader UID is missing.');
        return;
      }

      try {
        const userDocRef = doc(FIREBASE_DB, 'users', uploaderUid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
        } else {
          console.error('User data not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading state to false when fetching is complete
      }
    };

    fetchUserData();
  }, []); // Add uploaderUid to the dependency array


  const alerting = () => {
    // Show an alert before proceeding with the deletion
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleDelete(), // Call your delete function here
        },
      ],
      { cancelable: true }
    );
  };
  

  useEffect(() => {
    // Fetch the image URL when the component mounts
    fetchImageURL(id);
  }, [id]);

  const fetchImageURL = async (documentId) => {
    try {
      const docRef = doc(FIREBASE_DB, 'TODOS', documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setImageURL(data.image); // Assuming the image URL is stored in the 'image' field
      }
    } catch (error) {
      console.error('Error fetching image URL:', error);
    }
  };

  const handleDelete = async () => {
    if (auth.currentUser.uid === uploaderUid) {
      setLoadingDelete(true);
      try {
        await deleteDoc(doc(FIREBASE_DB, 'TODOS', id));
        navigation.navigate('bawah');
      } catch (error) {
        console.error('Error deleting chat:', error);
      } finally {
        setLoadingDelete(false);
      }
    } else {
      alert('You do not have permission to delete this data.');
    }
  };

  return (
    <View style={{ flex: 1,  position: 'relative', backgroundColor: "#FFFF" }}>
      <HStack space={100} w="full" bgColor="#5EBC67" py="11" alignItems="center" marginBottom={3} safeAreaTop>
      <Pressable
          onPress={() => navigation.goBack()} // Navigates back
          >
          <MaterialIcons name="arrow-back" size={40} color="white" />
        </Pressable>
          <Text color="white" fontSize={25} bold>
          Details
          </Text>
      </HStack>
      <View style={{ flex: 1, padding:20, position: 'relative', backgroundColor: '#fff' }}>
        <ScrollView marginTop={1}>
          <Center>
            <Pressable
              onPress={() => navigation.navigate('ImageView', { imageURL, navigation })} // Navigate to ImageViewScreen with imageURL
            >
              {imageURL && (
                <Image
                  source={{ uri: imageURL }}
                  style={{ width: 400, height: 400, marginBottom: 10 }}
                />
              )}
            </Pressable>
          </Center>

          <Box style={{ backgroundColor: '#5EBC67', padding: 15, borderRadius: 10, marginBottom: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
              {title}
            </Text>
          </Box>

          <Box style={{ backgroundColor: '#5EBC67', padding: 10, borderRadius: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 18, color: 'white' }}>
              Alamat: {address}
            </Text>
          </Box>

          <Box style={{ backgroundColor: '#5EBC67', padding: 10, borderRadius: 10, marginBottom: 30 }}>
            <Text style={{ fontSize: 18, color: 'white' }}>
              Description: {deskripsi}
            </Text>
          </Box>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
              marginBottom={15}
              w="90%"
              rounded={20}
              bgColor="#262626"
              onPress={edit}
              disabled={loadingEdit}
            >
              {loadingEdit ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text color="white">EDIT</Text>
              )}
            </Button>
            <Button
              w="90%"
              marginTop={5}
              rounded={20}
              bgColor="#262626"
              onPress={alerting}
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text color="white">DELETE</Text>
              )}
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RinciScreen;
