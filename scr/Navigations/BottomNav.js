import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Center, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import Userscreen from "../../screen_dosen/profilescreen"; 
import StackNav from "./Stacknav";
import Uploadscreen from "../../screen_dosen/uploadscreen";
import Benfica from "../../screen_chat/chat";

const Tab = createBottomTabNavigator();

const Bottnav = () => {
  return (
    <Tab.Navigator
      backBehavior="Main"
      initialRouteName="Main"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...style.tab },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Main"
        component={StackNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="home" size={24} color="black" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              )}
              <Text style={style.tabText}>Home</Text>
            </Center>
          ),
        }}
      />
      <Tab.Screen
        name="bayern"
        component={Benfica}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Ionicons name="chatbox-ellipses-sharp" size={24} color="black" />
              ) : (
                <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
              )}
              <Text style={style.tabText}>Chat</Text>
            </Center>
          ),
        }}
      />
      <Tab.Screen
        name="postingan"
        component={Uploadscreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Ionicons name="create" size={24} color="black" />
              ) : (
                <Ionicons name="create-outline" size={24} color="black" />
              )}
              <Text style={style.tabText}>Add</Text>
            </Center>
          ),
        }}
      />
      <Tab.Screen
        name="profil"
        component={Userscreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome name="user" size={24} color="black" />
              ) : (
                <AntDesign name="user" size={24} color="black" />
              )}
              <Text style={style.tabText}>Profile</Text>
            </Center>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({

  tabText: {
    color: "black",
    fontSize: 12, // Adjust the font size as needed
  },
});

export default Bottnav;
