import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { ChatScreen } from './ChatScreen';
import {Callscomponent} from './miniComponents/Callscomponent'
import { Fontisto } from "@expo/vector-icons";
const MainTab = createMaterialTopTabNavigator();
export const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
    initialRouteName="Chats"
    screenOptions={{
      activeTintColor: '#000000',
      style: {
        backgroundColor: '#437eab',
      },
      indicatorStyle: {
        backgroundColor:'#b7bec9',
        height:4 ,
      },
      labelStyle: {
        fontWeight: 'bold'  
      },
      showIcon: true,
    }}    >
      <MainTab.Screen
        name="Camera"
        component={Callscomponent}
        options={{
          tabBarIcon: ({ color }) => <Fontisto name="camera" color={color} size={18} />,
          tabBarLabel: () => null
        }}
      />
      <MainTab.Screen
        name="Chats"
        component={ChatScreen}
      />
      {/* <MainTab.Screen
        name="Status"
        component={Callscomponent}
      /> */}
      <MainTab.Screen
        name="Calls"
        component={Callscomponent}
      />
    </MainTab.Navigator>
  )
}
