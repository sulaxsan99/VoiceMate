import React from 'react';
import {TouchableOpacity, View} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";
import { useNavigation } from '@react-navigation/native';

const NewMessageButton = () => {

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Contacts');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="message-reply-text"
          size={40}
          color="white"
          style={
            {
                borderRadius:20
            }
          }
        />
      </TouchableOpacity>
    </View>
  )
}

export default NewMessageButton;
