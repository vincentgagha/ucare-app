import React, { useState, useEffect } from 'react';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { deleteDoc, doc, collection, getDocs, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../firebaseauth/firebaseConfig';

const CustomListItem = ({ id, chatName, firstName, lastName, enterChat, uploaderUid }) => {
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
  }, [uploaderUid]); // Add uploaderUid to the dependency array

  return (
    <ListItem onPress={() => enterChat(id, chatName, firstName, lastName, uploaderUid)} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: "https://www.nicepng.com/png/full/131-1318812_avatar-group-icon.png"
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '900', fontSize: 20, color: 'black' }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle style={{ fontWeight: '100', fontSize: 15, color: 'black' }}>
           {userData?.firstName} {userData?.lastName/* Use optional chaining to handle potential null */}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
