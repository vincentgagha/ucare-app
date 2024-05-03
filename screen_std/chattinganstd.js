import { Box, Center, HStack, Pressable, Text, View } from "native-base";
import React from "react";
import { Ionicons } from '@expo/vector-icons'; 



function Chattingan(){
return(
<HStack 
space={3} 
w="full" 
bgColor="#5D3FD3" 
py="11" 
alignItems="center" 
safeAreaTop>

    {/*<Pressable ml={8}>
        <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
    </Pressable>*/}
    <Center w="full" py="2" >
        <Text color="white" fontSize={25} bold >Chat</Text>        
    </Center>

</HStack>




);

}
export default Chattingan;