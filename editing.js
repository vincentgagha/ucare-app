import React, { useState } from 'react';
import { View, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { Input, Box, Button, Text, HStack } from 'native-base';
import { doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from './firebaseauth/firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';


const EditScreen = ({ route, navigation }) => {
  const { id, title, address, deskripsi } = route.params;
  const [newTitle, setNewTitle] = useState(title);
  const [newAddress, setNewAddress] = useState(address);
  const [newDescription, setNewDescription] = useState(deskripsi);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    try {
      // Update the document in Firestore with the new data
      await updateDoc(doc(FIREBASE_DB, 'TODOS', id), {
        title: newTitle,
        address: newAddress,
        deskripsi: newDescription,
      });

      // Handle successful update here, e.g., navigate back to the previous screen
      navigation.navigate('bawah');

      setLoading(false);
    } catch (error) {
      console.error('Error updating document:', error);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: '#fff' }}>
        <HStack space={105} w="full" bgColor="#5EBC67" py="11"  alignItems="center"safeAreaTop>
        <Pressable
          onPress={() => navigation.goBack()} // Navigates back
          p={2}>
          <MaterialIcons name="arrow-back" size={40} color="white" />
        </Pressable>
        <Text color="white" fontSize={25} bold>
        Edit
          </Text>
        </HStack>
    <View style={{ flex: 1, padding:20, position: 'relative', backgroundColor: '#fff' }}>
      <ScrollView marginTop={10}>
        <Box style={{ backgroundColor: '#5EBC67', padding: 15, borderRadius: 10, marginBottom: 10, marginTop: 20 }}>
          <Input
            placeholder="Title"
            placeholderTextColor="white"
            value={newTitle}
            marginBottom={5}
            marginTop={5}
            onChangeText={(text) => setNewTitle(text)}
          />
          <Input
            placeholder="Alamat"
            placeholderTextColor="white"
            value={newAddress}
            marginBottom={5}
            onChangeText={(text) => setNewAddress(text)}
          />
          <Input
            placeholder="Deskripsi"
            placeholderTextColor="white"
            marginBottom={5}
            value={newDescription}
            onChangeText={(text) => setNewDescription(text)}
          />
          </Box>
       
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button
            my={35}
            w="70%"
            rounded={20}
            bgColor="#262626"
            onPress={handleUpdate}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text color="white">UPDATE</Text>
            )}
          </Button>
        </View>
      </ScrollView>
      </View>
    </View>
  );
};

export default EditScreen;
