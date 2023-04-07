import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet,TouchableWithoutFeedback } from "react-native";
export const Callscomponent = () => {
  return (
    <TouchableWithoutFeedback >
    <View style={styles.container}>
      <View style={styles.lefContainer}>
      <Image source={{ uri:'https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg'}} style={styles.avatar}/>
        <View style={styles.midContainer}>
          <Text style={styles.username}>sulaxsan</Text>
          <Text>outgoing/incomming</Text>
        </View>
       
      </View>
      <Text style={styles.time}>
          {/* {chatRoom.lastMessage && chatRoom.lastMessage.createdAt} */}
          14:48:00
        </Text>
    </View>
  </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    padding: 10,

   
  },
  lefContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'black'
  },
  lastMessage: {
    fontSize: 16,
    color: 'black',
    fontWeight:'500'
  },
  time: {
    fontSize: 14,
    color: 'grey',
    
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,
}
});