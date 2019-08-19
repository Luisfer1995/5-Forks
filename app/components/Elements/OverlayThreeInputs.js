import React,{Component} from 'react';
import{StyleSheet,View, Text} from 'react-native';
import {Overlay,Input,Button,Icon} from 'react-native-elements';


export default class OverlayThreeInputs extends Component {
    constructor (props){
        super(props);

        this.state={
            ...props
        }
        
    }
    onChangeInputOne  = inputData =>{
        this.setState({
            inputValueOne:inputData
        });
    };
    onChangeInputTwo  = inputData =>{
        this.setState({
            inputValueTwo:inputData
        });
    };
    onChangeInputThree  = inputData =>{
        this.setState({
            inputValueThree:inputData
        });
    };

    update=()=>{
        const newValueOne = this.state.inputValueOne;
        const newValueTwo = this.state.inputValueTwo;
        const newValueThree = this.state.inputValueThree;
        this.state.updateFunction(newValueOne,newValueTwo,newValueThree)
        this.setState({isVisibleOverlay:false});
    };

    close=()=>{
        this.setState({isVisibleOverlay:false});
        this.state.updateFunction(null)
    }

    render (){

        const {isVisibleOverlay, placeholderOne,placeholderTwo,placeholderThree, inputValueOne, inputValueTwo,inputValueThree,isPassword}=this.state;

        return (
            <Overlay
                isVisible={isVisibleOverlay}
                overlayBackgroundColor="transparent"
                overlayStyle={styles.overlayStyle}>
                    <View style={styles.viewOverlay}>
                        <Input containerStyle={styles.inputContainer}
                                placeholder={placeholderOne}
                                onChangetext={value=>this.onChangeInputOne(value)}
                                value={inputValueOne}
                                password={isPassword}
                                secureTextEntry={isPassword}
                                />
                        <Input containerStyle={styles.inputContainer}
                                placeholder={placeholderTwo}
                                onChangetext={value=>this.onChangeInputTwo(value)}
                                value={inputValueTwo}
                                password={isPassword}
                                secureTextEntry={isPassword}
                                />    
                          <Input containerStyle={styles.inputContainer}
                                placeholder={placeholderThree}
                                onChangetext={value=>this.onChangeInputThree(value)}
                                value={inputValueThree}
                                password={isPassword}
                                secureTextEntry={isPassword}
                                />             
                        <Button title="Actualiza contraseña"
                                buttonStyle={styles.buttonUpdate}
                                onPress={()=>this.update()}/>
                        <Icon 
                            type="material-community"
                            name="close-circle-outline"
                            containerStyle={styles.ctnIconClose}
                            size={30}
                            onPress={()=>this.close()}/>
                    </View>
           </Overlay>
                
        )
    }
}
const styles=StyleSheet.create({
    overlayStyle:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    viewOverlay:{
        width:"100%",
        backgroundColor:"#fff",
        padding:20,
        paddingColor:"#00a680",
        borderLeftWidth:2,
        borderRightWidth:2,
        borderTopWidth:2,
        borderBottomWidth:2,
    },
    inputContainer:{
        marginBottom:20
    },
    buttonUpdate:{
        backgroundColor:'#00a680'
    },
    ctnIconClose:{
        position:"absolute",
        right:5,
        top:3,
    }
})