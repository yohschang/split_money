import React ,{ useState, useEffect}from 'react'
import { View, Text  ,FlatList,  StyleSheet , Alert,ScrollView  } from 'react-native'
import { Card, Title, Paragraph} from 'react-native-paper';
import globalvalue from '../global';

export default function messageDISP(props) {

    const Message = props.route.params.message.split("@");

    const renderActivity = (item) => {
        let content = item.split(" : ");

        return(    
          <Card style = {styles.cardstyle} onPress = {() => {}}>
                <Card.Content>
                    <Paragraph>{content[0]}</Paragraph>
                    <Title>{content[1]}</Title>
                </Card.Content>
              {/* <Text style = {styles.textStyle1}>{item}</Text> */}
          </Card>
          )
      }
      
    return (
        <View>
            <FlatList
                data = {Message}
                renderItem = {({item}) => {return renderActivity(item)}}
                // onRefresh = {()=> getUserFromDatabase(UserData.Uid)}  // pull reload
                // refreshing = {loading} // check for pull reload
                keyExtractor = {item =>  item}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    textStyle1 : {
      fontSize : 24,
      textTransform: 'uppercase',
      fontWeight: "bold",
      color : 'black',
    },
    cardstyle : {
      padding : 10,
      margin : 10,
  },
  
  });
  