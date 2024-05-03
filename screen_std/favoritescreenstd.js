
import { Box, Center, HStack, Text } from "native-base";
import React from "react";


export default function Favoritescreenstd(){
return(
    <HStack
    space={3} 
    w="full" 
    bgColor="#5EBC67"  
    py="11"
    alignItems="center" 
    safeAreaTop>
        
        <Center w="full" py="2" >
            <Text color="white" fontSize={25} bold>Favorite
            </Text>
        </Center>
        
     
    </HStack>
);
}



