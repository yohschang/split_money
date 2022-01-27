import React from 'react'
import { View, Text,Alert } from 'react-native'
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

    const updateUser = (jGroup, mode) => {

        let updateBody = {}
        if(mode === "CREATE"){
            updateBody = {Uname : UserData.Uname, Uid : UserData.Uname, joinedGroup : [...UserData.joinedGroup, jGroup], Umessage : ""}
        }

        else if (mode === "ADD"){
            UserData = jGroup.Udata;
            jGroup = jGroup.GData;
            updateBody = {Uname : UserData.Uname, Uid : UserData.Uname, joinedGroup : [...UserData.joinedGroup, jGroup], Umessage : ""};
        }
        
        else{
            updateBody = {Uname : UserData.Uname, Uid : UserData.Uname,joinedGroup :[jGroup,jGroup], Umessage : ""}        
        }

        fetch(globalvalue.url.toString() + `user-update/${UserData.Uid.toString()}/`, {
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json'
            },  
            body : JSON.stringify(updateBody)
        })
        .then(resp => resp.json())
        .then(data => updateGroup(jGroup))
        .catch(error => Alert.alert("Error", error.message)) // or use ALERT import from react-native

        // updateGroup(jGroup)
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
        .then(jGroup => updateUser(jGroup,"CREATE"))
        .catch(error => Alert.alert('ERROR' , error.message))
    }

    else if(mode === "delete")
    {
        fetch(globalvalue.url.toString() + "group-list/"+Gid+"/",{
            method : "GET",
        })
        .then(resp => resp.json())
        .then((data) => {jGroup = data; return jGroup})
        .then(jGroup => updateUser(jGroup, Gid))
        .catch(error => Alert.alert('ERROR' , error.message))
    }

    else if(mode === "Add")
    {        
        fetch(globalvalue.url.toString() + "user-list/"+UserData+"/",{
            method : "GET",
        })
        .then(resp => resp.json())
        // .then((data) => {jGroup = {GData : Gid, Udata : data}; return jGroup}) // if add then pass Groupdata and Userdata
        .then(data => updateUser({GData : Gid, Udata : data},"ADD"))
        .catch(error => console.log('ERROR' , error.message))

    }


    else{
        fetch(globalvalue.url.toString() + "group-list/"+Gid+"/",{
            method : "GET",
        })
        .then(resp => resp.json())
        .then((data) => {jGroup = data; return jGroup})
        .then(jGroup => updateUser(jGroup,"CREATE"))
        .catch(error => Alert.alert('ERROR' , error.message))
    }






    // 1. update user
    // 2. update group
    
}






