import { Box, FormControl, Input, VStack } from "native-base";

export default function(){
    return(
        <Box h="full" bg="indigo.700" px={5}>
            <VStack space={10} mt={150} pb={10}>
                <FormControl>
                    <FormControl.Label
                        _text={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color:"white",
                        }}
                    >
                        Judul
                    </FormControl.Label>
                    <Input borderWidth={0} bgColor="indigo.300" py={3} color="white" fontSize={20}/>
                
                </FormControl>

            </VStack>
            <VStack space={90} mt={0} pb={10} pt={70}>
                <FormControl>
                    <FormControl.Label
                        _text={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color:"white",
                        }}
                    >
                        Deskripsi
                    </FormControl.Label>
                    <Input borderWidth={0} bgColor="indigo.300" py={3} color="white" fontSize={20}/>
                
                </FormControl>

            </VStack>
        </Box>
    )
}