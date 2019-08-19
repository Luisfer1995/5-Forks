import React, {Component} from "react"
import {StyleSheet,View,Text} from "react-native";


export default class Home extends Component {
    render (){
        return(
            <View style={styles.viewBody}>
                <Text> Inicio</Text>
            </View>
        );
    }
}
const styles= StyleSheet.create({
    viewBody:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"#fff",
        alignItems:"center",

      
      }
    });
