import React, {Component} from "react"
import {StyleSheet,View,Text} from "react-native";

export default class Carta extends Component {
    render (){
        return(
            <View style={styles.viewBody}>
                <Text> Disfruta de nustras especialidades</Text>
            </View>
        );
    }
}
const styles= StyleSheet.create({
    viewBody:{
        flex:1,
    }
})