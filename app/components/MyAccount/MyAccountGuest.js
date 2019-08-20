import React from "react";
import {Text,View,ActivityIndicator,StyleSheet} from "react-native";
import{Button,Image} from "react-native-elements"

export default class MyAccountGuest extends Component{

            constructor(props) {
            super(props)
        
           
        }
        
    

    render (){

        const{goToScreen}=this.props
        return(
            <View style={styles.viewBody}>
                <Image
                    source={require("../../../assets/img/5fork.jpeg")}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator/>}
                    resizeMode="contain"/>
                <Text style={styles.title}>Consulta tu perfil de 5 tenedores</Text>
                <Text style={styles.description}>
                    ¿Cómo describirías tu mejor restaurante? Busca y ve  los mejores restaurantes de una forma sencilla, vota  cuál te ha gustado más y comenta como ha sido tu experiencia.
                </Text>
                <Button
                    buttonStyle={styles.btnViewProfile}
                    onPress={()=>goToScreen("Login")}/>
            
            </View>
        );
    }
}
const styles=StyleSheet.create({
viewBody:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    paddingLeft:25,
    paddingRight:25
},
image:{
    height:300,
    marginBottom:40,
},
title:{
    fontWeight:"bold",
    fontSize:19,
    marginBottom:10

},
description:{
    textAlign:"center",
    marginBottom:20
},
btnViewProfile:{
        width:"100%",
        backgroundColor:"#00a680"
}

});