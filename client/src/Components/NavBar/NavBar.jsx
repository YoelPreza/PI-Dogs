import { Link } from "react-router-dom";
import style from "../NavBar/NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ( ) =>{
    return (
        <div className={style.mainContainer}>
           
            <Link className={style.letra} to="/addDog">Create Dog</Link>
          

            <SearchBar />
            
        </div>
    )
}
export default NavBar;