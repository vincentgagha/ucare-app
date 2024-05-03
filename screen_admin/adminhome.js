import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Alert } from 'react-native';
import { Box, Button } from 'native-base';
import { getAuth, signOut } from 'firebase/auth';

export default function AdminRegistrationScreendminhome({ navigation }) {
  const auth = getAuth();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
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

  return (
    <View style={styles.container}>
      <View alignItems="center" justifyContent="center" marginBottom={50}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#262626' }}>ADMIN MENU</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Box backgroundColor="#533D6B" width={300} height={550} padding={15} alignItems="center" justifyContent="center" borderRadius={20}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? 'lightgrey' : '#fff',
                borderRadius: 10,
              },
            ]}
            onPress={() => navigateToScreen('ass')}
          >
            <Image
              style={styles.icon}
              source={{ uri: 'https://img.icons8.com/?size=48&id=Oyh4DCshbhyf&format=png' }}
            />
            <Text style={styles.text}>REGISTRATION</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? 'lightgrey' : '#fff',
                borderRadius: 10,
              },
            ]}
            onPress={() => navigateToScreen('gantipass')}
          >
            <Image
              style={styles.icon}
              source={{ uri: 'https://img.icons8.com/?size=50&id=13696&format=png' }}
            />
            <Text style={styles.text}>CHANGE PASSWORD</Text>
          </Pressable>

          <Button
            marginTop={10}
            w="70%"
            rounded={10}
            bgColor="#262626"
            padding={4}
            onPress={handleLogout}
          >
            <Text style={{ color: '#fff' }}>Logout</Text>
          </Button>
        </Box>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',

  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    width: 150,
    padding: 10,
    margin: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
