import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';
import React from "react";
import Homescreen from "../../screen_dosen/homescreen";

const Stack = createNativeStackNavigator ();
const StackNav = () => {
    return(
        <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions= {{
        headerShown: false,
      }}
      >
        <Stack.Screen name="Home" component= {Homescreen}/>
      
      </Stack.Navigator>

      
    );
}


export default StackNav;