import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_DB, FIREBASE_APP } from '../firebaseauth/firebaseConfig';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc, // Import deleteDoc for chat deletion
  doc,
  getDocs,
  getDoc, // Import doc for chat deletion
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Avatar } from 'react-native-elements';
import { HStack, Pressable, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function Manutd({ route, navigation }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false); // Add loading state
  const auth = getAuth(FIREBASE_APP);
  const { chatName } = route.params;
  const { id, uploaderUid } = route.params; // Add uploaderUid and id
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state to true


  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        setCurrentUserId(auth.currentUser.uid);
      }

      const chatRef = collection(FIREBASE_DB, 'chats', route.params.id, 'messages');

      // Use the query function with orderBy for real-time updates
      const messagesQuery = query(chatRef, orderBy('timestamp'));

      // Listen for real-time updates (onSnapshot)
      const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
        const messageData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.timestamp) {
            messageData.push({ id: doc.id, data });
          }
        });
        setMessages(messageData);
      });

      return () => {
        // Unsubscribe from real-time updates when the component unmounts
        unsubscribe();
      };
    };

    fetchData();
  }, [route.params.id]);

  const sendMessage = async () => {
    if (!input) {
      return; // Prevent sending empty messages
    }
    try {
      const user = auth.currentUser;
      const chatRef = collection(FIREBASE_DB, 'chats', route.params.id, 'messages');

      // Include the sender's name, email, and uploaderUid when adding the message
      await addDoc(chatRef, {
        timestamp: serverTimestamp(),
        message: input,
        email: user.email,
        uploaderUid: user.uid,
      });

      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const hapuschat = async () => {
    if (auth.currentUser.uid === uploaderUid) {
      setLoadingDelete(true);
      try {
        // Delete the chat group document
        await deleteDoc(doc(FIREBASE_DB, 'chats', id));
  
        // Optional: Delete associated messages (if needed)
        const messagesRef = collection(FIREBASE_DB, 'chats', id, 'messages');
        const messagesQuery = query(messagesRef);
        const messagesQuerySnapshot = await getDocs(messagesQuery);
        
        messagesQuerySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
  
        navigation.navigate('bawah');
      } catch (error) {
        console.error('Error deleting chat group:', error);
      } finally {
        setLoadingDelete(false);
      }
    } else {
      alert('You do not have permission to delete this chat group.');
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HStack w="full" bgColor="#5EBC67" py="11" alignItems="center" marginBottom={3} justifyContent="space-between" safeAreaTop>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={40} color="white" />
        </Pressable>
        <Text color="white" fontSize={25} bold>
          {chatName}
        </Text>
          <Pressable onPress={hapuschat}>
            <MaterialIcons name="delete" size={40} color="white" />
          </Pressable>
        
      </HStack>
      <>
        <ScrollView contentContainerStyle={styles.messageContainer}>
          {messages.map(({ id, data }) =>
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.reciever}>
                <Pressable
                  onPress={() => {
                    // Navigate to the profile screen and pass the uploaderUid as a parameter
                    navigation.navigate('student', {
                      uploaderUid: data.uploaderUid,
                    });
                  }}
                >
                  <Avatar
                    position="absolute"
                    rounded
                    bottom={-90}
                    right={-5}
                    size={40}
                    source={{
                      uri: 'https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png',
                    }}
                  />
                </Pressable>
                <View style={styles.messageContent}>
                  <Text style={styles.recieverText}>{data.message}</Text>
                  <Text style={styles.timestamp}>{data.email.toLocaleString()}</Text>
                  {data.timestamp && (
                    <Text style={styles.timestamp}>
                      {data.timestamp.toDate().toLocaleString()}
                    </Text>
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.sender}>
                <Pressable
                  onPress={() => {
                    // Navigate to the profile screen and pass the uploaderUid as a parameter
                    navigation.navigate('student', {
                      uploaderUid: data.uploaderUid,
                    });
                  }}
                >
                  <Avatar
                    position="absolute"
                    rounded
                    bottom={-15}
                    right={-5}
                    size={40}
                    source={{
                      uri: 'https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png',
                    }}
                  />
                </Pressable>
                <View style={styles.messageContent}>
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.timestampsender}>{data.email.toLocaleString()}</Text>
                  {data.timestamp && (
                    <Text style={styles.timestampsender}>
                      {data.timestamp.toDate().toLocaleString()}
                    </Text>
                  )}
                </View>
              </View>
            )
          )}
        </ScrollView>
      </>
      <View style={styles.footer}>
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={sendMessage}
          placeholder="Type your message"
          style={styles.textInput}
        />
        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
          <Ionicons name="send" size={24} color="#5EBC67" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  reciever: {
    padding: 9,
    alignSelf: 'flex-end',
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 9,
    alignSelf: 'flex-start',
    backgroundColor: '#5EBC67',
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 5,
    borderColor: 'transparent',
    borderWidth: 1,
    padding: 10,
    color: 'grey',
    borderRadius: 30,
    backgroundColor: '#ECECEC',
  },
  recieverText: {
    color: 'black',
    fontSize: 20,
  },
  senderText: {
    color: 'white',
    fontSize: 20,
  },
  messageContent: {
    display: 'flex',
  },
  timestamp: {
    color: 'grey',
    fontSize: 10,
    marginTop: 2,
  },
  timestampsender: {
    color: 'black',
    fontSize: 10,
    marginTop: 2,
  },
});