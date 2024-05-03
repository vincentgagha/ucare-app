import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Center, HStack, Pressable, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { doc, getDoc, collection, query, orderBy } from 'firebase/firestore'; // Import orderBy from Firebase
import { FIREBASE_DB } from './firebaseauth/firebaseConfig';
import { AntDesign } from '@expo/vector-icons';

export default function Reviewdosen({ route, navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    fetchUserData();
  }, [route.params]);

  return (
    <ScrollView style={styles.container}>
      <HStack
        space={45}
        w="full"
        bgColor="#5EBC67"
        py="11"
        alignItems="center"
        marginBottom={3}
        safeAreaTop
      >
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={40} color="white" />
        </Pressable>
        <Text color="white" fontSize={25} bold>
          Review and Rating
        </Text>
      </HStack>

      <View style={styles.userInfo}>
        <Center>
          {loading ? (
            <Text>Loading user data...</Text>
          ) : userData ? (
            <>
              <View style={styles.comments}>
                {userData.comments ? (
                  // Sort comments in descending order by timestamp
                  Object.keys(userData.comments)
                    .sort().reverse()
                    .map((commentKey) => (
                      <View key={commentKey} style={styles.comments}>
                        <Text style={styles.commentText}>
                          Comment: {userData.comments[commentKey].comment}
                          {'\n'}
                          Rating: {renderStars(userData.comments[commentKey].rating)}
                        </Text>
                      </View>
                    ))
                ) : null}
              </View>
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
