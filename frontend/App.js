import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button} from 'react-native-paper';
import Home from './screens/home';
import CreateUser from './screens/CreateUser';
import GroupDetial from './screens/GroupDetial';
import ActivityDetial from './screens/ActivityDetial';
import messageDISP from './screens/messageDISP';
import About from './screens/About';


import {NavigationContainer} from '@react-navigation/native';
// https://reactnavigation.org/docs/getting-started //install everything inside
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator()


function App() {   // must add export default

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name="Home" component={Home} options={({navigation}) => ({
          title: 'Groups',
          headerRight: () => (
            <View style = {{flexDirection : "row"}}>
              <Button mode="'text'" onPress={() => {navigation.navigate("About")}}>
              About
              </Button>
            </View>
          ),})} />
        <Stack.Screen name="CreateUser" component={CreateUser} options={{title: 'CreateUser',}}/>
        <Stack.Screen name="GroupDetial" component={GroupDetial} options={({route}) => ({title : route.params.Groupdata.Gname + "   (ID : "+route.params.Groupdata.Gid + ")", 
          headerTitleStyle: {textTransform: 'uppercase', fontWeight: "bold",}})}/>
        <Stack.Screen name="ActivityDetial" component={ActivityDetial} options={({route}) => ({title : route.params.ActivityData.Aname, 
          headerTitleStyle: {textTransform: 'uppercase', fontWeight: "bold",}})}/>
        <Stack.Screen name="messageDISP" component={messageDISP} options={{title : 'Messages', 
          headerTitleStyle: {textTransform: 'uppercase', fontWeight: "bold",}}}/>
        <Stack.Screen name="About" component={About} options={{title : 'About', 
          headerTitleStyle: {textTransform: 'uppercase',fontWeight: "bold",}}}/>
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
