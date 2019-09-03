import React,{Component} from 'react';
import {StyleSheet,View,ActivityIndicator } from 'react-native'
import{Icon,Image,Button,Text,Overlay} from 'react-native-elements';
import * as ImagePicker  from 'expo-image-picker'
import * as Permissions from 'expo-permissions';
import Toast,{DURATION} from 'react-native-easy-toast';
import {uploadImage} from '../../utils/UploadImage';
const Form = t.form.Form;
import {AddRestaurantStruct, AddRestaurantOptions} from "../../forms/AddRestaurant"
import t from "tcomb-form-native";
// Componentes de FIREBASE Obligatorios 
import{firebaseapp} from '../../utils/FireBase'
import firebase from 'firebase/app';
import "firebase/firestore";



const db=firebase.firestore(firebaseapp)





export default class AddRestaurant extends Component {
    
    constructor(props) {
      super(props)
    
      this.state = {
        loading:false,
        imageUriRestaurant:"",
         formData:{
             name : "",
             city:"",
             address:"",
             description:""
         }
      };
    };
    
    isImageRestaurant= image =>{
        if(image){
            return(
                <Image source={{uri:image}} style={{width:500, height:200}}/>
            )
            
        }else{
            return(
                <Image source={require("../../../assets/img/no-image.png")} style={{width:200, height:200}}/>
            )
            
        }
    }

    uploadImage= async()=>{
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        
        if(resultPermission.status === "denied"){
            this.refs.toast.show(
                "Es necesario aceptar los permisos de la galería",1500
                );
        }else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing : true,
            });
            if ( result.cancelled){
                this.refs.toast.show("Has cerrado la galería",1500);
            }else{
                this.setState({
                    imageUriRestaurant:result.uri
                });
            }
        }
    };

    onChangeFormAddRestaurant = formValue=>{
        this.setState({
            formData:formValue
        })
    };
    addRestaurant = ()=>{
        const{imageUriRestaurant}=this.state;
        const{name,city,address,description}=this.state.formData;
       

        if(imageUriRestaurant && name && address && city &&description){
            this.setState({
                loading:true
            });
    
            db.collection("restaurants")
               .add({name,city,address,description,image:"",createAt:new Date()})
            .then(resolve=>{
                const restaurantId=resolve.id;
                
                uploadImage(imageUriRestaurant,restaurantId,"restaurants" )
                    .then(resolve=>{
                        const restaurantRef=db
                            .collection("restaurants")
                            .doc(restaurantId);

                            restaurantRef
                                .update({image:resolve})
                                .then(()=>{
                                this.setState({loading:false});    
                                this.refs.toast.show('Restaurant agregado',150, ()=>{
                                    this.props.navigation.goBack();    
                                });
                            })
                             .catch(()=>{
                                this.refs.toast.show("Error de servidor, intentelo más tarde")
                                this.setState({loading:false});
                            });
                        })
                        .catch(()=>{
                            
                            this.refs.toast.show("Error de servidor, intente nuevamente")
                            this.setState({loading:false});
                        });
            }) 
            .catch(()=>{
                this.refs.toast.show('Error en el servidor');
                this.setState({loading:false});
            });
        }else{
            this.refs.toast.show('Tienes que rellenar todos los campos')
        }
     
    };   
        
    render(){

        const {imageUriRestaurant,loading}=this.state
        return(
            <View style={styles.viewBody}>
                <View style={styles.viewPhoto}>
                   {this.isImageRestaurant(imageUriRestaurant)}
                </View>
                    <View style={styles.formRestaurant}>
                    <Form
                        ref="addRestaurantForm"
                        type={AddRestaurantStruct}
                        options={AddRestaurantOptions}
                        value={this.state.formData}
                        onChange={formValue=>this.onChangeFormAddRestaurant(formValue)}/>
                </View>
                <View style={styles.viewIconCamera}>
                    <Icon 
                        name="camera"
                        type="material-community"
                        color="#7a7a7a"
                        iconStyle={styles.addPhotoIcon}
                        onPress={()=>this.uploadImage()}/>    
                </View>
                <View style={styles.viewBtnAddRest}>
                    <Button
                        title="Añadir nuevo restaurante"
                        onPress={()=>this.addRestaurant()}
                        buttonStyle={styles.btnAddRestaurant}/>
                </View>
                <Toast
                    ref="toast"
                    position="bottom"
                    positionValue={320}
                    fadeInDuration={1000}
                    opacity={0.8}
                    textStyle={{color:"#fff"}}/>
                <View>
                    <Overlay overlayStyle={styles.overlayLoading} isVisible={loading} width="auto" height="auto">
                        <View>
                            <Text style={styles.overlayLoadingText}>Creando restaurante</Text>
                            <ActivityIndicator size="large" color="#00a680"/>
                        </View>
                    </Overlay>
                </View>
                               
            </View>
        )
    }

}
const styles = StyleSheet.create({
    viewBody:{
        flex:1, 
        height:'100%'
        
    },
    viewPhoto:{
        alignItems:"center",
        height:100,
        marginBottom:20
    },
    formRestaurant:{
        marginTop:10,
        width:'95%'
    },

    viewIconCamera:{
        flex :1,
        alignItems:"flex-start",
        marginLeft:12
    },
    addPhotoIcon:{
        backgroundColor:"#e3e3e3",
        padding:17,
        paddingBottom:14,
        margin:0
    },
    viewBtnAddRest:{
        flex:1,
        justifyContent:"flex-end",
    },
    btnAddRestaurant:{
        backgroundColor:"#00a680",
        margin:20,
        width:"60%"
    },
    overlayLoading:{
        padding:20,

    },
    overlayLoadingText:{
        color:"#00a680",
        marginBottom:20,
        fontSize:20,
    }
})