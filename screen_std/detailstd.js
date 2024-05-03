import React, { useEffect, useState } from 'react';
import { View, Image, Pressable, ActivityIndicator } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../firebaseauth/firebaseConfig';
import { Box, Button, Center, HStack, ScrollView, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const RinciScreen = ({ route, navigation }) => {
  const { title, deskripsi, address, uploaderUid, id } = route.params;
  const [imageURL, setImageURL] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false); // Loading state for data saving

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

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: "#fff" }}>
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
      <View style={{ flex: 1, padding: 20, position: 'relative', backgroundColor: "#fff" }}>
        <ScrollView marginTop={10}>
          <Center>
            <Pressable
              onPress={() => navigation.navigate('ImageView', { imageURL })} // Navigate to ImageViewScreen with imageURL
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

          <Box style={{ backgroundColor: '#5EBC67', padding: 10, borderRadius: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 18, color: 'white' }}>
              Description: {deskripsi}
            </Text>
          </Box>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RinciScreen;
