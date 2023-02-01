import style from "../Card/Card.module.css"
import { Link } from "react-router-dom"

const Card = (props)=>{
    // este componente me va a trate la info de dogs mapeada y un link para el detalle
    return(
        <div className={style.card}>
        <Link to={`/dogdetail/${props.id}`}>
          <img className={style.imagen} src= {props.img} alt="img" />
          </Link>
             
           <p className={style.font}> Breed: {props.name}  </p>
           <p className={style.font}> Weight Min: {props.weightMin} kgs. </p>
           <p className={style.font}> Weight Max: {props.weightMax} kgs. </p>
           <p className={style.font}> Temperament: {props.temperament.map((t) => { return t + ", " })} </p>
{/* // quitar esto del map para ver como funciona con la api y db */}
        </div>
    )
}

export default Card;