import React, { useEffect, useState } from 'react';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import { FIREBASE_DB } from '../firebaseauth/firebaseConfig';
import { Button, Image, Text } from 'native-base';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';

const Customisasi = ({ id,title, deskripsi, address, enterDetail, firstName, lastName, uploaderUid, image}) => {
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

  return (
    <ListItem onPress={() => enterDetail(id, title, deskripsi, firstName, lastName, address, uploaderUid, image)} bottomDivider>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/6194/6194029.png"
        }}
        alt="profile"
        w={24}
        h={24}
        resizeMode="cover"
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '900', fontSize: 25, color: 'black' }}>{title}</ListItem.Title>
        <ListItem.Title style={{ fontWeight: '400', fontSize: 20, color: 'black' }}>{address}</ListItem.Title>
        <ListItem.Subtitle style={{ fontWeight: '400', fontSize: 20, color: 'black' }}>{userData?.firstName} {userData?.lastName}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default Customisasi;
