import { View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, HStack, Input, Pressable, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseauth/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Donasi({ navigation }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add new chat'
    });
  }, [navigation]);

  const createChat = async () => {
    if (!input) {
      setError('Chat name is required'); // Set an error message
      return;
    }
    setLoading(true); // Start loading

    try {
      const user = FIREBASE_AUTH.currentUser; // Get the current user
      if (user) {
        // Include the user's UID along with the chat data
        const chatData = {
          chatName: input,
          uploaderUid: user.uid, // Store the user's UID in the chat data
        };
        await addDoc(collection(FIREBASE_DB, 'chats'), chatData);
        setLoading(false); // Stop loading
        navigation.replace("bawah");
      } else {
        alert('You must be logged in to create a chat.');
        setLoading(false); // Stop loading
      }
    } catch (error) {
      alert('Error creating chat: ' + error.message);
      setLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HStack space={60}  w="full" bgColor="#5EBC67" py="11" alignItems="center" marginBottom={3} safeAreaTop>
      <Pressable
          onPress={() => navigation.goBack()} // Navigates back
          >
          <MaterialIcons name="arrow-back" size={40} color="white" />
        </Pressable>
          <Text color="white" fontSize={25} bold>
          Create group
          </Text>
          
        
         
      </HStack>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Input
          InputLeftElement={<Ionicons name="chatbox" size={24} color="black" />}
          variant="underlined"
          placeholder="Enter chat name"
          w="70%"
          value={input}
          pl={2}
          color="black"
          onChangeText={(text) => {
            setInput(text);
            setError(''); // Clear the error message when the user types
          }}
        />

        {error ? <Text color="red">{error}</Text> : null}
        <Button my={50} w="70%" rounded={50} alignItems="center" onPress={createChat} backgroundColor="#262626" disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" size="small" /> // Show loading indicator while loading
          ) : (
            <Text color="white">Create new Chat</Text>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
