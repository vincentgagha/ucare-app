import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Center, HStack, Pressable, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../firebaseauth/firebaseConfig';
import { AntDesign } from '@expo/vector-icons';

export default function Reviewstd({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= rating ? 'star' : 'staro'}
          size={15}
          color="#FFD700"
        />
      );
    }
    return (
      <View style={{ flexDirection: 'row' }}>{stars}</View>
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(FIREBASE_DB, 'users', auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();

          // Reorder comments based on timestamps in descending order
          if (userData.comments) {
            const orderedComments = {};
            const comments = userData.comments;
            const commentKeys = Object.keys(comments).sort().reverse(); // Sort by timestamp in reverse order
            commentKeys.forEach((key) => {
              orderedComments[key] = comments[key];
            });
            userData.comments = orderedComments;
          }

          setUser(userData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      fetchUserData();
    }
  }, [auth.currentUser]);

  return (
    <ScrollView style={styles.container}>
      <HStack space={45} w="full" bgColor="#5EBC67" py="11" alignItems="center" marginBottom={3} safeAreaTop>
        <Pressable
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={40} color="white" />
        </Pressable>
        <Text color="white" fontSize={25} bold>
          Rating and Review
        </Text>
      </HStack>

      <View style={styles.userInfo}>
        <Center>
        {loading ? (
          <Text>Loading user data...</Text>
        ) : user ? (
          <>
          {user.comments ? (
            Object.keys(user.comments).map((commentKey) => (
            <View key={commentKey} style={styles.comments}>
            <Text style={styles.commentText}>
            Comment: {user.comments[commentKey].comment}
            {'\n'}
            Rating: {renderStars(user.comments[commentKey].rating)}
            </Text>
            </View>
        ))
        ) : null}
          </>
        ) : (
          <Text>User data not found.</Text>
        )}
        </Center>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfo: {
    padding: 10,
  },
  comments: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 18,
    borderBottomWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    paddingBottom: 20,
    paddingTop: 20,
  },
});
