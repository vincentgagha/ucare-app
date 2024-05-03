import { useState } from "react"
import { useWindowDimensions, Text, StyleSheet } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import React from "react"
import Akunsj from "../profile/Reakun"
import reviewsj from "../profile/Rereview"

const renderScene = SceneMap({
    first: Akunsj,
    second: reviewsj,
})  

export default function Geser(){
    const layout = useWindowDimensions()
    const [index,setIndex] = useState()
    const [routes] = useState([
        {
        key:"first",title:"PROFILE"
        },
        {
            key:"second",title:"REVIEW"
        },
    ]);

    const renderTasBar = (props) =>(
        <TabBar 
        {...props} 
        tabStyle={style.tabStyle} 
        indicatorStyle= {{backgroundColor:"#008000"}}
        activeColor={color="#5D3FD3"} 
        inactiveColor="white"
        renderLabel={({route, color}) => <Text style={{color, ...style.text}}>{route.title}</Text>}         
        />

        
    );

    return(
        <TabView navigationState={{index,routes}} renderScene={renderScene} onIndexChange={setIndex} 
        initialLayout={{width: layout.width}}
        renderTabBar={renderTasBar}
        />
    );
}
const style = StyleSheet.create({
    tabStyle:   {
        backgroundColor: "#262626",
    },
    text:{
        fontSize: 13,
        fontWeight:"bold",

    },
});