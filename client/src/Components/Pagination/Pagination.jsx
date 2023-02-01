//--------Discomment if you want to use pagination number----------//
//------------------------[1]-[2]-[3]-[4]-[5]-[6]-7...------------------------//

// import style from "../Pagination/Pagination.module.css"
// import { useState } from "react";

// se crea la funcion y se le pasan los parametros que van a ir en cards
// const Pagination = ({dogsPerPage, dogs, pagination, currentPage })=>{
// const pageNumbers =[];

// for(let i = 1; i <= Math.ceil(dogs/dogsPerPage); i++ ){
//     pageNumbers.push(i)
// }
//     return(
//         <nav>
//             <ul className={style.pages}>
//                 {pageNumbers&&
//                 pageNumbers.map(number=>(
//                 <li key={number}>
//                     <div className={currentPage===number? style.numPage__active: style.numPage} onClick={()=>pagination(number)}>{number} </div>
//                 </li>
//             ))}</ul>
//        </nav>
//     )
// }

// export default Pagination;