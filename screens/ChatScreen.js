import React,{useEffect,useState} from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList } from "react-native";
import ChatRooms from '../data/ChatRooms';
import ChatListItem from '../Components/ChatListItem';
import NewMessageButton from '../Components/NewMessageButton';
import {
  auth,
} from '../config/firebase';
import { getDatabase ,ref,set,serverTimestamp,onValue,query,startAt,orderByChild,equalTo} from "firebase/database";

export const ChatScreen = () => {
  const [chatrooms, setchatrooms] = useState('');



  const getAllRooms = async () => {
    try {
      const db = getDatabase();
      // const starCountRef =ref(db, 'chatroom/');
      // starCountRef.Child("sender").equalTo(auth.currentUser.uid).once('value',(function(snapshot){
      //   console.log(   snapshot.val())
     
      // }))
      const starCountRef =query(ref(db, 'chatroom/'),orderByChild(`sender/`),equalTo(auth.currentUser.uid));
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const chatroom =Object.keys(data).map(key =>({
          id:key,
       ...data[key]
        }))
        // console.log(data)
        setchatrooms(chatroom)
        // console.log(chatrooms)
      });    
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllRooms();
  },[]);
  return (
    <View sty le={styles.container}>
      <FlatList
        style={{ width: '100%',backgroundColor:'red' }}
        data={chatrooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />

      <NewMessageButton />
      <View>
        {/* {console.log(ChatRooms)} */}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});