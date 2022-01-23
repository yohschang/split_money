import React,{ useState, useEffect} from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput , Button} from 'react-native-paper';
import globalvalue from '../global';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CreateUser(props) {

    const [Username, setUsername] = useState("")
    const [UserID, setUserID] = useState("")
    const id = ()=> {
        let date = new Date();
        let id_num = `${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`.substring(1,13)
        return id_num
    }

    const storeData = async(storedata, storeKey) => {  // use async function to store user data in local storage 
        try {
          const jsonValue = JSON.stringify(storedata)
          await AsyncStorage.setItem(storeKey, jsonValue)
        }catch (e){
          console.log(e)
        }
      }

    const uploadUserData = () => {
        fetch(globalvalue.url.toString() + "user-create/",{
            method : "POST",
            headers :{
                'Content-Type' : 'application/json'
            },   // *************note************* :: its 'HEADERS' NOT HEADER :(
            body : JSON.stringify({'Uname' : Username, 'Uid' :  UserID.toString()})
        })
        .then(resp => resp.json())
        .then(resp => storeData(resp, '@user_data'))
        .then(resp => props.navigation.navigate({name : "Home", params : resp ,merge: true})) //  navigate to home
        .catch(error => Alert.alert('ERROR' , error.message))
    }

    useEffect(()=>{
        setUserID(id())
    },[])

    // here also need to return user data

    return (
        <View style = {styles.createUser}>
            <Text style = {styles.Textstyle} >
                Enter User Name : 
            </Text>
            <TextInput
                style = {styles.inputstyle}
                label = "Name"
                mode = "outlined"
                value = {Username}
                onChangeText = {text => setUsername(text)}
            />
            <Text style = {{...styles.Textstyle, marginRight : 100}} >
                User ID : 
            </Text>
            <TextInput
                style = {styles.inputstyle}
                label = "ID"
                mode = "outlined"
                disabled = {true}
                value = {UserID}
            />
            <Button
            style = {styles.buttonStyle}
            icon = "check"
            mode = "contained"
            onPress = {() => uploadUserData()}
            labelStyle = {styles.buttonText}
            >Create User
            </Button>
            
        </View>
    )
}

const styles = StyleSheet.create({
    createUser : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputstyle : {
        width : 200,
        height : 50,
        padding : 10,
        marginTop: 0 ,
        alignContent : 'center'
    },
    buttonStyle:{
        width : 200,
        height : 100,
        marginTop: 80 ,
        alignContent : 'center'

    },
    buttonText : {
        textAlignVertical : 'center',
        textAlign : 'center', 
        fontSize : 16,
        lineHeight: 80 ,
    },
    Textstyle : {
        marginTop : 20,
        fontSize : 24,
        fontWeight: 'bold',
        textAlign : 'left', 
    }


})