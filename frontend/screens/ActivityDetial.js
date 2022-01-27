import React ,{ useState,useEffect}from 'react'
import { View, Text, StyleSheet, FlatList , Table, Cols, ScrollView, Alert} from 'react-native'
import { TextInput , Button, Switch,Provider} from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import globalvalue from '../global';
import DropDown from "react-native-paper-dropdown";


// TODO : model need a place to store who paid and saperate calculate result and actual paid list

export default function ActivityDetial(props) {


    const GroupData = props.route.params.GroupData
    const ActivityData = props.route.params.ActivityData
    const joinUser = GroupData.joinedUser

    const [mode, Setmode] = useState(props.route.params.mode)


    const [paidlist, setpaid] = useState(ActivityData.AMoney.map((p) => {if (p===0){return ""} else{return p.toString()}}))
    let pl = ActivityData.AMoney.map(p => p.toString())

    const [weightlist, setweight] = useState(ActivityData.Aweighted.map((p) => {if (p===0){return ""} else{return p.toString()}}))
    let wl = ActivityData.Aweighted.map(p => p.toString())

    const [joinlist, setjoin] = useState(ActivityData.Ajoined)
    let jl = ActivityData.Ajoined

    const [totalMoney, setTotalmoney] = useState(ActivityData.AtotalMoney)
    const [Aname, setAname] = useState(ActivityData.Aname)

    let [showDropDown, setShowDropDown] = useState(false)
    const [PaidUser, setPaidUser] = useState(ActivityData.APaid)


    // i create two variable for each input to store the individual value, the state variable is to rerender the page, however state variable is read only
    // so i have to create let variable to update , when value change, let variable will sync State variable with 'let = [...state]' then modified let variable
    // fianlly setstate(let variable)  

    const calculate = (ipl,iwl,ijl) => {

        var total_w = 0
        var total_p = 0
        let PUser;
        if (PaidUser === "") {PUser = ijl.indexOf(true) }
        else{PUser = PaidUser}
        ipl[parseInt(PUser)] = 0
        for(var i = 0 ; i< joinUser.length; i++){
            if(ijl[i]){
                if(iwl[i] === 0.0){iwl[i] = 1}               
            }
            else{
                iwl[i] = 0.0
                ipl[i] = 0.0
            }
            total_w += iwl[i]
            total_p += ipl[i]
        }
        ipl[PUser] = totalMoney - total_p

        // console.log(totalMoney, total_p)
        
        const each_part = totalMoney / total_w;

        for(var i = 0 ; i< joinUser.length; i++){
            ipl[i]  = Math.round((ipl[i] -each_part * iwl[i])*100)/100;
        }
        return [ipl,iwl]
    }

    const SaveActivity = (action) => {

        pl = [...paidlist].map((p) => { if(p){return parseFloat(p)} else{return 0.0}})
        wl = [...weightlist].map((w) => { if(w){return parseFloat(w)} else{return 0.0}})
        jl = [...joinlist]
        console.log(pl)
        let cal_res = calculate([...pl],wl,jl) // the result cause problem ///FIXXXXXXX
        const fpl = cal_res[0], fwl = cal_res[1];

        console.log(pl)

        // console.log(fpl, fwl)

        let updateData = {}
        if (mode === "update"){
            updateData = 
            {
                "Gname": GroupData.Gname,
                "Gid": GroupData.Gid,
                "totalMoney": GroupData.totalMoney,
                "activities": [
                    {
                    "id": ActivityData.id,
                    "Aname": Aname,
                    "Adate": ActivityData.Adate,
                    "Atime": ActivityData.Atime,
                    "AMoney": pl,
                    "Aweighted": fwl,
                    "Ajoined": jl,
                    "AtotalMoney":totalMoney,
                    "APaid" : PaidUser,
                    "AfinalMoney" : fpl
                    }
                ]
            }
        }
        else{
            updateData = 
            {
                "Gname": GroupData.Gname,
                "Gid": GroupData.Gid,
                "totalMoney": GroupData.totalMoney,
                "activities": [
                    {
                    "Aname": Aname,
                    "AMoney": pl,
                    "Aweighted": fwl,
                    "Ajoined": jl,
                    "AtotalMoney":totalMoney,
                    "APaid" : PaidUser,
                    "AfinalMoney" : fpl
                    }
                ]
            }
        }
        // console.log(updateData)

        fetch(globalvalue.url.toString() + `group-update/${GroupData.Gid.toString()}/`, {
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json'
            },  
            body : JSON.stringify(updateData)
        })
        .then(resp => resp.json())
        .then(props.navigation.dispatch(action))  // send the update data back to home to update text in home screen
        // .catch(error => Alert.alert("Error", error)) // or use ALERT import from react-native
        .catch(error => console.log('error', error.message)) 


        
    }


    


    useEffect(() =>
        props.navigation.addListener('beforeRemove', (e) => {
        const action = e.data.action;  // extract the goback action when press goback button(which throws 'e') and hold


        e.preventDefault();  // default goback button will trigger goback function, preventDefault stop this action

        console.log(Aname==="", totalMoney, PaidUser===undefined)
        if(Aname === "" && totalMoney === 0){
            props.navigation.dispatch(action)
        }

        else if(totalMoney === 0 || totalMoney === "" || PaidUser===undefined){
            Alert.alert(
                'Please enter "Total Amount" and "Paid by who"',
                'Or click leave',
                [
                { text: "OK", style: 'destructive', onPress: () => {}},
                {
                    text: 'Leave',
                    style: 'destructive',
                    onPress: () =>  props.navigation.dispatch(action),  
                },
                ],
                {cancelable: true,}
            );
        }

        else{
        Alert.alert(
            'Save changes?',
            'Click outside to stay',
            [
            { text: "Save", style: 'destructive', onPress: () => SaveActivity(action) },
            {
                text: 'Discard',
                style: 'destructive',
                onPress: () =>  props.navigation.dispatch(action),  
            },
            ],
            {cancelable: true,}
        )};
        }),
        [props.navigation, paidlist,joinlist, weightlist,totalMoney, Aname,PaidUser]
      );
    
    const render_item = () => {
        return joinUser.map((Userj) => {
            const idx = joinUser.indexOf(Userj)
            return(
                <ScrollView key= {Userj} style ={{marginHorizontal : 20,flex : 1}}>         
                <View  style={styles.Userdetial}>
                    <View style = {{flex : 0.25}}>
                        <Text style = {styles.Textstyle}>{Userj.substr(10)}</Text>
                        {/* <Text style = {styles.Textstyle}>{item.item.joinUser}</Text> */}
                    </View> 

                    <View style={{flexDirection: 'row', flex : 0.05, marginLeft : -20, marginRight :10}}>
                        <Switch 
                            value={joinlist[idx]} 
                            onValueChange= {(value) => {jl = [...joinlist]; jl[idx] = value; setjoin(jl)}}
                        />  

                    </View>
                
                    <View style={{flexDirection: 'row', flex : 0.6}}>
                        {/* <Switch  value={User_Json[index].join_list} onValueChange={(value) => joinActivity(value, index,item)} /> */}

                        <TextInput
                            style = {styles.inputstyle2}
                            label = "Paid"
                            mode = "outlined"
                            value = {paidlist[idx]}
                            onChangeText = {text => {pl = [...paidlist]; pl[idx] = text; setpaid(pl);}}
                            keyboardType='numeric'
                        />               
                        <TextInput
                            style = {styles.inputstyle2}
                            label = "Weighted"
                            mode = "outlined"
                            value = {weightlist[idx]}
                            onChangeText = {text => {wl = [...weightlist]; wl[idx] = text; setweight(wl)}}
                            keyboardType='numeric'
                        />
                    </View>
    
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: 'gray',justifyContent: 'center',alignItems:'center'}} />
            </ScrollView>  
            )
        })

    }

    let PaidUserList = joinUser.map((s) => {
        return { label:s.substr(10) ,value:joinUser.indexOf(s) }
    });   

    return ( // Provider is must needed to use dropdown list
        <Provider> 
        <ScrollView>
            <View style={{flexDirection: 'row', flex: 1}}>
                <View style = {{flex: 0.5}}>
                    <Text style = {{...styles.inputstyle, fontSize : 22}}>Activity Name</Text>
                    <TextInput
                        style = {{...styles.inputstyle, width:'100%',marginTop:-20}}
                        label = "Activity Name"
                        mode = "outlined"
                        value = {Aname}
                        onChangeText = {text => setAname(text)}
                    />  
                </View>
                <View style = {{flex: 0.5}}>
                    <Text style = {{...styles.inputstyle, fontSize : 22}}>Time</Text>
                    <TextInput
                        style = {{...styles.inputstyle, width:'100%',marginTop:-20}}
                        label = "Time"
                        mode = "outlined"
                        value = {ActivityData.Adate}
                        // onChangeText = {text => setUsername(text)}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
                <View style = {{flex: 0.5}}>
                    <Text style = {{...styles.inputstyle, fontSize : 22}}>Total</Text>
                    <TextInput
                        style = {{...styles.inputstyle, width:'100%',marginTop:-20}}
                        label = "Total"
                        mode = "outlined"
                        keyboardType='numeric'
                        value = {totalMoney.toString()}
                        onChangeText = {text => setTotalmoney(text)}
                    />  
                </View>
                <View style = {{flex: 0.5}}>
                    <Text style = {{...styles.inputstyle, fontSize : 22}}>Paid By</Text>
                    <DropDown
                        style = {{...styles.inputstyle, width:'100%',marginTop:-40}}
                        label={"Paid By"}
                        mode={"outlined"}
                        visible={showDropDown}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}
                        value={PaidUser}
                        setValue={(value) => setPaidUser(value)}
                        list={PaidUserList}
                    />
                </View>
                
            </View>

            <Text style = {styles.inputstyle}>Joined User</Text>
            {render_item()}
        </ScrollView>
        </Provider>

           

    )
}


const styles = StyleSheet.create({
    Userdetial : {
        flexDirection: 'row', 
        flex:0.8, 
        justifyContent: 'space-between',
        marginVertical:5,
    },
    PersonView : {
        flex : 1,


    },
    inputstyle : {
        fontSize : 25,
        width : 200,
        height : 50,
        padding : 10,
        marginTop: 0 ,
        alignContent : 'center'
    },

    inputstyle2 : {

        width : 100,
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
        marginHorizontal:5,
        fontSize : 20,
        fontWeight: 'bold',
        textAlign : 'left', 
    }


})
