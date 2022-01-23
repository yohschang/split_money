import React ,{ useState, useEffect}from 'react'
import { View, Text  ,FlatList,  StyleSheet , Alert} from 'react-native'
import globalvalue from '../global';
import { Card,FAB , Dialog, Portal,TextInput,} from 'react-native-paper';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Users from './UserList';
import Balance from './balance';

//TODO :  get group data from db

function Activities(props) {
  
  const GroupData = props.data.route.params.GroupData
  const Activicty = props.data.route.params.GroupData.activities

  const clickItem = (ActivityData) => {
    props.data.navigation.navigate("ActivityDetial", {GroupData : GroupData ,ActivityData : ActivityData, mode : "update"})  // the argument {dataa:dataa} will pass to "Detial" as props
  }

  const AddActivity = () => {
    const newActivity = 
      {
        "Aname": "",
        "AMoney": Array(20).fill(0.0),
        "Aweighted": Array(20).fill(0.0),
        "Ajoined": Array(20).fill(false),
        "AtotalMoney": 0.0
      }
    props.data.navigation.navigate("ActivityDetial", {GroupData : GroupData ,ActivityData : newActivity, mode : "add"})  // the argument {dataa:dataa} will pass to "Detial" as props
  }

  const deleteActivity = (item) => {

    Alert.alert(
      'Delete Activity?',
      'No return after delete !',
      [
      { text: "Delete", 
        style: 'destructive',
        onPress: () => {        
          fetch(globalvalue.url.toString() + `group-delete/${GroupData.Gid.toString()}/${item.id.toString()}/`, {
          method : "DELETE",
          headers : {
              'Content-Type' : 'application/json'
              }
            })
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

  const renderActivity = (item) => {

    return(    
      <Card style = {styles.cardstyle} onPress = {() => clickItem(item)} onLongPress = {() => deleteActivity(item)}>
          <Text style = {styles.textStyle1}>{item.Aname}</Text>
      </Card>
      )
  }

  const sortActivity = () => {

    let sort_act = Activicty.sort(function(a,b) {  
      return a.id - b.id; 

    })
    return sort_act
  }

  
    return(
        <View style={{ flex: 1}}>
        <FlatList
            data = {sortActivity()} 
            renderItem = {({item}) => {return renderActivity(item)}}
            // onRefresh = {()=> getUserFromDatabase(UserData.Uid)}  // pull reload
            // refreshing = {loading} // check for pull reload
            keyExtractor = {item =>  item.Aname}
        />

        <FAB             // foating + button
            style = {styles.fab}
            small = {false}
            icon = 'plus'
            theme = {{colors : {accent : "blue"}}}  // same as setting bgcolor in style
            // onPress = {()=> props.navigation.navigate('Create')}
            onPress = {AddActivity}
        />    
        </View>
    )
}


export default function GroupDetial(props) {


    const [GroupData, SetGroupdata] = useState(props.route.params.Groupdata)
    const [update, SetUpdate] = useState(false)

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
    { key: 'Activities', title: 'Activities' },
    { key: 'Users', title: 'Users' },
    { key: 'Balance', title: 'Balance' },
    ]);

    const getGroupdata = (gid) => {
      fetch(globalvalue.url.toString() + `group-list/${gid}/`,{
        method : "GET"
        })
        .then(resp => resp.json())
        // .then(data => console.log(data))
        .then((data) => {SetGroupdata(data); SetUpdate(!update)})
        // .catch(error => Alert.alert('error', error.message)) 
        .catch(error => console.log('error', error.message)) 

    }

    useEffect(() => {
      getGroupdata(GroupData.Gid)
      // props.navigation.addListener('focus', () => {
      //   getGroupdata(GroupData.Gid)
        // console.log(props)
    // });

  }, [props.navigation,GroupData]);

    // TODO : CHANGE PROPS THAT PASS TO ACTIVITUES TO UPDATED gRIUP DATA

    const renderScene = ({ route }) => {
        props.route.params.GroupData = GroupData
        // getGroupdata(GroupData.Gid)
        switch (route.key) {
          case 'Activities':
            return <Activities data={props}/>;
          case 'Users':
            return <Users data={GroupData} />;
          case 'Balance':
            return <Balance data={GroupData}/>;
          default:
            return null;
        }
      };

  
    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{marginTop:0,backgroundColor:'blue'}}
        />
    );
   
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            // initialLayout={{ width: layout.width }}
        />
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
      bottom: 0,
      // backgroundColor : 'blue',
    },
    cardstyle : {
      padding : 10,
      margin : 10,
  },
  
  });
  