import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,

} from "react-native";

import styles from "./style";
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import {
  auth
} from '../../config/firebase.js';
import { getDatabase, ref, set, serverTimestamp, onValue } from "firebase/database";

const ChatListItem = ({ chatRoom }) => {
  // const {chatRoom} =props
  const user = auth.currentUser;

  const [reciver, setReciver] = useState(chatRoom.reciver);
  const [datareciver, setdatareciver] = useState('');
  const [sender, setsender] = useState('');
  const reciverid = reciver + user.uid;
  const navigation = useNavigation();
const imguri = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80';

  useEffect(() => {

    getuser();

  }, [])

  const getuser = async () => {
    try {
      console.log("reciver", reciver)
      const db = getDatabase();

      const starCountRef = ref(db, `users/${reciver}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // const newuser =Object.keys(data).map(key =>({
        //   id:key,
        //   ...data[key]
        // }))
        console.log("recivername", data.name)
        setdatareciver(data)
      });

    } catch (error) {
      console.log(error)
    }
  }
  const onClick = () => {
    navigation.navigate('ChatRoom', {
      id: chatRoom.id,
      name: datareciver.name,
      reciver: reciverid
    })
  }



  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>

          <Image source={{ uri: imguri }} style={styles.avatar}/>

          <View style={styles.midContainer}>
            {

            }
            <Text style={styles.username}>{datareciver.name}</Text>
            {/* <Text
              numberOfLines={2}
              style={styles.lastMessage}>
              {chatRoom.lastMessage
                ? `${otherUser.name}: ${chatRoom.lastMessage.content}`
                : ""}
            </Text> */}
          </View>
        </View>

        <Text style={styles.time}>
          {/* {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).fromNow() } */}
        </Text>

      </View>

    </TouchableWithoutFeedback>
  )
};

export default ChatListItem;
