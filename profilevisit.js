import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FIREBASE_DB } from './firebaseauth/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Button, Center, Heading, Image } from 'native-base';
import { ActivityIndicator } from 'react-native';

export default function Studentscreenprofile({ route, navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  useEffect(() => {
    // Retrieve the uploaderUid from the route parameters
    const uploaderUid = route.params.uploaderUid;

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
  }, [route.params]);

  return (
    <Center flex={1} bgColor="#5EBC67" pt={10} pb="10">
      <Image
        source={{
          uri:
            "https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png"
        }}
        alt="profile"
        w={24}
        h={24}
        resizeMode="cover"
      />

      {loading ? ( // Display ActivityIndicator while loading
        <ActivityIndicator color="white" size="large" />
      ) : userData ? (
        <React.Fragment>
          <Heading bold fontSize={25} isTruncated my={2} color="white">
            <Text>{userData.firstName} {userData.lastName}</Text>
          </Heading>
          <Heading fontSize={10} isTruncated my={2} color="white">
            <Text>{userData.gmail}</Text>
          </Heading>
        </React.Fragment>
      ) : (
        <Text fontSize={15} color="white">
          Loading user profile...
        </Text>
      )}

      <Button
        marginTop={5}
        w="70%"
        rounded={50}
        bgColor="#262626"
        padding={4}
        borderRadius={10}
        onPress={() => navigation.navigate('bintang', {
          uploaderUid: route.params.uploaderUid, // Pass the uploaderUid as a parameter
        })}
      >
        Leave Review Rating
      </Button>

      <Button
        marginTop={5}
        w="70%"
        rounded={50}
        bgColor="#262626"
        padding={4}
        borderRadius={10}
        onPress={() => navigation.navigate('compare', {
          uploaderUid: route.params.uploaderUid, // Pass the uploaderUid as a parameter
        })}
      >
        Review and Rating
      </Button>

      <Button
        marginTop={5}
        w="70%"
        rounded={50}
        bgColor="#262626"
        padding={4}
        borderRadius={10}
        onPress={() => navigation.goBack()}
      >
        Back to chat
      </Button>

    </Center>
  );
}
