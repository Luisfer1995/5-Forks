import React,{Component} from 'react';
import {StyleSheet,View,ActivityIndicator,Text} from 'react-native';
import {Image, Button,Divider,SocialIcon} from 'react-native-elements';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import {LoginStruct,LoginOption}from '../../forms/Login';
import * as firebase from 'firebase';
import Toast,{DURATION} from 'react-native-easy-toast';
import {FacebookApi} from '../../utils/Social';



export default class Login extends Component{

    constructor(props) {
      super(props)
    
      this.state = {
         loginStruct:LoginStruct,
         loginOption:LoginOption,
         loginData:{
             email:"",
             password:""
         },
         loginErrorMessage:""

      };
    };
    
    login=()=>{
        const validate= this.refs.loginForm.getValue();

        if(!validate){
           this.setState({
               loginErrorMessage:"Los datos del formulario son erróneos"
           });
        } else{
            this.setState({loginErrorMessage:""});
            firebase.auth().signInWithEmailAndPassword(validate.email,validate.password)
            .then(()=>{
                this.refs.toastLogin.show("Login correcto", 200,()=>{
                    this.props.navigation.goBack();
                });
                console.log('login correcto')
            })  
                .catch(error=>{
                this.refs.loginForm.show("Login incorrecto, revise sus datos",2500)
                {/*const errorCode=error.code;
                if(errorCode==="auth/wrong-password"){
                    console.log("La contraseña es incorrecta");
                }
            if(errorCode==="auth/user-not-found")*/}
            });
            
    };
}

    loginFacebook =async () =>{
        const{
            type,
            token
        }=await Expo.facebook.logInWithReadPermissionsAsync(
            FacebookApi.application_id,
            {permissions:FacebookApi.permissions}
        );
        if(type=="success"){
            const credentials=firebase.auth.FacebookAuthProvider.credential(token);
            firebase
                    .auth()
                    signInWithCredential(credentials)
                    .then(()=>{
                        this.refs.toastLogin.show("Login correcto",100, ()=>{
                            this.props.navigation.goBack();
                        });
                    })
                    .catch(error=>{
                        this.refs.toastLogin.show(
                            "Error accediendo con Facebook, intentelo más tarde",
                            300
                        );
                    });
        }else if(type=="cancel"){
            this.refs.toastLogin.show("Inicio de sesión cancelado",300);
        }else{
            this.refs.toastLogin.show("Error desconocido, intentelo más tarde",300);
        }
    };
    onChangeFormLogin=(formValue)=>{
        this.setState({
            loginData:formValue
        });
    };

    goToScreen=nameScreen=>{
        this.props.navigation.navigate(nameScreen)
    }

    render (){
        const {loginStruct,loginOption,loginErrorMessage}=this.state;
        return(
        <View style={styles.viewBody}>
            <Image
                source={require("../../../assets/img/food.jpg")}
                containerStyle={styles.containerLogo}
                style={styles.logo}
                PlaceholderContent={<ActivityIndicator/>}
                resizeMode="contain"/>
        
            <View style={styles.viewForm}>
                <Form ref="loginForm"
                      type={loginStruct} 
                      option={loginOption}
                      value={this.state.loginData}
                      onChange={formValue=>this.onChangeFormLogin(formValue)}/>
                <Button title="Login" buttonStyle={styles.buttonLoginCtn} onPress={()=>this.login()} />
                <Text 
                    style={styles.textRegister}>¿Aún no tienes una cuenta?{""}  
                    <Text style={styles.btnRegister} onPress={()=>this.goToScreen("Register")}>Registrate</Text> 
                </Text>
                <Text style={styles.loginErrorMessage}>{loginErrorMessage}</Text>
                <Divider style={styles.divider}/>
                <SocialIcon
                        title='Iniciar sesión con Facebook'
                        button type='facebook'
                        onPress={()=>this.loginFacebook()}
                        />
            </View>
            <Toast
                ref="toastLogin"
                position="bottom"
                positionValue={450}
                fadeInDuration={1000}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={{color:"#fff"}}/>

            
        </View>
      
        );
    }
}
const styles= StyleSheet.create({
    viewBody:{
        flex:1,
            marginLeft: 40,
            marginRight: 40,
            marginTop:40,
            height:"100%",
            
    },
    logo:{
        width:300,
        height:150
    },
    viewForm:{
        marginTop:50
    },
    buttonLoginCtn:{
        backgroundColor:"#00a680",
        marginTop:20,
        marginLeft:10,
        marginRight:10,
    },
    containerLogo:{
        alignItems:"center"
    },
    loginErrorMessage:{
        color:"#f00",
        textAlign:"center",
        marginTop:20,
    },
    divider:{
        backgroundColor:"#00a680",
        marginBottom:20,

    },
    textRegister:{
        marginTop:15,
        textAlign:"center",
    },
    btnRegister:{
        color:"#00a680",
        fontWeight:'bold',
    }


});