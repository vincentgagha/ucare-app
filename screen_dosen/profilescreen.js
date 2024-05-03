import { signOut, getAuth } from "firebase/auth";
import { Button, Center, Heading, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { FIREBASE_DB } from "../firebaseauth/firebaseConfig";
import { doc, getDoc } from 'firebase/firestore';
import { ActivityIndicator, Alert} from 'react-native'; // Added import for ActivityIndicator and Alert
import { Avatar } from "react-native-elements";

function Userscreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  const auth = getAuth();

  const alerting = () => {
    // Show an alert before proceeding with the deletion
    Alert.alert(
      'Confirm Logout',
      'Are you sure to log out now ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleLogout(), // Call your delete function here
        },
      ],
      { cancelable: true }
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      navigation.replace('reminder'); // Navigate to the "reminder" screen
    } catch (error) {
      console.error("Sign out failed: ", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(FIREBASE_DB, 'users', auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUser(userData);
        }
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    if (auth.currentUser) {
      fetchUserData();
    }
  }, [auth.currentUser]);

  return (
    <Center flex={1} bgColor="#5EBC67" pt={10} pb="10">
      <Avatar
        rounded
        size={150}
        source={{
          uri: "https://e7.pngegg.com/pngimages/698/39/png-clipart-computer-icons-user-profile-info-miscellaneous-face-thumbnail.png"
        }}
      />

      {loading ? ( // Display ActivityIndicator while loading
        <ActivityIndicator color="white" size="large" />
      ) : user ? (
        <React.Fragment>
          <Heading bold fontSize={25} isTruncated my={2} color="white">
            <Text>{user.firstName} {user.lastName}</Text>
          </Heading>
          <Heading fontSize={15} isTruncated my={1} color="white">
            <Text>{user.type}</Text>
          </Heading>
          <Text fontSize={10} color="white">
            <Text>UID: {auth.currentUser.uid}</Text>
          </Text>
        </React.Fragment>
      ) : (
        <Text fontSize={15} color="white">
          User not found
        </Text>
      )}

      <Button marginTop={5} 
              w="70%" 
              rounded={50} 
              bgColor="#262626" 
              padding={4} 
              borderRadius={10} 
              onPress={alerting}
      >
        Logout
      </Button>
      <Button marginTop={5} 
              w="70%" 
              rounded={50} 
              bgColor="#262626" 
              padding={4} 
              borderRadius={10} 
              onPress={() => navigation.navigate('gantipass')}
      >
        Change Password
      </Button>
    </Center>
  );
}

export default Userscreen;
