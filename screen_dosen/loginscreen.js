import {Box, Heading, VStack, Input,Button, Pressable, Text } from "native-base";
import React from "react";
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import 'react-native-gesture-handler';

 function Loginscreen({navigation}) {
    return (
       
            <Box  w='full' h='full' position='absolute' top="0" px="6"
            justifyContent="center" bgColor="#5D3FD3">
                <Heading color="white">LOGIN</Heading> 
                <VStack space={5} pt="6">
                    <Input
                    InputLeftElement={<MaterialIcons name="email" size={24} color="white" />}
                    variant="underlined"
                    placeholder="user@gmail.com"
                    w="70%"
                    pl={2}
                    color="white"
                    />

                    <Input
                    InputLeftElement={<AntDesign name="eye" size={24} color="white" /> }
                    variant="underlined"
                    placeholder="*********"
                    type="password"
                    w="70%"
                    pl={2}
                    color="white"
                    />
                </VStack>
                <Button 
                my={30} 
                w="40%" 
                rounded={50} 
                bgColor="#262626" 
                onPress={() => navigation.navigate("bawah")}>
                 LOGIN
                </Button>
                <Pressable mt={4} onPress={() => navigation.navigate("Register")}> 
                <Text color="white">SIGN UP</Text> 
                </Pressable>
            </Box>
        
    );

};
export default Loginscreen;
