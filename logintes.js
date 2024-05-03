import { useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "./firebaseauth/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Heading, Input, Spinner, VStack, Text, View, Image } from "native-base";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { doc, getDoc } from "firebase/firestore";
import {ActivityIndicator} from  'react-native';

const LoginScreentes = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // State for loading

    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true); // Start loading

        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const user = response.user;

            const userDocRef = doc(FIREBASE_DB, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data();

            if (userData) {
                const userType = userData.type;

                if (userType === "Dosen") {
                    navigation.navigate("bawah");
                } else if (userType === "Staff") {
                    navigation.navigate("bawah");
                } else if (userType === "Student") {
                    navigation.navigate("bawahstd");
                } else if (userType === "Admin") {
                    navigation.navigate("adminpunya");
                }
            } else {
                console.error("User data not found.");
            }
                setEmail("");
                setPassword("");
        } catch (error) {
            alert("Login failed: " + error.message);
        } finally {
            setLoading(false); // Stop loading, whether login succeeded or failed
        }
    }

    return (
            <Box w='full' h='full' position='absolute' top="0" px="6" justifyContent="center" bgColor="#fff" >
            <View style = {{ justifyContent: "center", alignItems: "center"}}>
           

            <Heading color="black" marginTop={5}>LOGIN</Heading>

            </View>

            <View style={{ backgroundColor: '#533D6B', borderRadius: 30, padding: 20, marginTop: 10  }}>
            <VStack space={5} pt="6" pb="6">
                <Input
                    InputLeftElement={<MaterialIcons name="email" size={24} color="white" />}
                    variant="underlined"
                    placeholder="user@gmail.com"
                    placeholderTextColor="white"
                    w="70%"
                    pl={2}
                    color="white"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    InputLeftElement={<AntDesign name="eye" size={24} color="white" />}
                    variant="underlined"
                    placeholder="*********"
                    placeholderTextColor="white"
                    type="password"
                    w="70%"
                    pl={2}
                    color="white"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </VStack>
            </View>

            <View style = {{justifyContent: "center", alignItems: "center"}}>
            <Button
                my={35}
                w="90%"
                rounded={20}
                bgColor="#262626"
                onPress={signIn}
                disabled={loading} // Disable the button while loading
            >
                {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text color="white">LOGIN</Text>
          )}
            </Button>

            </View>
        
        </Box>
    );
}

export default LoginScreentes;