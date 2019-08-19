import t from 'tcomb-form-native';
export default (formValidaion = {
    email:t.refinement(t.String, value=>{
        return/@/.test(value);
    }),
    password:t.refinement(t.String,value =>{
        return value.length >= 6;
    })
});
