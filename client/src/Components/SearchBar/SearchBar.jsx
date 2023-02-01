import {useDispatch} from "react-redux"
import {getDogName} from "../../Redux/actions"
import {useState } from "react";


const SearchBar = ()=>{

    const [breed, setBreed] = useState("");
    const dispatch = useDispatch();

    const handlerSubmit =(event)=>{
        event.preventDefault()
        if(!breed){
            return alert("Type a Breed")
        }else{dispatch(getDogName(breed));
            setBreed("")
        }   
}

    const changeHandler=(event)=>{
        event.preventDefault()
        setBreed(event.target.value) 
    };

    return(
        <>
        <form onSubmit={handlerSubmit}> 

        <input 
        type="text"
        placeholder="Search Breed"
        onChange={changeHandler} 
        value={breed}/>
        <button type="submit">Search</button>

        </form>
        </>
    )
}
export default SearchBar;