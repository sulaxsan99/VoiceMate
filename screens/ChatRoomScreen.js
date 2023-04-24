import React,{useState,useEffect} from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet ,FlatList,ImageBackground,ListEmptyComponent} from "react-native";
import { useRoute } from '@react-navigation/native';
import ChatMessage from '../Components/ChatMessage';

import InputBox from '../Components/InputBox';
import {
  auth, 
} from '../config/firebase';
import { getStorage, uploadBytes ,listAll} from "firebase/storage";
import { getDatabase, ref, set, serverTimestamp, onValue } from "firebase/database";
// import { getAllaudio} from  '../../ChatApp-main/Components/InputBox/data'
import  { AudioPlay} from '../Components/AudioComponent/index'
export const ChatRoomScreen = () => {

  const [messages, setMessages] = useState('');
  const [recivermessages, reciversetMessages] = useState(''); 
  const [data1, setadata1] = useState('');
  const [myId, setMyId] = useState(null);
  const route = useRoute();
  const image = {uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80'};
  // console.log("sendercahtroomid",route.params.id)
  // console.log("recivercahtroomid",route.params.reciver)
  const [isEmpty, setIsEmpty] = useState(false); // whether the list is empty or not



  const getsenderchat = async() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, `chats/${route.params.id}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // console.log("1",data)
         
      if(data!=null){
        const chats = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
        
        setMessages(chats.sort(customSort1))
      
        
        console.log("xxx",typeof(chats))
    //  allmessaes.push(chats);
    //  console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",allmessaes)
      }else{
        console.log("sender chats is empty")
      }
    
      });
      // setadata1(messages)  
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
      if(data!=null){
        const chats = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))

       reciversetMessages(chats.sort(customSort1))
// console.log("reciver ",recivermessages)
     

      }else{
        setIsEmpty(false  )
        console.log(" reciver chats is empty")
        // reciversetMessages("")
      }
      
    });

    // const data1 =  recivermessages.concat(messages);

  } catch (error) {
console.log(error)
  }
}



useEffect(()=>{
  getsenderchat();
  getreciverchat();
  // getAllaudio();
  // concatMessage();
  // console.log("sortdata",allmessaes.sort(customSort1))
},[]);







// var sortedData=data1.sort((function (a, b) { return new Date(a.CreatedAt) - new Date(b.CreatedAt) }));
// console.log("xxxx",route.params.name)
// console.log("xxxx",data1.sort(customSort1) )

// setadata1(messages)
const customSort1 = (a,b)=>{
  return new Date(a.CreatedAt).valueOf()-new Date(b.CreatedAt).valueOf();
}
const sortedMessages = [...messages, ...recivermessages].sort((a, b) => {
  return new Date(a.createdAt) - new Date(b.createdAt);
});

  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={image} >
      
        <FlatList
        data={sortedMessages.sort(customSort1)}
        renderItem={({ item }) =>  <ChatMessage  message={item} chatRoomID={route.params.id} name={route.params.name}  />
      }
    //   ListEmptyComponent={
    //     <View style={{ alignItems: 'center' }}>
    //   {recivermessages=="" ? (
    //     <Text>No data found</Text>
    //   ) : ""}
    // </View>
    //   }
      /> 
      
         {/* <FlatList
         data={ChatsrOOMDATA.data}
         renderItem={({ item }) => <AudioPlay audio={item}  /> }  /> */}
        
     {/* <AudioPlay/> */}
      <InputBox chatRoomID={route.params.id} name={route.params.name}/>
    </ImageBackground>
  )
}
