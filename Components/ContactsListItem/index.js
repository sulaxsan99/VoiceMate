import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from './Style';

import { auth, db } from '../../config/firebase';
import { getDatabase ,ref,set,serverTimestamp} from "firebase/database";

const ContactListItem = (props) => {
  const { user } = props;
  const cuurrentuser = auth.currentUser;
  const navigation = useNavigation();

  // const onClick = async () => {
  //   try {

  //     //  1. Create a new Chat Room
  //     const newChatRoomData = await API.graphql(
  //       graphqlOperation(
  //         createChatRoom, {
  //           input: {
  //             lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16"
  //           }
  //         }
  //       )
  //     )

  //     if (!newChatRoomData.data) {
  //       console.log(" Failed to create a chat room");
  //       return;
  //     }

  //     const newChatRoom = newChatRoomData.data.createChatRoom;

  //     // 2. Add `user` to the Chat Room
  //     await API.graphql(
  //       graphqlOperation(
  //         createChatRoomUser, {
  //           input: {
  //             userID: user.id,
  //             chatRoomID: newChatRoom.id,
  //           }
  //         }
  //       )
  //     )

  //     //  3. Add authenticated user to the Chat Room
  //     const userInfo = await Auth.currentAuthenticatedUser();
  //     await API.graphql(
  //       graphqlOperation(
  //         createChatRoomUser, {
  //           input: {
  //             userID: userInfo.attributes.sub,
  //             chatRoomID: newChatRoom.id,
  //           }
  //         }
  //       )
  //     )

  //     navigation.navigate('ChatRoom', {
  //       id: newChatRoom.id,
  //       name: "Hardcoded name",
  //     })

  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  const onClick = async () => {
    console.log(cuurrentuser.uid, user.id)
    const chatroomid = cuurrentuser.uid + user.id;
    const chatroomid1= user.id+ cuurrentuser.uid;
    try {
      set(ref(db, 'chatroom/' + chatroomid), {
        sender: cuurrentuser.uid,
        reciver: user.id
      }).then(() => {
        alert("chat room added successfully")
      })
      // onClick2();
    } catch (error) {
      console.log(error);
    }
  }
  // const onClick2 = async () => {
  //   console.log(cuurrentuser.uid, user.id)
    
  //   const chatroomid1= user.id+ cuurrentuser.uid;
  //   try {
  //     set(ref(db, 'chatroom/' + chatroomid1), {
  //       sender: user.id,
  //       reciver: cuurrentuser.uid 
  //     }).then(() => {
  //       alert("chat room added successfully")
  //     })

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <TouchableWithoutFeedback onPress={onClick} >
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.status}>{user.status}</Text>
          </View>

        </View>

      </View>
    </TouchableWithoutFeedback>
  )
};

export default ContactListItem;
