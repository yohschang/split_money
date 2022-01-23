import React,{useEffect,useState} from 'react'
import { View, Text,StyleSheet, ScrollView} from 'react-native'
import { Button } from 'react-native-paper'
import finalSplit from './cal_res'

export default function Balance(props) {

    const GroupData = props.data
    let total_money = Array(20).fill(0)
    const [disp_money, Set_dispMoney] = useState(total_money)
    const [SplitResult, SetsplitResult] = useState([])

    const cal_groupMoney = () =>{
        for(var a in GroupData.activities)
        {   
            let active = GroupData.activities[a]
            let count = 0
            for(var m in active.AMoney)
            {
                total_money[count] += active.AMoney[m] 
                count+=1
            }
        }
    }

    useEffect(() => {  
        cal_groupMoney()
        Set_dispMoney(total_money)
        },[GroupData])

    let single_exp = disp_money.map((m,i) => {
        if (m !== 0 )
        {return( 
            <View style = {{flexDirection: 'row', margin : 5}}>
                <Text style = {{flex:0.4, fontSize:22, fontWeight:"bold",textAlign: "center"}}>{GroupData.joinedUser[i].match(/[a-zA-Z]+/g)}</Text>
                <Text style = {{flex:0.6, fontSize:22, fontWeight:"bold" ,textAlign: "center"}}>{Math.round(m*100)/100}</Text>
                <Text></Text>
            </View>)
        }
        }); 

    //flexDirection: 'row'

    const getSplit = () =>{
        let Split_res = finalSplit(GroupData.joinedUser.map((u,i) => {return({name : [u][0] , value :  disp_money[i]})}))
        SetsplitResult(Split_res)
    }

    let displaySplit = SplitResult.map((res,i) => {
        if (SplitResult.length !== 0 )
        {return( 
            <View style = {{flexDirection: 'row', margin : 5}}>
                <Text style = {{...styles.textStyle, flex: 0.3}}>{res[0].match(/[a-zA-Z]+/g)}</Text>
                <Text style = {{...styles.textStyle, flex: 0.1}}> -{`>`} </Text>
                <Text style = {{...styles.textStyle, flex:0.3}}>{res[1].match(/[a-zA-Z]+/g)}</Text>
                <Text style = {{...styles.textStyle, flex:0.1}}> : </Text>
                <Text style = {{...styles.textStyle, flex: 0.2}}>{Math.round(res[2]*100)/100}</Text>
            </View>)
        }
    }); 

    return (
        <ScrollView style = {{marginTop : 10}}>
            <View style = {{flexDirection: 'row'}}>
                <Text style = {{flex:0.4, fontSize:28, fontWeight:"bold",textAlign: "center"}}>User</Text>
                <Text style = {{flex:0.6, fontSize:28, fontWeight:"bold" ,textAlign: "center"}}>Expenses</Text>
            </View>
            <Text style = {{fontSize:24, fontWeight:"bold",textAlign: "center"}}>---------------------------------</Text>
            <View>
            {single_exp}
            </View>
            <Text style = {{fontSize:24, fontWeight:"bold",textAlign: "center"}}>---------------------------------</Text>

            <Button 
            style = {styles.ButtonStyle}
            icon = "calculator"
            mode = "contained"
            onPress={getSplit}> 
            Split It !</Button>

            <View>
                <View style = {{flexDirection: 'row', marginTop :20}}>
                    <Text style = {{...styles.textStyle,fontSize:28}}>Split Result</Text>
                </View>
                <Text style = {{fontSize:24, fontWeight:"bold",textAlign: "center"}}>---------------------------------</Text>
                <View>
                {displaySplit}
                </View>
                <Text style = {{fontSize:24, fontWeight:"bold",textAlign: "center"}}>---------------------------------</Text>

            </View>
        </ScrollView>

    )
}


const styles = StyleSheet.create({
    ButtonStyle: 
    { 
        width: "80%",
        alignItems : "center",
        alignContent : "center",
        justifyContent: 'center',
        alignSelf: 'center',
    },

    textStyle : 
    {
        flex:1,
        fontSize:22, 
        fontWeight:"bold",
        textAlign: "center"
    }
})