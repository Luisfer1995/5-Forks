import t from 'tcomb-form-native';
import inputTemplate from "./templates/Input";
import textAreaTemplate from "./templates/Textarea"

export const AddRestaurantStruct = t.struct({
    name: t.String,
    city:t.String,
    address:t.String,
    description:t.String
});
export const AddRestaurantOptions = {
    fields:{
        name:{
            template:inputTemplate,
            config:{
                placeholder:"Nombre del restaurante",
                iconType:"material-community",
                iconName:"silverware"
            }
        },
        city:{
            template:inputTemplate,
            config:{
                placeholder:"Ciudad del Restaurante",
                iconType:"material-community",
                iconName:"city"
            }
        },
        address:{
            template:inputTemplate,
            config:{
                placeholder:"Dirección del restaurante",
                iconType:"material-community",
                iconName:"map-marker"
            }
        },
        description:{
            template:textAreaTemplate,
            config:{
                placeholder:"Descripción del restaurante",
            }
        },
    }
}