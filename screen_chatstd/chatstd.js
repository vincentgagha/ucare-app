import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Center, HStack,} from 'native-base';
import { FIREBASE_DB } from '../firebaseauth/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { SafeAreaView } from 'react-native';
import { Text } from 'native-base';
import Customstd from './Customstd';

export default function Chatstudent({ navigation }) {
  const [chats, setChats] = useState([]);

  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, 'chats'), (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });


    return unsubscribe;
  }, []);

  const enterChat = (id, chatName, firstName, lastName, uploaderUid) => {
    navigation.navigate('merah', {
      id,
      chatName,
      firstName,
      lastName,
      uploaderUid,
    });
  };


  return (
    <SafeAreaView style= {styles.container}>
        <HStack space={3} w="full" bgColor="#5EBC67" py="11" alignItems="center" marginBottom={3} safeAreaTop >
          <Center w="full" py="2">

          <Text color="white" fontSize={25} bold>Chat</Text>

          </Center>
        </HStack>

      <ScrollView>
        {chats.map(({ id, data: { chatName, uploaderUid} }) => (
          <Customstd
            key={id}
            id={id}
            chatName={chatName}
            uploaderUid={uploaderUid}
            enterChat={enterChat}
          >
          
          </Customstd>
        ))}
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'

  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#5EBC67',
    borderRadius: 30,
    elevation: 8,
  },

});
