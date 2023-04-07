import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../colors';
import { MainTabNavigator } from "./MainTabNavigator";
import { ChatScreen } from "./ChatScreen";
import { ContactsScreen } from "./ContactsScreen";
import { ChatRoomScreen } from "./ChatRoomScreen";
import {SettingScreen} from "./SettingScreen";
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';

import { auth } from "../config/firebase";

const Home = () => {

  const navigation = useNavigation();
 
  return (
    <NavigationContainer style={styles.container}
      independent={true}

    >
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Home;
const Stack = createStackNavigator();



function RootNavigator(params) {
  const navigation = useNavigation(); 
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          // background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);
          backgroundColor: '#437eab',
          shadowOpacity: 0,
          elevation: 0,

        },
        //   headerTintColor: Colors.light.background,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}

        options={{
          title: 'VoiceMate',
          headerRight: () => (
            <View style={{
              flexDirection: 'row',
              width: 60,
              justifyContent: 'space-between',
              marginRight: 10,
            }}>
              <Octicons name="search" size={22} color={'white'} />
              <MaterialCommunityIcons  name="dots-vertical"  onPress={()=>{navigation.navigate("Setting")}}    size={22} color={'white'} />
            </View>
          )
        }}

      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
           
            <View style={{
              flexDirection: 'row',
              width: 100,
              justifyContent: 'space-between',
              marginRight: 10,
            }}>
              <FontAwesome5 name="video" size={22} color={'white'} />
              <MaterialIcons name="call" size={22} color={'white'} />
              <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
            </View>
          )
        })}
      />

      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
      />
    <Stack.Screen
        name="Setting"
        component={SettingScreen}
      />
    </Stack.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: "#fff",
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  }
});