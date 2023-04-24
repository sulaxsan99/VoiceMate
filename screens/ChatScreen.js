import React,{useEffect,useState} from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList } from "react-native";
import ChatListItem from '../Components/ChatListItem';
import NewMessageButton from '../Components/NewMessageButton';
import {
  auth,
} from '../config/firebase';
import { getDatabase ,ref,set,serverTimestamp,onValue,query,startAt,orderByChild,equalTo, child,endAt} from "firebase/database";
import { useNavigation } from '@react-navigation/native';
// import { endAt } from 'firebase/firestore';


export const ChatScreen = () => {
  const [chatrooms, setchatrooms] = useState('');
  const [chatrooms1, setchatrooms1] = useState('');

  const navigation = useNavigation();


  const getAllRooms = async () => {
    try {
      const db = getDatabase();
      const starCountRef =query(ref(db, 'chatroom/') ,orderByChild(`sender/`) ,equalTo(auth.currentUser.uid)) ;
      // const starCountRef1 =query(ref(db, 'chatroom/'),startAt(auth.currentUser.uid),endAt(auth.currentUser.uid)) ;

      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if(data!=null){
            const chatroom =Object.keys(data).map(key =>({
                  id:key,
                  
               ...data[key]
                }))
                
                setchatrooms(chatroom)
                console.log(chatrooms)
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
  // const getAllRooms1 = async () => {
  //   try {
  //     const db = getDatabase();
  //     const starCountRef =query(ref(db, 'chatroom/') ,orderByChild(`reciver/`) ,equalTo(auth.currentUser.uid)) ;
  //     // const starCountRef1 =query(ref(db, 'chatroom/'),startAt(auth.currentUser.uid),endAt(auth.currentUser.uid)) ;

  //     onValue(starCountRef, (snapshot) => {
  //       const data = snapshot.val();
  //       if(data!=null){
  //           const chatroom =Object.keys(data).map(key =>({
  //                 id:key,
                  
  //              ...data[key]
  //               }))
                
  //               setchatrooms1(chatroom)
  //               console.log(chatroom)
  //             }else{
  //               // navigation.navigate("setting")
  //             console.log("data is empty")
  //             }
       
  //       // console.log(data)
       
  //       // console.log(chatrooms)
  //     });    
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  useEffect(() => {
    getAllRooms();
    // getAllRooms1();

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