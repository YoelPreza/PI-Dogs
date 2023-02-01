import {
	GET_DOGS, GET_DOG_NAME, GET_DOG_DETAIL, GET_TEMPERAMENTS, ORDER_BY_NAME,
	DOGS_SOURCE_FILTER, ORDER_BY_WEIGHT,  FILTER_BY_TEMPERAMENT
} from "./actions";


const initialState = {
	dogs: [],
	dogDetail: [],
	temperament: [],
	sameDogs: []
}
//...Reducer recive la action, evalua el action.type 
const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DOGS://... ve que es GET_DOGS, crdea un estado nuevo igual al estado anterior... 
			return {
				...state,
				sameDogs: action.payload,
				dogs: action.payload,
				//  allDogs: action.payload,
			}//... mas la modificacion del action.payload

		case GET_DOG_NAME:
			return {
				...state,
				dogs: action.payload
			}

		case GET_DOG_DETAIL:
			return { ...state, dogDetail: action.payload }

		case GET_TEMPERAMENTS:
			return { ...state, temperament: action.payload }

		case ORDER_BY_NAME:
			const orderNames = action.payload === "asc" ?
				[...state.dogs].sort(function (a, b) {
					if (a.name > b.name) { return 1 }
					if (b.name > a.name) { return -1 }
					return 0;
				}) :
				[...state.dogs].sort(function (a, b) {
					if (a.name > b.name) { return -1 }
					if (b.name > a.name) { return 1 }
					return 0;
				})
			return {
				...state,
				dogs: orderNames
			}

		case DOGS_SOURCE_FILTER:
			
			let allDogs = [...state.sameDogs]
			let aux;
			// console.log(allDogs)
			if (action.payload === "All Dogs") return { ...state, dogs: allDogs }
			if (action.payload === "created") {
				aux = allDogs.filter(el => el.createdInDb === true)
			}
			if (action.payload === "api") {
				aux = allDogs.filter(el => !el.createdInDb)
			}
			return {
				...state,
				dogs: aux
			}

			case ORDER_BY_WEIGHT:

			const orderByWeight = action.payload === "asc" ?
				[...state.dogs].sort(function (a, b) {
					return b.weightMin - a.weightMin
					// if (a.weightMin > b.weightMin) { return 1 }
					// if (b.weightMin > a.weightMin) { return -1 }
					// return 0;
				}) :
				[...state.dogs].sort(function (a, b) {	
					return a.weightMin - b.weightMin		
					// if (a.weightMin > b.weightMin) { return -1 }
					// if (b.weightMin > a.weightMin) { return 1 }
					// return 0;
				})
			return {
				...state,
				dogs: orderByWeight
			}

			case FILTER_BY_TEMPERAMENT:
				let allTemps = [...state.sameDogs]
				// console.log(allTemps)
				let filtro = allTemps.filter(el => el.temperament.includes(action.payload))
				let aux3 = action.payload === "All Temperaments" ? allTemps : filtro
				//  console.log(filtro, "Este es el filtro")
				 return{
					...state,
					dogs: aux3
				 }
				

		default:
			return { ...state }

	};
};

export default rootReducer;

