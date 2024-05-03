import { View } from "native-base";
import { Button } from "native-base";
import React from "react";
import { FIREBASE_AUTH } from "../firebaseauth/firebaseConfig";

 const List =() => {
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5D3FD3' }} >
  <Button my={30} w="40%" rounded={50} bgColor="#262626"  onPress={() => FIREBASE_AUTH.signOut()}>Logout</Button>
  </View>
)
};
export default List;

{/*import { Button, View } from "native-base";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { NativeRouterProps } from 'react-router-native';
import { FIREBASE_AUTH } from "../firebaseauth/firebaseConfig";

interface NativeRouterProps {
  navigation: NavigationProp<any, any>;
}

const List ({navigation} :NativeRouterProps ) => {
  return(
    <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Button onPress={() => FIREBASE_AUTH.signOut()} title= "logout"/>
    </View>
  );
}
export default List;*/}