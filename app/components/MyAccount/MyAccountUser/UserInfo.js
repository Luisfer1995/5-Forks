import  React, { Component } from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Avatar,Button} from 'react-native-elements';
import* as firebase from 'firebase';
import Toast,{DURATION} from 'react-native-easy-toast'
import UpdateUserInfo from './UpdateUserInfo'

import {Permissions,ImagePicker} from 'expo';





export default class UserInfo extends Component{
constructor(props) {
    super(props)
    this.state={
        ...props,
        userInfo:{}
    }
}
componentDidMount=async ()=>{
  await this.getUserInfo();
};
getUserInfo =()=>{
    const user = firebase.auth().currentUser;
    user.providerData.forEach(userInfo=>{
        this.setState({userInfo});
    });
};

reauthenticate=currentPassword=>{
    const user= firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
    );
    return user.reauthenticateWithCredential(credentials);
}

checkUserAvatar = photoURL =>{
    return photoURL ? photoURL : "https://api.adorable.io/avatars/155/abott@adorable.png"
};
updateUserName= async newDisplayName=>{
    const update = {
        displayName:newDisplayName
    }
    await firebase.auth().currentUser.updateProfile(update);
    this.getUserInfo();
};
updateUserEmail = async (newEmail,password)=>{
    this.reauthenticate(password).then(()=>{
         const user = firebase.auth().currentUser;
         user.updateEmail(newEmail).then(()=>{
             
             this.refs.Toast.show('Email actualizado, vuelve a iniciar sesión',70,
             ()=>{
                firebase.auth().signOut();
             });             
         }).catch(error=>{
            this.refs.Toast.show(error,1200)
         });
    }).catch(error=>{
        console.log('Tu contraseña no es correcta');
        this.refs.Toast.show('Tu contraseña no es válida',1200)
    });
};

updateUserPassword=async (currentPassword,newPassword)=>{
    this.reauthenticate(currentPassword).then(()=>{
        const user = firebase.auth().currentUser;

        user
        .updatePassword(newPassword)
        .then(()=>{
            this.refs.toast('Contraseña actualizada, vuelve a iniciar sesión',100,
            ()=>{
                firebase.auth().signOut()
            }
          );
        }).catch(()=>{
            this.refs.toast.show(
                "Error en el servidor, inténtelo más tarde",1500
            );
        });
    })
    .catch(()=>{
        this.refs.toast.show('La contraseña introducida no es correcta')
    });
    
};
returnUpdateUserInfoComponent=userInfoData=>{

    if(userInfoData.hasOwnPropery("uid")){
        return (
            <UpdateUserInfo 
                userInfo={this.state.userInfo} 
                updateUserName={this.updateUserName} 
                updateUserEmail={this.updateUserEmail}
                updateUserPassword={this.updateUserPassword} />
        )
    }
    
}

updateUserPhoto= async photoUri=>{
    const update = {
        photoURL:photoUri
    }
    await firebase.auth().currentUser.updateProfile(update);
    this.getUserInfo();
};

changeAvatarUser=async ()=>{
    const resultPermission = await Permissions.askAsync(Permissions.CAMARA_ROLL);

    if(resultPermission==="denied"){
        this.refs.Toast.show('Es necesario aceptar los permisos de la galería',1200);
    } else{
        const result= await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect:[4,3]
        }) ;
    
        if(result.cancelled){
            this.refs.Toast.show('Galería de imagenes cerrada',1200)
        }else{
            const {uid}=this.state.userInfo

            this.uploadImage(result.uri,uid)
                .then(resolve=>{
                    this.ref.toast.show("Avatar Actualizado");
                    firebase.storage().ref("avatar/"+ uid).getDownloadURL().then(resolve=>{
                        console.log(resolve);
                        this.updateUserPhoto(resolve)
                    }).catch(error=>{
                        this.refs.toast.show("Error al recuperar el avatar del servidor");
                    });
                }).catch(error=>{
                    this.refs.toast.show('Error al actualizar el avatar, intentélo más tarde.',1250)
                
                    
                })
        }
    }
};

uploadImage = async (uri,nameImage)=>{
    

    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.onerror=reject
        xhr.onreadystatechange= ()=>{
            if(xhr.readyState === 4){
                resolve(xhr.response);
            }  
        };

        xhr.open("GET", uri);
        xhr.responseType = "blob"; // permite sacar el contenido de la imagen para subir a firebase
        xhr.send();
    }).then(async resolve =>{
        let ref = firebase
            .storage()
            .ref()
            .child("avatar/"+nameImage);
        return await ref.put(resolve)
    }).catch(error=>{
        this.refs.toast.show('Error al subir la imagen al servidor, intentélo más tarde.',1500)
    });
};
    render(){
        const {displayName,email, photoURL} = this.state.userInfo;
        this.checkUserAvatar(photoURL);
        return(
            <View>
                <View style={styles.viewUserInfo}> 
                <Avatar
                    rounded
                    size="large"
                    showEditButton
                    onEditPress={()=>this.changeAvatarUser}
                    source={{uri:this.checkUserAvatar(photoURL) }}
                    containerStyle={styles.userAvatar}/> 
                   <View> 
                    <Text style={styles.displayName}>{displayName}</Text>
                    <Text>{email}</Text>
                    </View>

                </View>
                {this.returnUpdateUserInfoComponent(this.state.userInfo)}
                <Button
                    title="Cerrar Sesión"
                    onPress={()=>firebase.auth().signOut()}
                    buttonStyle={styles.btnCloseSession}
                    titleStyle={styles.btcCloseSessionText}/>
            
                <Toast 
                    ref='toast'
                    position="bottom"
                    positionValue={250}
                    fadeInDuration={850}
                    fadeOutDuration={850} 
                    opacity={0.8}
                    textStyle={{color:"#fff"}}>
                </Toast>
            </View>
            
        );
    }
}

const styles=StyleSheet.create({
    viewUserInfo:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:"row",
        paddingTop:30,
        paddingBottom:30,
        backgrodunColor:"#f2f2f2"
    },
    userAvatar:{
        marginRight:20,
    },
    displayName:{
        fontWeight:'bold',
        marginTop: 8,
    },
    btnCloseSession:{
        marginTop:30,
        borderRadius: 0,
        backgroundColor:"#fff",
        borderColor:"#e3e3e3",
        borderWidth:2,
        width:"60%",
        alignItems:"center", 
        paddingTop:13,
        paddingBottom:13   

    },
    btcCloseSessionText:{
        color:"#00a680"
    }

})