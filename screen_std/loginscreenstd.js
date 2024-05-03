import {Box, Heading, VStack, Input,Button, Pressable, Text, View } from "native-base";
import React from "react";
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import 'react-native-gesture-handler';
import { signInWithEmailAndPassword} from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseauth/firebaseConfig";
import { useState } from "react";


 const Loginscreenstd = () => {
    const  [email,setEmail] = useState();
    const  [password,setPassword] = useState();
    const auth = FIREBASE_AUTH;

   

    const signIn = async () => {
        try {
            const response  = await signInWithEmailAndPassword(auth,email,password);
            console.log(response);
        } catch (error){
            console.log (error);
            alert ("registration failed: " + error.message);

        }
    }


    return (
       
        <Box  w='full' h='full' position='absolute' top="0" px="6"
        justifyContent="center" bgColor="#5D3FD0">
            <Heading color="white">LOGIN AS STUDENT</Heading> 
            <VStack space={5} pt="6" >
                <Input
                InputLeftElement={<MaterialIcons name="email" size={24} color="white" />}
                variant="underlined"
                placeholder="user@gmail.com"
                w="70%"
                pl={2}
                color="white"
                onChangeText={(text) => setEmail(text)}
                />

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
            <Button 
           my={30} w="80%" rounded={10} bgColor="#262626"
            onPress={signIn}>
             LOGIN
            </Button>
           <View>
            <Text color= "white">Visit SIU ! if you forgot your email or passsword</Text>
           </View>
        </Box>
        
    );

}
export default Loginscreenstd;

{/* <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden={true}/>
          <Stack.Navigator  initialRouteName={["utama1", "bawah"]} screenOptions= {{headerShown: false,}}>
            {user ? <Stack.Screen name="bawah" component={Bottnav} />: <Stack.Screen name="tester1" component={testing} />}
            <Stack.Screen name="logonstd" component={Loginscreenstd} />
            <Stack.Screen name="utama1" component={Utamascreen} />
            <Stack.Screen name="tester3" component= {list}/>
            <Stack.Screen name="Home" component= {Homescreen}/>
            <Stack.Screen name="api" component= {Fire}/>
            <Stack.Screen name="apiscr" component= {Homescreen}/>
            <Stack.Screen name="rinci" component= {detailscr}/>
            <Stack.Screen name="rinci2" component= {detailstd}/>
            <Stack.Screen name="arjuna" component= {Loginscreen}/>
            <Stack.Screen name="stevi" component= {Userscreenstd}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>    */}
