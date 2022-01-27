import { View, Text, Image , StyleSheet,Linking, TouchableHighlight, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function About(props) {

    const [UserData, setUserdata] = useState({})
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
        props.navigation.navigate("CreateUser")
        }
    }

    useEffect(() => {
        getData('@user_data')
        .then(resp => {setUserdata(resp); return resp})
        .then(resp => { return checkUserExist(resp)})

    }, [UserData])
    
  return (
    <View style = {{backgroundColor : '#FFFFFF', alignItems : "center", flex : 1}}>
        <View style = {{alignItems : "center", flex : 0.7}}>
            <Text style = {styles.UsernameStyle}>Hi {UserData.Uname} [ {UserData.Uid} ]</Text>
            <Text style = {{...styles.UsernameStyle, marginTop : 70}}>User manual</Text>
            <Text style = {{...styles.UsernameStyle, marginTop : -25}}>______________</Text>
            <View style = {{justifyContent: 'center',}}>
                <Text style = {styles.TextStyle}>1. Long press to delete</Text>
                <Text style = {styles.TextStyle}>2. Pull down to update</Text>
                <Text style = {styles.TextStyle}>3. Find out yourself :)</Text>
            </View>
        </View>
        <View  style  = {{width : "50%", alignItems : "center", flex : 0.3}} >
            <TouchableOpacity style  = { {alignItems : "center"}} 
                                onPress={() => {console.log("press");Linking.openURL('https://github.com/yohschang/split_money')}}>
                    <Image 
                        style = {{resizeMode : "center"}}
                        source={require('../assets/design.jpg')}
                    />
            </TouchableOpacity>
        </View>
        {/* <View  style  = {{width : "50%", alignItems : "center",flex : 0.05}} >


            <View style = {{flexDirection : 'row', marginTop : -30}}>
                <Ionicons style={{marginTop : 3}} size={20} name = "arrow-forward"/>
                <Text style={{fontSize : 20}}
                onPress={() => Linking.openURL('https://github.com/yohschang/split_money')}>
                  {"\r"}   GitHub   {"\r"}   
                </Text>
                <Ionicons style={{marginTop : 3}} size={20} name = "arrow-back"/>
            </View>
        </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
    UsernameStyle : {
        marginTop : 20,
        fontSize : 26,
        textAlign :"center",
        fontWeight : "bold",
    },
    TextStyle : {
        marginTop : 5,
        fontSize : 20,
        textAlign : "left",
        fontWeight : "bold",
    }

})



