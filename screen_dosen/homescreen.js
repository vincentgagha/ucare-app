import { Center, HStack, ScrollView, Text} from "native-base";
import React from "react";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseauth/firebaseConfig";
import { SafeAreaView, StyleSheet } from "react-native";
import CustomListItemstd from "../screen_chat/CustomListItemstd";
import { useState } from "react";
import Homescreenpunya from "../screen_chat/CustomListItemstd";


function Homescreen ({navigation}) {
    const [TODOS, setTodos] = useState([]);

         
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(FIREBASE_DB, 'TODOS'), (snapshot) => {
          setTodos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    
    
        return unsubscribe;
      }, []);

const enterDetail = (id, title, deskripsi, address, uploaderUid, image) => {
    navigation.navigate("rinci", {
      id,
      title,
      address,
      deskripsi,
      uploaderUid,
      image,
    });
  };

return(

<SafeAreaView  style= {styles.container}>
<HStack space={3} w="full" bgColor="#5EBC67" py="11" alignItems="center" marginBottom={3} safeAreaTop >

        <Center w="full" py="2"  >
        <Text color="white" fontSize={25} bold >Home </Text>        
    </Center>
</HStack>

<ScrollView px={5} showsVerticalScrollIndicator={false}>
        {TODOS.map(({ id, data: { title, address, deskripsi, uploaderUid, image} }) => (
          <Homescreenpunya
            key={id}
            id={id}
            title={title}
            address={address}
            deskripsi={deskripsi}
            uploaderUid={uploaderUid}
            enterDetail={enterDetail}
            image={image}
          >
          
          </Homescreenpunya>
        ))}
</ScrollView>
</SafeAreaView>



);

}export default Homescreen;

const styles = StyleSheet.create({
    
    container: {
    flex: 1,
    backgroundColor: '#fff'
    
},
    text: {
        
        flex:1,
        margin:5,
        padding:10,
        borderRadius:5,
        shadowColor: '#5D3FD3',
        rounded: 50,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 7,
        marginVertical: 5,
        alignItems: 'center',

    },

    noteTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'

    },

    noteDesc: {
        fontSize: 15,
        marginTop: 5,
        color: '#000'
    }

});


