import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
//3rd party packages
import { Audio } from 'expo-av';
// import Sound from 'react-native-sound';
import LinearGradient from 'react-native-linear-gradient';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Fontisto } from "@expo/vector-icons";
import Slider from '@react-native-community/slider';
import { getStorage, uploadBytes, ref, listAll, getDownloadURL } from "firebase/storage";
import moment from 'moment';
import { auth } from '../../config/firebase';
// import Sound from 'react-native-sound';
const AudioPlay = (props) => {
  // const audio = props
  // console.log("audio",audio);
  const user = auth.currentUser;
  // const data = '../../voiceData/Dhoora-Vaaney-MassTamilan.dev.mp3'
  // const [constTime, setConstTime] = useState(data?.time)
  const [isPlaying, issetPlaying] = useState(false);
  const [sound, setSound] = useState(null)
  const [position, setPosition] = useState(null);
  const [playuri, setPlayuri] = useState('');
  const [playBAckDuration, setPlaybackDuration] = useState('')
  const [currentPosition, setCurrentPosition] = useState(0);
const [emotion,setemotion] = useState(props.emotion)

  // console.log(emotion.split("_"))
  const storage = getStorage();
  // const [song,setSong] = useState('')
  async function playSound() {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri: playuri });
      await soundObject.playAsync();
      setSound(soundObject);
      getPlayBackDuration()
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
  async function getPlayBackDuration() {
    if (sound !== null) {
      const status = await sound.getStatusAsync();
      setPlaybackDuration(status.durationMillis);
    }
    console.log("play back duratio", playBAckDuration / 1000)
  }
  async function getPosition() {
    if (sound !== null) {
      const status = await sound.setPositionAsync();
      setPosition(status.positionMillis);
    }
    console.log("position", position)
  }
  const calculateSeebBar = () => {
    if (position !== null && playBAckDuration !== null) {
      return position / playBAckDuration;
    }
    return 0;
  };
  const getAudio = () => {
    try {
      getDownloadURL(ref(storage, `Audio/${props.uri}`))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          // console.log(url)
          setPlayuri(url)
        })
        .catch((error) => {
          // Handle any errors
          console.log(error)
        });
    } catch (error) {

    }
  }

  useEffect(() => {
    // getAllAudio()
    getAudio()
  }, [])
  const isMyMessage = () => {
    if (user.uid === props.sender) {
      return true
    }
    return false;
  }

  // const date = new Date(props.CreatedAt);
  return (
    <View style={[{
      backgroundColor: isMyMessage() ? '' : '',
      marginLeft: isMyMessage() ? 50 : 0,
      marginRight: isMyMessage() ? 0 : 50,
    }]}>
      <View style={[styles.container]}>
        <View style={styles.playContainer}>

          {
            isPlaying ? <Fontisto name="pause" color="#000" size={20} style={styles.playButton} onPress={stopSound} ></Fontisto>
              : <Fontisto name="play" color="#000" size={20} style={styles.playButton} onPress={playSound} ></Fontisto>

          }
          <Slider
            style={{ width: 150, }}
            maximumValue={1}
            minimumValue={0}
            
          //  onValueChange={value=>{
          //   setCurrentPosition(
          //     position*value
          //   );



          //  }}
          //  onSlidingStart={async()=>{
          //   if(!isPlaying) return;
          //   try {
          //     await sound.pauseAsync();
          //   } catch (error) {
          //     console.log(error);
          //   }
          //  }

          //  }
          />
          {position !== null && <Text style={styles.time}>
            {/* {` ${Math.floor(position / 1000)}`} */}
         
            </Text>}
            <Text style={{fontWeight:'500',fontSize:15,color:'#20336e'}}>
            {props.duration}
            </Text>
        </View>
      </View>
      <View style={{
        backgroundColor: '#78ab68', height: 30,
        width: 300, alignItems: 'center', borderRadius: 10, marginLeft: 0
      }} >
        <Text style={{ fontWeight: '800', fontStyle: 'normal', alignItems: 'center', marginTop: 5, fontSize: 15 }}>
          {"Gender: "+emotion.split("_")[0]}           {"Emotion: "+emotion.split("_")[1] }
        </Text>
      </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9fe38a',
    height: 40,
    marginTop: 15,
    borderRadius: 10,
    width: 300
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
  playContainer: {
    display: 'flex',
    height: 20,
    width: 200,
    flexDirection: 'row',
    marginLeft: 5
  },
  audio: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100,
    height: 10,
    width: 100,
    marginTop: 5,
    marginRight: 10
  },
  playButton:
  {
    marginRight: 10
  },
  time: {
    marginRight: 10
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    marginTop: 0,
    padding: 10,
    marginRight: 10,
    marginBottom: 20,
    alignItems: 'center'
  },
});
export default AudioPlay;