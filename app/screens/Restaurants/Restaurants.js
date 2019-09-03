import React, {Component} from "react"
import {StyleSheet,View,Text,FlatList,ActivityIndicator} from "react-native";
import ActionButton from 'react-native-action-button';
 import {Image} from "react-native-elements"
import {firebaseapp} from '../../utils/FireBase';
import firebase from "firebase/app";
import "firebase/firestore";




const db= firebase.firestore(firebaseapp);

export default class Restaurants extends Component {

        constructor(){
            super();

            this.state={
                login:false,
                restaurants:null,
                startRestaurants:null,
                limitRestaurants:8,
                isLoading:true
            };
        }

    componentDidMount(){
        this.checkLogin();
        this.loadRestaurant();
    }   
    checkLogin=()=>{
        firebase.auth().onAuthStateChanged(user=>{
            if (user){
                this.setState({
                    login:true
                })
                
            }else{
                this.setState({
                    login:false
                });
            }
        });
    } ;

    goToScreen = nameScreen =>{
        this.props.navigation.navigate(nameScreen);
    };

    loadActionBtn=()=>{
        const{login}=this.state
        if(login){
            return(
            <ActionButton 
                 buttonColor="#00a680"
                 onPress={()=>this.goToScreen("AddRestaurant")}/>
                 )
        }
        return null
    };

    loadRestaurant = async ()=>{
        const {limitRestaurants} =this.state;
        let resultRestaurants = [],
             restaurants = db
            .collection("restaurants")
            .orderBy("createAt","desc")
            .limit(limitRestaurants);

            await restaurants.get().then(response=>{
                this.setState({
                    startRestaurants:response.docs[response.docs.length - 1]
                });

                response.forEach(doc=>{
                    let restaurant = doc.data();
                    restaurant.id = doc.id;

                    resultRestaurants.push({restaurant})
                }) ; 
                this.setState({
                    restaurants:resultRestaurants
                })
            });
            
    };

    renderRow = restaurants=>{
        const {name, city, address, description, image} = restaurants.item.restaurant;
  
        return(
            <View style={styles.viewRestaurant}>
                <Text>
                    {name}
                </Text>

            </View>
        );
    }

    renderFlatList= restaurants=>{
       
     
        if(restaurants){
            return(
               <FlatList
                    data={this.state.restaurants}
                    renderItem={this.renderRow}
                    keyExtractor={(item,index)=>index.toString()}/>
            ) ;
        }else{
            return(
                <View style={styles.startLoadRestaurant}>
                    <ActivityIndicator size="large"/>
                    <Text> Cargando restaurantes</Text>
                </View>
            )
        }
    };


    render (){

        const {restaurants}=this.state

        return(
            <View style={styles.viewBody}>
                {this.renderFlatList(restaurants)}
                 {this.loadActionBtn()}
                
            </View>
        );
    }
}
const styles= StyleSheet.create({
    viewBody:{
        flex:1,
        

      
      },
      startLoadRestaurant:{
          marginTop: 20,
          alignItems: 'center',
      },
      viewRestaurant:{
      flexDirection: 'row',
      margin:10
    }
    });
