import { Link } from "react-router-dom";
import landing from "../../img/landing1.png"
import style from ".././LandingPage/LandinPage.module.css"
const LandingPage = ( ) =>{
    return (
        <div className={style.landCont}>
            
            <h1>Welcome to Lomitos World </h1>

            <div><img className={style.landing} src={landing} alt='landing' /></div>
           <Link to="/home"><button className={style.boton}> Watch Lomitos </button></Link>
          

           <footer className={style.footer}> Made with ❤️ by Yoel Preza </footer>
        </div>
    )
}
export default LandingPage;