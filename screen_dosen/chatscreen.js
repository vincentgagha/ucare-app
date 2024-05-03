import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '../firebaseauth/firebaseConfig';
 


const Chatscr = ({ user }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const chatRoomId = 'YOUR_CHAT_ROOM_ID'; // Replace with your chat room ID

  useEffect(() => {
    // Create a reference to the chat room
    const chatRoomRef = collection(FIREBASE_DB, 'chatRooms', chatRoomId, 'messages');

    // Listen for new messages in real-time
    const unsubscribe = onSnapshot(query(chatRoomRef, orderBy('timestamp')), (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push(doc.data());
      });
      setMessages(newMessages);
    });

    return () => {
      // Unsubscribe from the real-time listener when component unmounts
      unsubscribe();
    };
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    if (messageText.trim() !== '') {
      try {
        const messageData = {
          text: messageText,
          senderId: user.uid,
          timestamp: new Date(),
        };
        const chatRoomRef = collection(FIREBASE_DB, 'chatRooms', chatRoomId, 'messages');
        await addDoc(chatRoomRef, messageData);
        setMessageText('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(message, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text>{item.senderId}: {item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={messageText}
          onChangeText={(text) => setMessageText(text)}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  message: {
    padding: 8,
    backgroundColor: '#EAEAEA',
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 8,
  },
});

export default Chatscr;
