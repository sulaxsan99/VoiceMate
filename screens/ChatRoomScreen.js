import React,{useState,useEffect} from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet ,FlatList,ImageBackground} from "react-native";
import { useRoute } from '@react-navigation/native';
import ChatMessage from '../Components/ChatMessage';
import ChatsrOOMDATA from '../data/Chats'
import InputBox from '../Components/InputBox';
import {
  auth, 
} from '../config/firebase';

import { getDatabase, ref, set, serverTimestamp, onValue } from "firebase/database";

export const ChatRoomScreen = () => {

  const [messages, setMessages] = useState('');
  const [recivermessages, reciversetMessages] = useState('');
  const [myId, setMyId] = useState(null);
  const route = useRoute();
  const image = {uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80'};
  console.log("sendercahtroomid",route.params.id)
  console.log("recivercahtroomid",route.params.reciver)
  const mergedState = Object.assign({},messages,recivermessages)


  const getsenderchat = async() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, `chats/${route.params.id}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const chats = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
        // console.log(chats)
        console.log("sender data",data)
     
          setMessages(chats)
        
       
      });

    } catch (error) {
console.log(error)
    }
}

const getreciverchat =()=>{
  try {
    const db = getDatabase();
    const starCountRef = ref(db, `chats/${route.params.reciver}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const chats = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }))
      reciversetMessages(chats)
// setMessages(chats)
      console.log(chats)
      console.log("reciver data",data)
    });

  } catch (error) {
console.log(error)
  }
}

useEffect(()=>{
  getsenderchat();
  getreciverchat();
},[]);




const data1 =  messages.concat(recivermessages);
// var sortedData=data1.sort((function (a, b) { return new Date(a.CreatedAt) - new Date(b.CreatedAt) }));
// console.log("xxxx",route.params.name)
console.log("xxxx",data1 )
  return (




    <ImageBackground style={{width: '100%', height: '100%'}} source={image} >
      <FlatList
        data={data1}
        renderItem={({ item }) =>  <ChatMessage  message={item} chatRoomID={route.params.id} name={route.params.name}  />
      }
      />

      <InputBox chatRoomID={route.params.id} name={route.params.name}/>
    </ImageBackground>
  )
}
