
import { Box, Center, HStack, Text } from "native-base";
import React from "react";


export default function Listingscreen(){
return(
    <HStack
    space={3} 
    w="full" 
    bgColor="#5D3FD3"  
    py="11"
    alignItems="center" 
    safeAreaTop>
        
        <Center w="full" py="2" >
            <Text color="white" fontSize={24} bold>Your Listing
            </Text>
        </Center>
        
     
    </HStack>
);
}



