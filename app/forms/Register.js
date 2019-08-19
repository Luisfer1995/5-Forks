import React from 'react';
import t from 'tcomb-form-native';
import formValidation from "../utils/Validation";
import inputTemplate from "./templates/Input";

export const RegisterStruct = t.struct({
    name:t.String,
    email:formValidation.email,
    password:formValidation.password,
    passwordConfirmation:formValidation.password
});
export const RegisterOptions ={
    fields:{
        name:{
           
            template:inputTemplate,
            config:{
                placeholder:"Escribe nombre completo",
                iconName:"account-outline",
                iconType:"material-community"
            }
        },
        email:{
            template:inputTemplate,
            config:{
                placeholder:"Escribe correo electrònico",
                iconName:"at",
                iconType:"material-community",
            }
            
        },
        password:{
            template:inputTemplate,
            config:{
                placeholder:"Escribe tu contraseña",
                iconName:"lock-outline",
                iconType:"material-community",
                password:true,
                secureTextEntry:true,
            }
        },
        passwordConfirmation:{
            template:inputTemplate,
            config:{
                placeholder:"Repite tu contraseña",
                iconName:"lock-reset",
                iconType:"material-community",
                password:true,
                secureTextEntry:true,
            }
        }
    }
}