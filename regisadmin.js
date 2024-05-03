import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "./firebaseauth/firebaseConfig";
import { Box, Button, Heading, Input, ScrollView, Select, Text, VStack, View } from "native-base";
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { ActivityIndicator } from 'react-native';

const AdminRegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const userTypes = ["Student", "Admin", "Dosen", "Staff"];


  const pindah = () => {
    navigation.navigate("reminder");
  };

  const handleRegistration = async () => {
    if (!email || !password || !userType || !firstName || !lastName) {
      alert("Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    try {
      const authUserCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = authUserCredential.user;

      const userDocRef = doc(FIREBASE_DB, "users", user.uid);
      const userData = {
        type: userType,
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        gmail: email,
      };

      await setDoc(userDocRef, userData);

      alert("Admin registration successful!");
      navigation.navigate('reminder');
    } catch (error) {
      console.error(error);
      alert("Admin registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box w="full" h="full" position="absolute" top="0" px="6" justifyContent="center" bgColor="#fff">
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Heading color="black" marginTop={5}>ADMIN</Heading>
      </View>
      <ScrollView>
        <View style={{ backgroundColor: '#5EBC67', borderRadius: 30, padding: 20, marginTop: 10 }}>
          <VStack space={5} pt="6" pb="6">
            <Input
              InputLeftElement={<MaterialIcons name="email" size={24} color="white" />}
              variant="underlined"
              placeholder="Email"
              placeholderTextColor="white"
              w="70%"
              pl={2}
              color="white"
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              InputLeftElement={<AntDesign name="eye" size={24} color="white" />}
              variant="underlined"
              placeholder="Password"
              placeholderTextColor="white"
              type="password"
              w="70%"
              pl={2}
              color="white"
              onChangeText={(text) => setPassword(text)}
            />
            <Input
              InputLeftElement={<AntDesign name="user" size={24} color="white" />}
              variant="underlined"
              placeholder="First Name"
              placeholderTextColor="white"
              w="70%"
              pl={2}
              color="white"
              onChangeText={(text) => setFirstName(text)}
            />
            <Input
              InputLeftElement={<AntDesign name="user" size={24} color="white" />}
              variant="underlined"
              placeholder="Last Name"
              placeholderTextColor="white"
              w="70%"
              pl={2}
              color="white"
              onChangeText={(text) => setLastName(text)}
            />
            <Select
              variant="underlined"
              placeholder="User Type"
              placeholderTextColor="white"
              selectedValue={userType}
              w="70%"
              pl={2}
              color="white"
              onValueChange={(value) => setUserType(value)}
            >
              {userTypes.map((type) => (
                <Select.Item key={type} label={type} value={type} />
              ))}
            </Select>
          </VStack>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            marginTop={10}
            w="90%"
            rounded={20}
            bgColor="#262626"
            onPress={handleRegistration}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text color="white">REGISTER</Text>
            )}
          </Button>
          <Button
            marginTop={10}
            w="90%"
            rounded={20}
            bgColor="#262626"
            onPress={() => navigation.goBack()}
          >
            ADMIN MENU
          </Button>
        </View>
      </ScrollView>
    </Box>
  );
};

export default AdminRegistrationScreen;
