import React, {Component} from "react"
import {StyleSheet,View,ActivityIndicator} from "react-native";
import t from 'tcomb-form-native'
const Form = t.form.Form;
import {RegisterOptions,RegisterStruct}from '../../forms/Register'
import {Button, Text,Image,} from "react-native-elements";

import * as firebase from 'firebase';
import Toast,{DURATION} from 'react-native-easy-toast';



export default class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             registerStruct:RegisterStruct,
             registerOptions:RegisterOptions,
             formData:{
                 name:"",
                 email:"",
                 password:"",
                 passwordConfirmation:"",
             },
             formErrorMessage:""
        };
    }
    register=()=>{
       
        const {password,passwordConfirmation}=this.state.formData;
        if(password===passwordConfirmation){
            const validate=this.refs.registerForm.getValue()
            if(validate){
                this.setState({formErrorMessage:"" });
                firebase.auth().createUserWithEmailAndPassword(validate.email, validate.password).then(resolve=>{
                    this.refs.toast.show('Registro correcto', 400, () => {
                        this.props.navigation.goback(); //ó .navigate("Register")
                    });
                }).catch(error =>{
                    this.refs.toast.show('Email ya esta en uso', 2500)
                });
            }else {
                this.setState({
                    formErrorMessage:"Formulario Incorrecto"
                });
                
            }
        }else {
            
            this.setState({
                formErrorMessage:"Las contraseñas no son iguales"
            });
        }  
    };

    onChangeForm=(formValue)=>{
        this.setState({
            formData:formValue,
        
        })
        ;
    };
    
    render (){
        const{registerOptions,registerStruct,formErrorMessage} =this.state
        return(
            <View style={styles.viewBody}>
               <Image
                source={require("../../../assets/img/5tenedores.svg")}
                containerStyle={styles.containerLogo}
                style={styles.logo}
                PlaceholderContent={<ActivityIndicator/>}
                resizeMode="contain"
               />
                <Form
                  ref="registerForm"
                  type={registerStruct} 
                  options={registerOptions}
                  value={this.state.formData}
                  onChange={(formValue)=>this.onChangeForm(formValue)}
                   />
                   <Button buttonStyle={styles.buttonRegisterContainer} title="Unirse" onPress={()=>this.register()}/>
            
                    <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
                    <Toast
                    ref="toast"
                    position='bottom'
                    positionValue={250}
                    fadeInDuration={850}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'#fff'}}
                />
            
            </View>
        );
    }
}
const styles= StyleSheet.create({
    viewBody:{
        flex:1,
        justifyContent:"center",
        marginLeft:40,
        marginRight:40
       
},
containerLogo:{
    alignItems:"center",
    marginBottom: 30,
},
logo:{
    width:300,
    height:150
},
buttonRegisterContainer:{
    backgroundColor:"#00a680",
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
}, formErrorMessage:{
    color:"#f00",
    textAlign:"center",
    marginTop:30
},
containerLogo:{
    alignItems:"center"
},

})