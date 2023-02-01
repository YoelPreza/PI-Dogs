import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { getDogDetail } from "../../Redux/actions";
import style from "../DogDetail/DogDetail.module.css"
import loading from "../../img/loading.png"
import { Link } from "react-router-dom";



const DogDetail = (props) =>{
// console.log(props)
const dispatch = useDispatch();
const dogDetail = useSelector((state)=>state.dogDetail)

useEffect(()=>{
    dispatch(getDogDetail(props.match.params.id))
},[dispatch, props.match.params.id])
// console.log(dogDetail)

    return (
       
        <div className={style.cardDetailCon}>
             {dogDetail.length===0?(
                <div><img className={style.loading} src={loading} alt='loading' /></div>):
<div>
            {dogDetail.map(d=>{
                return(
                    <div className={style.cardDetail} key={d.id}>
                    <h2 className={style.letra}> More about {d.name}  </h2>
                
                    <img className={style.imgDetail} src= {d.image} alt="img" />
                    <p className={style.letra}> Weight:  {d.weightMin} - {d.weightMax} kgs. </p>
                    <p className={style.letra}> Height:  {d.heightMin} - {d.heightMax} cm. </p>
                    <p className={style.letra}> Life Span:  {d.life_span_min} - {d.life_span_max} years </p>
                    <p className={style.letra}> Temperament: {d.temperament.map(t=>{return t + ", "})} </p>
                    <Link to="/home"> <button>Home</button> </Link> 
                    </div>
                )})}
             
            </div>
                
             }

            

        </div>
    )
}
export default DogDetail;