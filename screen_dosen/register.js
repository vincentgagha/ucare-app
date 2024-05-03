import {NativeBaseProvider, Box, Heading, VStack, Input,Button, Pressable, Text } from "native-base";
import React from "react";
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";
import { FIREBASE_AUTH } from "../firebaseauth/firebaseConfig";

function Registerscreen({navigation}) {
    const  [email,setEmail] = useState();
    const  [password,setPassword] = useState();
    const auth = FIREBASE_AUTH;


    
    const signUp = async () => {
        try {
            const response  = await createUserWithEmailAndPassword(auth,email,password);
            console.log(response);
            alert ("congratulations you already registrated!");
        } catch (error){
            console.log (error);
            alert ("sign in failed: " + error.message);

        }
    }
    return (

            <Box  w='full' h='full' position='absolute' top="0" px="6"
            justifyContent="center" bgColor="#5D3FD3">
                <Heading color="white">SIGN UP</Heading> 
                <VStack space={5} pt="6">
                     {/*username*/}                    
                     <Input
                    InputLeftElement={<MaterialIcons name="email" size={24} color="white" />}
                    variant="underlined"
                    placeholder="username"
                    w="70%"
                    pl={2}
                    color="white"
                    />
                    {/*EMAIL*/}                    
                    <Input
                    InputLeftElement={<MaterialIcons name="email" size={24} color="white" />}
                    variant="underlined"
                    placeholder="user@gmail.com"
                    w="70%"
                    pl={2}
                    color="white"
                    onChangeText={(text) => setEmail(text)}
                    />
                    {/*Password*/}  
                    <Input
                    InputLeftElement={<AntDesign name="eye" size={24} color="white" /> }
                    variant="underlined"
                    placeholder="*********"
                    type="password"
                    w="70%"
                    pl={2}
                    color="white"
                    onChangeText={(text) => setPassword(text)}
                    />
                </VStack>
                <Button my={30} w="40%" rounded={50} color="white" bgColor="#262626" onPress={signUp}>  SIGN UP  </Button>
                <Button my={30} w="40%" rounded={50} color="white" bgColor="#262626" onPress={() => navigation.navigate("tester1")}> 
                LOGIN
                </Button>
            </Box>

    );

}
export default Registerscreen;