import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
// import {writeJsonFile} from 'write-json-file';
import Home from './screens/home';
import CreateUser from './screens/CreateUser';
import GroupDetial from './screens/GroupDetial';
import ActivityDetial from './screens/ActivityDetial';


import {NavigationContainer} from '@react-navigation/native';
// https://reactnavigation.org/docs/getting-started //install everything inside
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator()


function App() {   // must add export default

  const getData = async(storeKey) => {
    try{
      const jsonValue = await AsyncStorage.getItem(storeKey)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e){
      console.log(e)
    }
  }

  const checkUserExist = (UserData) => {   
    if (UserData == null){
    console.log("not exist")
    // create user return user data and use the id to create home
    props.navigation.navigate("CreateUser")
    }
    else{
        Alert.alert(
          `User [ ${UserData.Uname} : ${UserData.Uid} ]` ,
          ' \nUser manual :\n1. Long press to delete \n2. Pull down to update\n'+
          "\n\n\n\n\n\n------   App designed by   ------ \nyohschang \nGolson Lin \nhsinyin98 \nHYHS1029 \nEric",           
        )
       
    }
  }

  const About  =() => {

    getData('@user_data')
    .then(resp => { return checkUserExist(resp)})
  
  
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name="Home" component={Home} options={{
          title: 'Groups',
          headerRight: () => (
            <View style = {{flexDirection : "row"}}>
              <Button mode="'text'" onPress={() => About()}>
              About
              </Button>
              <Button mode="'text'" onPress={() => {}}>
              Message
              </Button>
            </View>
          ),}} />
        <Stack.Screen name="CreateUser" component={CreateUser} options={{title: 'CreateUser',}}/>
        <Stack.Screen name="GroupDetial" component={GroupDetial} options={({route}) => ({title : route.params.Groupdata.Gname + "   (ID : "+route.params.Groupdata.Gid + ")", 
          headerTitleStyle: {textTransform: 'uppercase', fontWeight: "bold",}})}/>
        <Stack.Screen name="ActivityDetial" component={ActivityDetial} options={({route}) => ({title : route.params.ActivityData.Aname, 
          headerTitleStyle: {textTransform: 'uppercase', fontWeight: "bold",}})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

 

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
});
