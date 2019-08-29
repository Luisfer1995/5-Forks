import React,{Component} from 'react'
import {StyleSheet,View,} from 'react-native'
import UserInfo from './UserInfo.js'

export default class MyAccountUser extends Component{
    constructor(props) {
        super(props)
    
    }
    render (){
        return(
            <View style={styles.viewUserAccount}> 
                <UserInfo/>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    viewUserAccount:{
        height:"100%",
       backgroundColor:"#f2f2f2"
    }



});