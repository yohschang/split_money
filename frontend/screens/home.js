import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert , FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
// import {writeJsonFile} from 'write-json-file';
import { Card,FAB , Modal,TextInput,Button} from 'react-native-paper';
import globalvalue from '../global';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import updateJoinGroup from './updateJoinGroup';




// TODO : add message!!!

export default function Home(props){

    const [UserData, setUserData] = useState([]) 
    const [loading, setloading] = useState(true)

    const [JoinID, setJoinid] = useState("")
    // const [saveID, setsaveid] = useState("")
    const [visibleid, setidVisible] = useState(false);  // for enter join group  box
    const [visiblename, setnameVisible] = useState(false); // for enter create group name ox

    const showModal = (func) => {func(true); }
    const hideModal = (func) => {func(false);}

    const [isChange, Setischange] = useState(false)
     

      
    const checkUserExist = (UserData) => {   
      if (UserData == null){
      console.log("not exist")
      // create user return user data and use the id to create home
      props.navigation.navigate("CreateUser")
      }
      else{
          const uid = UserData.Uid 
          console.log(uid)
          getUserFromDatabase(uid)
      }
    }


    const getUserFromDatabase = (user_id) => {
      fetch(globalvalue.url.toString() + `user-list/${user_id}/`,{
      // fetch('https://splitm.herokuapp.com/split/' + `user-list/${user_id}/`,{
      // fetch('https://splitm.herokuapp.com/split/user-list/1181011241/',{
        method : "GET"
        })
        .then(resp => resp.json())
        .then(data => {setUserData(data)
                       setloading(false)
                        return data})
        // .then(data => {console.log(data)})  // equal function(resp) : {return resp.json()}
        // .catch(error => Alert.alert('error', error.message)) //Alert.alert('error', error.message)
        .catch(error => console.log('error', error.message)) //Alert.alert('error', error.message)
    }    // if get 'Value for title can not be cast from ReadablenativeMap to string' => change 'error' to 'error.message'

    const getData = async(storeKey) => {
      try{
        const jsonValue = await AsyncStorage.getItem(storeKey)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e){
        console.log(e)
      }
    }

    useEffect(() => {  
      const unsubscribe = props.navigation.addListener('focus', () => {
        getData('@user_data')
        .then(resp => {                          // then will wait previous function execute finish
          console.log("get user data : ")         // in order to kepp the .then chain, previous then must return something
          return checkUserExist(resp)})
        // .catch(error => Alert.alert('error', error.message))
        .catch(error => console.log('error', error.message))
      });
  
      return unsubscribe;
      },[props.route.params?.Uid, isChange])

    const clickItem = (Groupdata) => {
      console.log("navigate to group")
      props.navigation.navigate("GroupDetial", {Groupdata : Groupdata}) 
    }

    const renderData = (item) => {
      return(    
        <Card style = {styles.cardstyle} onPress = {() => clickItem(item)} onLongPress = {() => deleteGroup(item)}>
            <Text style = {styles.textStyle1}>{item.Gname}</Text>
        </Card>
        )
    }
    
    const deleteGroup = (item) => {
      Alert.alert(
        'Leave this Group ?',
        'Are u sure you want to leave ?',
        [
        { text: "Leave", 
          style: 'destructive',
          onPress: () => {    
            updateJoinGroup('delete', item.Gid, UserData)   
            // fetch(globalvalue.url.toString() + `group-delete/${item.Gid.toString()}/`, {
            //   method : "DELETE",
            //   headers : {
            //       'Content-Type' : 'application/json'
            //       }
            //     });
              Setischange(!isChange)
            } 
        },
        {
            text: 'cancel',
            style: 'destructive',
            onPress: () => {},  
        },
        ],
        {cancelable: false,}
      );
    }

    const AddGroup = () => {
      Alert.alert(
        'Add More Group?',
        'Choose create or join',
        [
        { text: "Create", 
          style: 'destructive',
          onPress: () => {showModal(setnameVisible)} 
        },
        {
            text: 'Join',
            style: 'destructive',
            onPress: () => {showModal(setidVisible)},  
        },
        ],
        {cancelable: true,}
    );
    }

  
    return (
      <View style = {{flex :1,}}>
        <FlatList style = {{flex : 0.82}}
        data = {UserData.joinedGroup} 
        renderItem = {({item}) => {return renderData(item)}}
        onRefresh = {()=> getUserFromDatabase(UserData.Uid)}  // pull reload
        refreshing = {loading} // check for pull reload
        keyExtractor = {item => item.Gid}
        />

        <Text style = {{...styles.updatetext, flex : 0.18}}>
        <Text >
          1. Long press to delete{'\n'}
          {'\n'}
          2. Pull down to update{'\n'}</Text>
        <Ionicons name = "arrow-down" size={28}/>
        </Text>  

      <Modal visible={visibleid} onDismiss={() => hideModal(setidVisible)} dismissable={true} contentContainerStyle={styles.messageBox}>
        <Text style= {{fontSize : 18, fontWeight: "bold",}}>Enter Group ID</Text>
        <TextInput style = {{marginHorizontal : 10, marginTop:10}}
            value = {JoinID}
            keyboardType='numeric'
            onChangeText = {text => setJoinid(text)}/>
        <View style = {{flexDirection: 'row', justifyContent: "flex-end"}}>
            <Button labelStyle = {{fontSize : 18,}} 
                onPress={()=>{hideModal(setidVisible); 
                          updateJoinGroup('join', JoinID, UserData); 
                          setJoinid(""); 
                          Setischange(!isChange)} }>Join</Button>
            <Button labelStyle = {{fontSize : 18,}} onPress={()=>hideModal(setidVisible)}>Cancel</Button>
        </View>
      </Modal>

      <Modal visible={visiblename} onDismiss={() => hideModal(setnameVisible)} dismissable={true} contentContainerStyle={styles.messageBox}>
        <Text style= {{fontSize : 18, fontWeight: "bold",}}>Enter Group Name</Text>
        <TextInput style = {{marginHorizontal : 10, marginTop:10}}
            value = {JoinID}
            onChangeText = {text => setJoinid(text)}/>
        <View style = {{flexDirection: 'row', justifyContent: "flex-end"}}>
            <Button labelStyle = {{fontSize : 18,}} 
                onPress={()=>{hideModal(setnameVisible);
                              updateJoinGroup('create', JoinID, UserData);
                              setJoinid("");
                              Setischange(!isChange) } }>Create</Button>
            <Button labelStyle = {{fontSize : 18,}} onPress={()=>hideModal(setnameVisible)}>Cancel</Button>
        </View>
      </Modal>

      <FAB             // foating + button
        style = {styles.fab}
        small = {false}
        icon = 'plus'
        theme = {{colors : {accent : "blue"}}}  // same as setting bgcolor in style
        // onPress = {()=> props.navigation.navigate('Create')}
        onPress = {()=> AddGroup()}
      />

      <FAB   // show message
        style = {{...styles.fab, bottom: 100,}}
        small = {false}
        icon = 'message'
        theme = {{colors : {accent : "blue"}}}  // same as setting bgcolor in style
        onPress = {()=> {props.navigation.navigate("messageDISP", {message : UserData.Umessage})}}
      />



  </View>

    );
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle1 : {
    fontSize : 28,
    textTransform: 'uppercase',
    fontWeight: "bold",
    color : 'black',
  },
  fab : {
    position: 'absolute',
    margin :16,
    right : 0,
    bottom: 20,
    // backgroundColor : 'blue',
  },
  cardstyle : {
    padding : 10,
    margin : 10,
},

  updatetext :{
    fontSize:18,
    fontWeight : 'bold',
    padding : 0,
    marginBottom: 20,
    textAlign: "center"
  },

  messageBox : {
    paddingTop:10,
    paddingBottom:10,
    paddingHorizontal:10,
    marginBottom : 200,
    marginHorizontal :10,
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignContent : 'center',
    
},

});
