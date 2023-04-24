import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList } from "react-native";

import ContactListItem from '../Components/ContactsListItem';
import NewMessageButton from '../Components/NewMessageButton';
import {
  auth,
} from '../config/firebase';
import { getDatabase, ref, set, serverTimestamp, onValue } from "firebase/database";

export const ContactsScreen = () => {
  const [userdata, setUserdata] = useState('');

  const getAlluser = async () => {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/',);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newuser = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }))
      // console.log(newuser)
      setUserdata(newuser)
    });
  }
  useEffect(() => {
    getAlluser();
    // console.log(userdata);
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={userdata}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* <NewMessageButton/> */}
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