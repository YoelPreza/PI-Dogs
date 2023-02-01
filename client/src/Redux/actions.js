import axios from "axios";
export const GET_DOGS = "GET_DOGS"
export const GET_DOG_DETAIL = "GET_DOG_DETAIL"
export const GET_DOG_NAME = "GET_DOG_NAME"
export const GET_TEMPERAMENTS  = "GET_TEMPERAMENTS"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const DOGS_SOURCE_FILTER = "DOGS_SOURCE_FILTER"
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT"


// el thunkMidleware agarra esta funcion, la ejecuta. hace el dispatch...
export const getDogs = () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/dogs");
     // CON ASYNC AWAIT FORZAMOS UNA ESPERA EN LA FUNCION 
     // CON LAS PROMESAS NO SABEMOS CUANDO SE VA A RESOLVER  
        const dogs = apiData.data;
        dispatch({ type: GET_DOGS, payload: dogs });//... este info va al reducer
    };
};
export const getDogName = (name)=>{
    return async function (dispatch){
        const apiData = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        const dogName = apiData.data;
        dispatch({type: GET_DOG_NAME, payload: dogName});
    }
}

export const getDogDetail = (id)=>{
    return async function (dispatch){
        const apiData = await axios.get(`http://localhost:3001/dogs/${id}`)
        const dogDetail = apiData.data;
        dispatch({type:GET_DOG_DETAIL, payload:dogDetail})
    };
};

export const getTemperaments = () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/temperaments")
        const dogTemperament = apiData.data.map(el => el.name);
        dispatch({ type: GET_TEMPERAMENTS, payload: dogTemperament })
        // console.log(dogTemperament)
    }
};

export const orderByName=(payload)=>{
    return{
        type: ORDER_BY_NAME, payload
    }
};

export const dogsSourceFilter=(payload)=>{
    return{
        type: DOGS_SOURCE_FILTER, payload
    }
}

export const orderByWeight=(payload)=>{
    return{
        type: ORDER_BY_WEIGHT, payload
    }
}

export const filterByTemperament = (payload)=>{
    return{
        type: FILTER_BY_TEMPERAMENT, payload
    }
}

