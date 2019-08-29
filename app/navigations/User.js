import React from 'react';
import {createBottomTabNavigator,createAppContainer,createStackNavigator}from 'react-navigation';
import {Icon} from "react-native-elements"
//Screens

import MenuDiaScreen from "../screens/MenuDia";
import CartaScreen from "../screens/Carta";
import MyAccountScreen from "../screens/MyAccount/MyAccount"
import RegisterScreen from "../screens/MyAccount/Register";
import LoginScreen from "../screens/MyAccount/Login";

//Restaurant screen

import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurant'

const restaurantsScreenStack =createStackNavigator({
    Restaurants:{
        screen:RestaurantsScreen,
        navigationOptions:({navigation})=>({
            title:"Home",
                
        })
    },
    AddRestaurant:{
        screen:AddRestaurantScreen,
        navigationOptions:({navigation})=>({
            title:"Nuevo Restaurante"
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
    Restaurants:{
        screen:restaurantsScreenStack,
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
            tabBarLabel:'Carta',
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
     initialRouteName:"Restaurants",
     tabBarOptions:{
        inactiveTintColor:"#646464",
        activeTintColor:"#00a680"
     }
 }
);

export default createAppContainer (RootStack);