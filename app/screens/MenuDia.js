import React, {Component} from "react"
import {StyleSheet,View,Text} from "react-native";

export default class MenuDia extends Component {
    render (){
        return(
            <View style={styles.viewBody}>
                <Text> Aprovecha nuestros menus del día</Text>
            </View>
        );
    }
}
const styles= StyleSheet.create({
    viewBody:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})