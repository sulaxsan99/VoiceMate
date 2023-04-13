import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    padding: 10,

   
  },
  lefContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
    borderColor:'black',
    borderWidth:2,
    backgroundColor:'red'
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'black'
  },
  lastMessage: {
    fontSize: 15,
    color: 'black',
    fontWeight:'500'
  },
  time: {
    fontSize: 12,
    color: 'grey',
    
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,
}
});

export default styles;
