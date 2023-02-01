import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import Card from "../Card/Card"
//--------Discomment if you want to use pagination number----------//
// import Pagination from "../Pagination/Pagination";
import { getDogs } from "../../Redux/actions"
import style from "../CardsContainer/CardsContainer.module.css"


const CardsContainer = ()=>{

    const dispatch = useDispatch();

    const dogs = useSelector(state=>state.dogs)
    const [currentPage, setCurrentPage]=useState(1);
    const [dogsPerPage]=useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;

    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
//--------Discomment if you want to use pagination number----------//
    // const pagination =(pageNumber)=>{ 
    //     setCurrentPage(pageNumber)
    // };
    
    useEffect(()=>{
        dispatch(getDogs());// hace dispacth y se ejecuta el action creator
    },[dispatch])// ARRAY DE DEPENDENCIAS
    
     // Se hace el map de el array de los perros y 
    // por cada perro se renderiza un componente Card 


//--------Pagination with Next and Previous------////
    let allpages = Math.ceil(dogs.length/8)
    // console.log(allpages)
    
    const handleNext = () => {
        if (currentPage < allpages) {
          setCurrentPage(currentPage + 1);
        }
      };
      
      const handlePrev = () => {
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1);
        }
      };
      
    return(
        <>

        <div className={style.container}>
            
        {currentDogs.map((d)=>{
            return <Card 
            key={d.id}
            id={d.id}
            img={d.image}
            name={d.name}
            weightMin={d.weightMin}
            weightMax={d.weightMax}
            temperament={d.temperament}
            />
        })}

        </div>
        {/* <Pagination 
        dogsPerPage={dogsPerPage}
        dogs={dogs.length}
        // pagination={pagination}
        // currentPage={currentPage}
        />
        <div className={style.pagination}></div> */}
   <div className={style.pagination}>
          <button className={style.button} onClick={handlePrev}> ⪡ Previous Page</button>
          <span className={style.numberOf}>   <span className={style.p}>{currentPage}</span>  of  <span className={style.p}>{allpages}</span>   </span>
          <button className={style.button} onClick={handleNext}> Next Page ⪢ </button>
        </div>
        </>
    )
}
export default CardsContainer;