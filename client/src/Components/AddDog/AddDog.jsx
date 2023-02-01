import axios from "axios";
import { useState, useEffect } from "react";
import { getTemperaments } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import validate from "./Validations"
import { Link } from "react-router-dom";
import style from "../AddDog/AddDog.module.css"



const AddDog = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperament).sort(
        // --------default is asc-----------//
        // function (a, b) { if (a < b) return -1; else return 1;
        //------desc-----//
        // if (a < b) { return 1;} if (a > b) { return -1;} return 0;}
    ); // console.log(temperaments)

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch])
    // Los efectos secundarios son acciones que se  realizan después de que un componente se haya renderizado

    const [input, setInput] = useState({
        name: "",
        image: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span_min: "",
        life_span_max: "",
        temperament: [],
    }
);

const [errors, setErrors] = useState({})



const changeHandler =(event)=>{
    const property = event.target.name;
    const value = event.target.value;
    
    setErrors (validate({...input, [property]:value}))
    // se pone la misma informacion porque el cambio de estado tiene una demora y asi se arregla la validacion
    setInput({...input, [property]:value}) 
    // hace que la info del imput se vaya al estado y esten conectados

    
};

const handlerSelectTemperament = (event)=>{
    setErrors (validate({...input,
        temperament:[...input.temperament, event.target.value]}))
    setInput({
        ...input,
        temperament:[...input.temperament, event.target.value],

    });
  
};

const handlerDelete = (el)=> {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  };

const submitHandler=(event)=>{
    event.preventDefault()
    axios.post('http://localhost:3001/dogs',input)
    .then(res=>alert("New Breed Created"))
    // console.log(input)
};


return (
    <div className={style.mainCont}>
            <Link to="/home"> <button>  ⪡ Back Home</button> </Link> 
<h4> Please, insert the values in metric system for example centimeters and kilograms</h4>

    <form className={style.cont} onSubmit={submitHandler}>


            <div>
                <label className={style.level} >Name: </label>
                <input type="text" value={input.name} onChange={changeHandler} name="name"
                placeholder="Type the breed name."/>        

            <p className={style.errors}>{errors.name}</p>
            </div>


            <div>
                <label className={style.level} >Weight Min: </label>
                <input type="text" value={input.weightMin} onChange={changeHandler} name="weightMin"
                placeholder="Type the Weight in kgs."/>
                <p className={style.errors}>{errors.weightMin}</p>

            </div>

            <div>
                <label className={style.level} >Weight Max: </label>
                <input type="text" value={input.weightMax} onChange={changeHandler} name="weightMax"
                 placeholder="Type the Weight in kgs. "/>
                <p className={style.errors}>{errors.weightMax}</p>

            </div>

            <div>
                <label className={style.level} >Height Min: </label>
                <input type="text" value={input.heightMin} onChange={changeHandler} name="heightMin"
                 placeholder="Type the Height in cm."/>
                <p className={style.errors}>{errors.heightMin}</p>

            </div>

            <div>
                <label className={style.level} >Height Max: </label>
                <input type="text" value={input.heightMax} onChange={changeHandler} name="heightMax"
                placeholder="Type the Height in cm."/>
                <p className={style.errors}>{errors.heightMax}</p>

            </div>

            <div>
                <label className={style.level} >Life Span Min: </label>
                <input type="text" value={input.life_span_min} onChange={changeHandler} name="life_span_min"
                placeholder="Type life span in years."/>
                <p className={style.errors}>{errors.life_span_min}</p>

            </div>

            <div>
                <label className={style.level} >Life Span Max: </label>
                <input type="text" value={input.life_span_max} onChange={changeHandler} name="life_span_max"
                placeholder="Type life span in years."/>
                <p className={style.errors}>{errors.life_span_max}</p>

            </div>

            <div>
                <label className={style.level} >Image Url: </label>
                <input type="text" value={input.image} onChange={changeHandler} name="image"
                placeholder="type the url image"/>
                <p className={style.errors}>{errors.image}</p>

            </div>

            <div >
                <label className={style.level} >Temperaments: </label>
                <select onChange={handlerSelectTemperament} name="Select" id=""> 
                    {temperaments.map((temp)=> {
                        return (
                    <option key={temp} name={temp}> 
                    {temp}
                    </option>
                    );
                })}
                </select>
                <p className={style.errors}>{errors.temperament}</p>


                <div>
                <h4>Temperaments selected:</h4>
                {input.temperament.map((el) => (
                  <div key={el}>
                    <span>{el}</span>
                    <button onClick={() => handlerDelete(el)}> x </button>
                  </div>
                ))}
              </div>
            </div>


            <button type="submit" disabled={Object.keys(errors).length > 0}> 🐶 CREATE NEW LOMITO 🐶</button>
        </form>
        
        </div>
    )
}
export default AddDog;