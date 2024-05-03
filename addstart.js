import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { FIREBASE_DB } from './firebaseauth/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Box, Center, Button, Input, HStack, Icon, Pressable } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Addstar({ route, navigation }) {
  const [comment, setComment] = useState('');
  const [userData, setUserData] = useState(null);
  const [rating, setRating] = useState(0);
  const [isUserDataInitialized, setIsUserDataInitialized] = useState(false); // New state

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
          setIsUserDataInitialized(true);
        } else {
          console.error('User data not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [route.params]);

  const kirim = async () => {
    if (!comment || !isUserDataInitialized) {
      return;
    }

    // Show an alert to confirm before leaving a comment
    Alert.alert(
      'Confirm Comment',
      'Are you sure you want to leave this comment?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const uploaderUid = route.params.uploaderUid;
              const userDocRef = doc(FIREBASE_DB, 'users', uploaderUid);

              // Update the user's document to add the comment and rating to their data
              await updateDoc(userDocRef, {
                comments: {
                  ...(userData.comments || []), // Preserve existing comments
                  [new Date().toISOString()]: { comment, rating }, // Use timestamp as a key
                },
              });

              setComment(''); // Clear the comment input field after submitting
              setRating(0); // Reset the rating

              // Navigate to 'inputcomment'
              navigation.navigate('bawah', {
                uploaderUid: route.params.uploaderUid,
              });

            } catch (error) {
              console.error('Error leaving a comment:', error);
            }
          },
        },
      ]
    );
  };

  // Function to set the star rating
  const setStarRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <Center flex={1} bgColor="#5EBC67" pt={10} pb="10">
      <Text style={styles.title}>Leave a review</Text>
      <HStack space={2} alignItems="center">
        <Text style={styles.rate}>Please rate your experience:</Text>
        {Array.from({ length: 5 }, (_, i) => (
          <Pressable key={i} onPress={() => setStarRating(i + 1)}>
            <FontAwesomeIcon
              icon={faStar}
              color={i < rating ? 'yellow' : 'gray'}
            />
          </Pressable>
        ))}
      </HStack>
      <Box width="80">
        <Input
          value={comment}
          onChangeText={(text) => setComment(text)}
          placeholderTextColor="black"
          bgColor="white"
          marginBottom={5}
          placeholder="Enter your comment"
        />
        <Button rounded={20} bgColor='#262626' 
      onPress={kirim} 
       >Submit</Button>
      </Box>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  rate: {
    fontSize: 14,
    marginBottom: 20,
    color: 'white',
  },
});
