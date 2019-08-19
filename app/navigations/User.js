import React from 'react';
import {createBottomTabNavigator,createAppContainer,createStackNavigator}from 'react-navigation';
import {Icon} from "react-native-elements"
//Screens
import HomeScreen from "../screens/Home";
import MenuDiaScreen from "../screens/MenuDia";
import CartaScreen from "../screens/Carta";
import MyAccountScreen from "../screens/MyAccount/MyAccount"
import RegisterScreen from "../screens/MyAccount/Register";
import LoginScreen from "../screens/MyAccount/Login";

const homeScreenStack =createStackNavigator({
    Home:{
        screen:HomeScreen,
        navigationOptions:({navigation})=>({
            title:"             Inicio",
                
        })
    }
});
const menuDiaScreenStack = createStackNavigator ({
    MenuDia:{
        screen:MenuDiaScreen,
        navigationOptions:({navigation})=>({
            title:"Escoge tu plato!"
        })
    }
});

const cartaScreenStack = createStackNavigator ({
    Carta:{
        screen:CartaScreen,
        navigationOptions:({navigation})=>({
            title:"Mira nuestras especialidades!"
        })
    }
});     

const myAccountScreenStack =createStackNavigator({
    MyAccount:{
        screen:MyAccountScreen,
        navigationOptions:({navigation})=>({
            title:"Mi cuenta"
        })
    },
    Register:{
        screen:RegisterScreen,
        navigationOptions:({navigation})=>({
            title:"Registrar Usuario"
        })
    },
    Login:{
        screen:LoginScreen,
        navigationOptions:({navigation})=>({
            title: "Log In"
        })
        
    }

});

const RootStack = createBottomTabNavigator ({
    Home:{
        screen:homeScreenStack,
        navigationOptions:({navigation})=>({
            tabBarLabel:"Home", //Cambia el label de la zona inferior
            tabBarIcon:({tintColor})=> (
                <Icon
                    name='compass-outline'
                    type='material-community'
                    size={25}
                    color={tintColor}/>
            )
        })
    },
    MenuDia:{
        screen:menuDiaScreenStack,
        navigationOptions:({navigation})=>({
            tabBarLabel:'Menu de Hoy',
            tabBarIcon:({tintColor})=>(
                <Icon 
                    name='star-outline'
                    type='material-community'
                    size={25}
                    color={tintColor}  />
        
            )
        })
    },
    Carta:{
        screen:cartaScreenStack,
        navigationOptions:({navigation})=>({
            tabBarLabel:'Especialidades de la Casa',
            tabBarIcon:({tintColor})=>(
                <Icon 
                    name='home-outline'
                    type='material-community'
                    size={25}
                    color={tintColor}  />
        
            )
        })
    },
    MyAccount:{
        screen:myAccountScreenStack,
        navigationOptions:({navigation})=>({
            tabBarLabel:'Perfil',
            tabBarIcon:({tintColor})=>(
                <Icon
                   name="magnify"
                   type="material-community"
                   size={25}
                   color={tintColor} />
            )
        })
    }
 },
 {  
     //order:[],
     initialRouteName:"MyAccount",
     tabBarOptions:{
        inactiveTintColor:"#646464",
        activeTintColor:"#00a680"
     }
 }
);

export default createAppContainer (RootStack);