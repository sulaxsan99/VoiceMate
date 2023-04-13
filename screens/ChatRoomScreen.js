import React,{useState,useEffect} from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet ,FlatList,ImageBackground} from "react-native";
import { useRoute } from '@react-navigation/native';
import ChatMessage from '../Components/ChatMessage';
import ChatsrOOMDATA from '../data/Chats'
import InputBox from '../Components/InputBox';
import {
  auth, 
} from '../config/firebase';
import { getStorage, uploadBytes ,listAll} from "firebase/storage";
import { getDatabase, ref, set, serverTimestamp, onValue } from "firebase/database";
import { getAllaudio} from  '../../ChatApp-main/Components/InputBox/data'
import  { AudioPlay} from '../Components/AudioComponent/index'
export const ChatRoomScreen = () => {

  const [messages, setMessages] = useState('');
  const [recivermessages, reciversetMessages] = useState('');
  const [data1, setadata1] = useState('');
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
        console.log("1",data)
         
      if(data!=null){
        const chats = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
        // console.log(chats)
        console.log("sender data",data)
        // setMessages(chats)
        setMessages(chats.sort(customSort1))
     
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
   
        //   const data= messages.concat(recivermessages );
        // setadata1(data)
        console.log("reciver data",data)
      }else{
        console.log(" reciver chats is empty")
        reciversetMessages("")
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
  getAllaudio();
  // concatMessage();

},[]);







// var sortedData=data1.sort((function (a, b) { return new Date(a.CreatedAt) - new Date(b.CreatedAt) }));
// console.log("xxxx",route.params.name)
// console.log("xxxx",data1.sort(customSort1) )

// setadata1(messages)
const customSort1 = (a,b)=>{
  return new Date(a.CreatedAt).valueOf()-new Date(b.CreatedAt).valueOf();
}
// const concatMessage= ()=>{
//   if(recivermessages!=null){
//     setadata1( recivermessages.concat(messages))
//   }else{
   
//     setadata1(messages)
  
//   }
// }

console.log("sortdata",data1)
  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={image} >
      
        <FlatList
        data={messages.concat(recivermessages  )}
        renderItem={({ item }) =>  <ChatMessage  message={item} chatRoomID={route.params.id} name={route.params.name}  />
      }
      /> 
      
         {/* <FlatList
         data={ChatsrOOMDATA.data}
         renderItem={({ item }) => <AudioPlay audio={item}  /> }  /> */}
        
     {/* <AudioPlay/> */}
      <InputBox chatRoomID={route.params.id} name={route.params.name}/>
    </ImageBackground>
  )
}
