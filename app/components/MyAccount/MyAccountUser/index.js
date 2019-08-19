import React,{Component} from 'react'
import {Stylesheet,View,Text} from 'react-native-elements'
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
const styles=Stylesheet.create({
    viewUserAccount:{
        height:"100%",
       backgroundColor:"#f2f2f2"
    }



});