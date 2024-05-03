import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';
import React from "react";
import Homescreenstd from "../../screen_std/homescreenstd";


const Stack = createNativeStackNavigator ();
const StackNavstd = () => {
    return(
        <Stack.Navigator 
        initialRouteName="rumah" 
        screenOptions= {{
        headerShown: false,
      }}
      >
        <Stack.Screen name="rumah" component= {Homescreenstd}/>
      
      </Stack.Navigator>

      
    );
}


export default StackNavstd;