import React ,{ useState, useEffect}from 'react'
import { View, Text  ,FlatList,  StyleSheet, ScrollView , Alert} from 'react-native'
import globalvalue from '../global';
import { Provider, Card,FAB, Portal,TextInput,Button,Modal} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import updateJoinGroup from './updateJoinGroup';


export default function Users(props) {

    const Groupname = props.data.Gname
    const joinUser = props.data.joinedUser

    const [sendtarget, setSendtarget] = useState("")
    const [sendMsg, setSendmsg] = useState("");
    const [current_User, setcurrent_User] = useState("");

    const [visible, setVisible] = useState(false);
    const showModal = (target) => {setVisible(true); 
                                   setSendtarget({'name' :target.substr(10), 'id' : target.match(/\d+/g)[0]});
                                  }
    const hideModal = () => {setVisible(false); setSendmsg("");}


    //for add user
    const [JoinUser, setJoinUser] = useState("");
    const [visibleJoin, setJoinVisible] = useState(false);
    const showJoinModal = () => {setJoinVisible(true);}
    const hideJoinModal = () => {setJoinVisible(false); setJoinUser("");}
  
    const renderUser = (item) => {
      return(    
        <Card style = {styles.cardstyle} onPress = {()=>showModal(item)}>
            <Text style = {styles.textStyle1}>{item.substr(10)}</Text>
        </Card>
        )
    }
        
    const updateMsg = () =>{
        const upMSG = `${current_User.Uname} from ${Groupname} said : ${sendMsg}`

        // console.log(globalvalue.url.toString() + "user-update/" + sendtarget.toString())
        fetch(globalvalue.url.toString() + `user-update/${sendtarget.id.toString()}/`, {
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json'
            },  
            body : JSON.stringify({Uname : sendtarget.name, Uid : sendtarget.id, joinedGroup : [],Umessage : upMSG})
        })
        .then(resp => resp.json())
        .then(hideModal)  // send the update data back to home to update text in home screen
        .catch(error => console.log("Error", error.message)) // or use ALERT import from react-native
    }

    const getData = async(storeKey) => {
        try{
          const jsonValue = await AsyncStorage.getItem(storeKey)
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e){
          console.log(e)
        }
      }

    useEffect(() => {  
        getData('@user_data')
        .then(resp => setcurrent_User(resp))                     // then will wait previous function execute finish
        .catch(error => Alert.alert('error', error.message))
        },[])

    return(
        <View style={{ flex: 1}}>
        <FlatList
            data = {joinUser} 
            renderItem = {({item}) => {return renderUser(item)}}
            // onRefresh = {()=> getUserFromDatabase(UserData.Uid)}  // pull reload
            // refreshing = {loading} // check for pull reload
            keyExtractor = {item => item.match(/\d+/g)[0]}
        />

        <Modal visible={visible} onDismiss={hideModal} dismissable={false} contentContainerStyle={styles.messageBox}>
            <Text style= {styles.textStyle2}>Enter Message</Text>
            <TextInput style = {{marginHorizontal : 10, marginTop:10}}
                value = {sendMsg}
                onChangeText = {text => setSendmsg(text)}/>
            <View style = {{flexDirection: 'row', justifyContent: "flex-end"}}>
                <Button labelStyle = {{fontSize : 18,}} onPress={()=>updateMsg() }>Send</Button>
                <Button labelStyle = {{fontSize : 18,}} onPress={()=>hideModal()}>Cancel</Button>
            </View>
        </Modal>

        <Modal visible={visibleJoin} onDismiss={hideJoinModal} dismissable={false} contentContainerStyle={styles.messageBox}>
            <Text style= {styles.textStyle2}>Enter User ID</Text>
            <TextInput style = {{marginHorizontal : 10, marginTop:10}}
                value = {JoinUser}
                keyboardType="numeric"
                onChangeText = {text => setJoinUser(text)}/>
            <View style = {{flexDirection: 'row', justifyContent: "flex-end"}}>
                <Button labelStyle = {{fontSize : 18,}} onPress={()=>{updateJoinGroup("Add",props.data, JoinUser ); hideJoinModal();}}>Add</Button>
                <Button labelStyle = {{fontSize : 18,}} onPress={()=>hideJoinModal()}>Cancel</Button>
            </View>
        </Modal>

        <FAB             // foating + button
            style = {styles.fab}
            small = {false}
            icon = 'plus'
            theme = {{colors : {accent : "blue"}}}  
            onPress = {showJoinModal}
        />    
        
        </View>
    )    
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
    textStyle2 : {
        fontSize : 18,
        fontWeight: "bold",
        color : 'black',
        textAlign:'center'
      },
    fab : {
      position: 'absolute',
      margin :16,
      right : 0,
      bottom: 0,
      // backgroundColor : 'blue',
    },
    cardstyle : {
      padding : 10,
      margin : 10,
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
  