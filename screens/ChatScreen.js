import React,{useEffect,useState} from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList } from "react-native";
import ChatRooms from '../data/ChatRooms';
import ChatListItem from '../Components/ChatListItem';
import NewMessageButton from '../Components/NewMessageButton';
import {
  auth,
} from '../config/firebase';
import { getDatabase ,ref,set,serverTimestamp,onValue,query,startAt,orderByChild,equalTo} from "firebase/database";
import { useNavigation } from '@react-navigation/native';


export const ChatScreen = () => {
  const [chatrooms, setchatrooms] = useState('');
  const navigation = useNavigation();


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
        // console.log(data)
        if(data!=null){
       
            const chatroom =Object.keys(data).map(key =>({
                  id:key,
               ...data[key]
                }))
                setchatrooms(chatroom)
              }else{
                // navigation.navigate("setting")
              console.log("data is empty")
              }
       
        // console.log(data)
       
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
        style={{ width: '100%' }}
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