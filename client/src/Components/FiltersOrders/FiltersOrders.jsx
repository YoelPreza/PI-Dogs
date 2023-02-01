// import {useSelector} from "react";
import {useDispatch, useSelector} from "react-redux"
import { orderByName, dogsSourceFilter,orderByWeight, getTemperaments, filterByTemperament } from "../../Redux/actions";
import { useEffect } from "react";

const FiltersOrders =()=>{
const dispatch = useDispatch();
const allTemperaments = useSelector((state)=>state.temperament) 
// const dogs = useSelector((state)=>state.dogs)
// console.log(allTemperaments)
const handleClickOrder = (event)=> {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
  }
 const handleClickOrderWeight = (event)=> {
    event.preventDefault();
    dispatch(orderByWeight(event.target.value));
  }

  const handleClickFilterSource =(event)=>{
    dispatch(dogsSourceFilter(event.target.value));
  }

  useEffect(()=>{
      dispatch(getTemperaments())
  },[dispatch])

  const tempsOrder = allTemperaments.sort()
// console.log(tempsOrder)

    const handleClickFilterTemps =(event)=>{
        event.preventDefault();
        dispatch(filterByTemperament(event.target.value));
      }

  
    return(
        <div>
            {/* <h5>Order by name</h5> */}
            <select onChange={handleClickOrder}> 
                <option defaultValue value="all" hidden>Order by name</option>
                <option value="asc"> A - Z </option>
                <option value="desc"> Z - A </option>
            </select>

            <select onChange={handleClickOrderWeight}> 
                <option defaultValue value="all" hidden>Order by Weight</option>
                <option value="asc"> Heaviest 1st </option>
                <option value="desc"> Lightest 1st </option>
            </select>

            <select onChange={handleClickFilterSource}> 
                <option defaultValue value="all" hidden>Filter by source</option>
                <option value="All Dogs"> All Dogs </option>
                <option value="created"> Created </option>
                <option value="api"> Data Base </option>
            </select>

            <select onChange={handleClickFilterTemps}> 
               <option defaultValue value="all" hidden>Filter by Temperament</option>
                <option value="All Temperaments"> All Temperaments </option>
                {tempsOrder.map((temp)=>{
                    return(
                    <option key={temp} value={temp} > {temp} </option>)
                })}
            </select>
        </div>
    )
}

export default FiltersOrders