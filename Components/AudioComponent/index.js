import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
//3rd party packages
import { Audio } from 'expo-av';
// import Sound from 'react-native-sound';
import LinearGradient from 'react-native-linear-gradient';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Fontisto } from "@expo/vector-icons";
const AudioPlay = ( ) => {
    // const audio = props
    // console.log("audio",audio);
    const  data  = '../../voiceData/Dhoora-Vaaney-MassTamilan.dev.mp3'
    const [constTime, setConstTime] = useState(data?.time)
    const [isPlaying, issetPlaying] = useState(false);
    const [sound, setSound] = useState(null)
    const [position, setPosition] = useState(null);


    async function playSound() {
        try {
          const soundObject = new Audio.Sound();
          await soundObject.loadAsync(require('../../voiceData/Dhoora-Vaaney-MassTamilan.dev.mp3'));
          await soundObject.playAsync();
    
          setSound(soundObject);
          getPosition();

          issetPlaying(true)
        } catch (error) {
          console.log(error);
        }
      }
      async function stopSound() {
        if (sound !== null) {
          await sound.stopAsync();
          getPosition();

        }
        issetPlaying(false)
      }
      async function getPosition() {
        if (sound !== null) {
          const status = await sound.getStatusAsync();
          setPosition(status.durationMillis);
        }
      }
    return (
        <View style={styles.container}>
            <View style={styles.playContainer}>

        {
            isPlaying ?  <Fontisto name="pause" color="#000" size={20} style={styles.playButton} onPress={stopSound} ></Fontisto> 
               :<Fontisto name="play" color="#000" size={20} style={styles.playButton} onPress={playSound} ></Fontisto>
              
        }
    {/*         
            <Fontisto name="pause" color="#000" size={20} style={styles.playButton} onPress={stopSound} ></Fontisto> 
                <Fontisto name="play" color="#000" size={20} style={styles.playButton} onPress={playSound} ></Fontisto>
                */}

            <View style={styles.audio}><View style={styles.dot}></View></View>
            {position !== null && <Text style={styles.time}>{` ${Math.floor( position/1000)}`}</Text>}

            
            </View>
           
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        display:'flex',
       flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#9fe38a',
        height:40,  
        // margin:15,
        marginBottom:15,
        marginTop:15,
        marginLeft:160,
        borderRadius:10
    },
   
    textStyle: {
        fontSize: 40,
        color: 'white'
    },
    secsStyle: {
        fontSize: 18,
        color: 'white',
        opacity: 0.7
    },
    playContainer:{
        // margin:30,
        display:'flex',
        height:20,
        width:150,
        flexDirection:'row',
      marginRight:15
        // width:20
        // padding:50



    },
    audio:{
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        borderRadius:50,
        height:10,
        width:100,
        marginTop:5,
        marginRight:10
    }
    ,
    playButton:
    {
// marginLeft:20
marginRight:10  
    },
    time:{
        marginRight:10
    },
    dot:{
        width:14,
        height:20,
        borderRadius:100,
        backgroundColor:'red',
    marginTop:0,
    // marginLeft:20
    position:'relative',
    marginBottom:10


    }

});
export default AudioPlay;