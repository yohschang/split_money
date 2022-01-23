import React from 'react'
import { View, Text } from 'react-native'
import globalvalue from '../global';

export default function updateJoinGroup(mode, Gid, UserData) {

    let date = new Date();
    let id_num = `${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`.substring(1,13)

    let jGroup = {};


    const updateGroup = (jGroup) => {
        fetch(globalvalue.url.toString() + `group-update/${jGroup.Gid.toString()}/`, {
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json'
            },  
            body : JSON.stringify(jGroup)
        })
        .then(resp => resp.json())
        .catch(error => console.log('error', error.message)) 


    }
    const updateUser = (jGroup) => {
        fetch(globalvalue.url.toString() + `user-update/${UserData.Uid.toString()}/`, {
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json'
            },  
            body : JSON.stringify({Uname : UserData.Uname, Uid : UserData.Uname, joinedGroup : [...UserData.joinedGroup, jGroup], Umessage : UserData.Umessage})
        })
        .then(resp => resp.json())
        // .then(data => updateGroup(data))
        .catch(error => Alert.alert("Error", error)) // or use ALERT import from react-native

        updateGroup(jGroup)
    }


    if (mode === 'create'){
        fetch(globalvalue.url.toString() + "group-create/",{
        method : "POST",
        headers :{
            'Content-Type' : 'application/json'
        },   // *************note************* :: its 'HEADERS' NOT HEADER :(
        body : JSON.stringify({'Gname' : Gid, "totalMoney": []})
        })
        .then(resp => resp.json())
        .then((data) => {jGroup = data; return jGroup})
        .then(jGroup => updateUser(jGroup))
        .catch(error => Alert.alert('ERROR' , error.message))
    }

    else{
        fetch(globalvalue.url.toString() + "group-list/"+Gid+"/",{
            method : "Get",
        })
        .then(resp => resp.json())
        .then((data) => {jGroup = data; return jGroup})
        .then(jGroup => updateUser(jGroup))
        .catch(error => Alert.alert('ERROR' , error.message))
    }






    // 1. update user
    // 2. update group
    
}






