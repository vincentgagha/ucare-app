import React, { useState, useCallback } from 'react';
import { View, TextInput, Alert, ActivityIndicator } from 'react-native';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { Button, Center, Text, HStack, Box, Heading, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function ChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleChangePassword = useCallback(async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, oldPassword);

      // Reauthenticate the user
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);

      setLoading(false);

      Alert.alert('Success', 'Password updated successfully', [
        { text: 'OK', onPress: () => navigation.navigate('reminder') },
      ]);
    } catch (error) {
      setLoading(false);
      console.error('Change Password Error:', error);
      Alert.alert('Error', 'Failed to change password. Please check your old password.');
    }
  }, [auth, oldPassword, newPassword, confirmNewPassword, navigation]);

  return (
    <Box w='full' h='full' position='absolute' top="0" px="6" justifyContent="center" bgColor="#fff" >
      <Pressable
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
         <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
        <Text style={styles.goBackText}>Go Back</Text>
      </Pressable>

        <Center w="full" py="2" marginBottom={5}>
          <Heading color="black" fontSize={25} bold>CHANGE PASSWORD</Heading>
        </Center>
      
      <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: '#5EBC67', borderRadius: 30, padding: 20   }}>
        <TextInput
          placeholder="Old Password"
          placeholderTextColor="white"
          secureTextEntry
          value={oldPassword}
          width="70%"
          onChangeText={setOldPassword}
          style={styles.input} // Add a style for the underline
        />
        <TextInput
          placeholder="New Password"
          placeholderTextColor="white"
          secureTextEntry
          value={newPassword}
          width="70%"
          onChangeText={setNewPassword}
          style={styles.input} // Add a style for the underline
        />
        <TextInput
          placeholder="Confirm New Password"
          placeholderTextColor="white"
          secureTextEntry
          value={confirmNewPassword}
          width="70%"
          onChangeText={setConfirmNewPassword}
          style={styles.input} // Add a style for the underline
        />
        </View>
        <View style = {{justifyContent: "center", alignItems: "center"}}>
        <Button
          marginTop={10}
          my={35}
          w="90%"
          rounded={20}
          bgColor="#262626"
          onPress={handleChangePassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text color="white">Change Password</Text>
          )}
        </Button>

        </View>
      
      </Box>
  );
}

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'white', // Color of the underline
    borderBottomWidth: 1, // Thickness of the underline
    marginBottom: 15, // Space between input fields
  },
  goBackButton: {
    position: 'absolute',
    top: 20, // Adjust the value to position the button vertically
    left: 10, // Adjust the value to position the button horizontally
    backgroundColor: 'transparent',
    padding: 10,
  },
  goBackText: {
    color: 'black',
    fontSize: 16,
  },
});
