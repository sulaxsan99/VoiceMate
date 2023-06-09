import React from 'react';
import { Text, View } from 'react-native';
import { getDatabase, ref, set, serverTimestamp, onValue } from "firebase/database";

import styles from './style';
import moment from 'moment';
import { auth } from '../../config/firebase';

import Audio from '../AudioComponent/index'
import { useState } from 'react';
import { useEffect } from 'react';
const ChatMessage = (props) => {


  const user = auth.currentUser;
  const { message, name, chatRoomID } = props;
  const [sender, setsender] = useState(user.uid)

  // console.log("yyy1",user.uid)
  //   console.log("yyy",sender)

  const date = new Date(message.CreatedAt);
  const getsender = () => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, `chatroom/${chatRoomID}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // const chats = Object.keys(data).map(key => ({
        //   id: key,
        // }))
        // console.log(data.sender)
        setsender(data.sender)
      });

    } catch (error) {
      console.log(error)
    }
  }
  const isMyMessage = () => {
    if (user.uid === message.sender) {
      return true
    }
    return false;
  }

  useEffect(() => {
    getsender();
  }, [])
  return (
    <View style={styles.container}>
      <View style={[
        styles.messageBox, {
          backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
          marginLeft: isMyMessage() ? 50 : 0,
          marginRight: isMyMessage() ? 0 : 50,
        }
      ]}>
        <Text style={styles.name} >{message.name}</Text>

        <Text style={styles.message}>{message.message}</Text>
        <Text style={styles.time} >{moment(date.toString()).fromNow()}</Text>
      </View>

      <Audio />
    </View>
  )
}

export default ChatMessage;
