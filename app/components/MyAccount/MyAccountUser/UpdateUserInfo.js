import React, { Component } from 'react';
import{StyleSheet,View,Text}from 'react-native';
import {ListItem} from 'react-native-elements';
import Toast,{DURATION}from 'react-native-easy-toast';

import OverlayOneInput from '../../Elements/OverlayOneInput'    
import OverlayTwoInputs from '../../Elements/OverlayTwoInputs'
import OverlayThreeInputs from '../../Elements/OverlayThreeInputs';

export default class UpdateUserInfo extends Component{
     constructor(props) {
       super(props)
     
       this.state = {
           ...props,
           overlayComponent:null,
           menuItems:[
            {
                title:"Cambiar de Nombre y Apellidos",
                iconType:"material-community",
                iconColorLeft:"#ccc",
                iconNameLeft:"account-circle",
                iconNameRight:"chevron-right",
                iconColorRight :"#ccc",
                
                onPress : ()=> this.openOverlay('Nombre y Apellidos',this.updateUserName, props.userInfo.displayName )
                
            },
            {
                title:"Cambiar Email",
                iconType:"material-community",
                iconColorLeft:"#ccc",
                iconNameLeft:"at",
                iconNameRight:"chevron-right",
                iconColorRight :"#ccc",
                onPress : ()=>this.openOverlayTwoInpunts('Email','Contraseña',props.userInfo.email,this.updateUserEmail)
                
            },
            {
                title:"Cambiar Contraseña",
                iconType:"material-community",
                iconColorLeft:"#ccc",
                iconNameLeft:"lock-reset",
                iconNameRight:"chevron-right",
                iconColorRight :"#ccc",
                
                onPress : ()=>this.openOverlayThreeInputs('Ingresa tu contraseña','Nueva contraseña','Repetir nueva contraseña',this.updateUserPassword)
                
            }           
           ]
       };
     
     }
     
     updateUserName = async (newDisplayName)=>{
         if(newDisplayName){
            this.state.updateUserName(newDisplayName);
         }else{
            this.setState({
                overlayComponent:null
            })
         }
         
        
     }

     openOverlay=(placeholder,updateFunction, inputValue)=>{
        this.setState({
            overlayComponent : (
            <OverlayOneInput 
                isVisibleOverlay={true} 
                placeholder={placeholder} 
                updateFunction={updateFunction}
                inputValue={inputValue}/>)
        })

     };
     updateUserEmail = async (newEmail,password)=>{
         const prevEmail = this.props.userInfo.email;

         if(prevEmail!=newEmail){
             this.state.updateUserEmail(newEmail,password);
         }
         this.setState({overlayComponent:null});
     };
     openOverlayTwoInpunts= (placeholderOne,placeholderTwo,inputValueOne, updateFunction)=>{
        this.setState({
            overlayComponent:(<OverlayTwoInputs
                isVisibleOverlay={true} 
                placeholderOne={placeholderOne} 
                placeholderTwo={placeholderTwo}
                inputValueOne={inputValueOne}
                inputValueTwo=""
                ispassword={true}
                updateFunction={updateFunction}/>)
            
        })
     }


     updateUserPassword=async(currentPassword,newPassword,passConfirmation)=>{
         //TO DO - Validaciones
        if(currentPassword&& newPassword && passConfirmation){
            if(newPassword===passConfirmation){
                if(currentPassword===newPassword){
                    this.refs.toast.show('La nueva contraseña debe ser diferente a la anterior')
                }else{
                    this.state.updateUserPassword(currentPassword,newPassword);
                }
            }else{
                this.refs.toast.show('Las nuevas contraseñas deben ser iguales');
            }
        }else{
            this.refs.toast.show('Tienes que rellenar todos los campos');
        }
        this.setState({
            overlayComponent:null
        });

     };

     openOverlayThreeInputs= (placeholderOne, placeholderTwo,placeholderThree, updateFunction)=>{
          this.setState({
              overlayComponent:(
                  <OverlayThreeInputs
                    isVisibleOverlay={true}
                    placeholderOne={placeholderOne}
                    placeholderTwo={placeholderTwo}
                    placeholderThree={placeholderThree}
                    inputValueOne=""
                    inputValueTwo=""
                    inputValueThree=""
                    isPassword={true}
                    updateFunction={updateFunction}/>
              )
          })
     }

    render(){

        const{menuItems, overlayComponent}=this.state
        return (

            <View >
                {menuItems.map((item,index)=>(
                    <ListItem
                        key={index}
                        title={item.title}
                        leftIcon={{type:item.iconType, name:item.iconNameLeft, color:item.iconColorLeft}}
                        rightIcon={{type:item.iconType, name:item.iconNameRight, color:item.iconColorRight}}
                        onPress={item.onPress}
                        containerStyle={styles.contentContainerStyle}/>
               ))}
               {overlayComponent}
               <Toast
                 ref='Toast'
                 position='center'
                 positionValue={0}  
                 fadeInDuration={750}
                 fadeOutDuration={750}
                 opacity={0.8}
                 textStyle={{color:'#fff'}} />
            </View>
        );
    }

}
const styles = StyleSheet.create ( {
    contentContainerStyle:{
         borderBottomWidth:1,
         borderBottomColor:"#e3e3d3",
         
        

    }
});