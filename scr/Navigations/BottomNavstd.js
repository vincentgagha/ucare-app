import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Center, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Userscreenstd from "../../screen_std/profilescreenstd";
import StackNavstd from "./Stacknavstd";
import Favoritescreenstd from "../../screen_std/favoritescreenstd";
import Chattingan from "../../screen_std/chattinganstd";
import Chatstudent from "../../screen_chatstd/chatstd";

const Tab = createBottomTabNavigator();

const Bottnavstd = () => {
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
        component={StackNavstd}
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
        name="studentpunya"
        component={Chatstudent}
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
        name="like"
        component={Favoritescreenstd}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <MaterialIcons name="favorite" size={24} color="black" />
              ) : (
                <MaterialIcons name="favorite-border" size={24} color="black" />
              )}
              <Text style={style.tabText}>Favorites</Text>
            </Center>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Userscreenstd}
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

export default Bottnavstd;
