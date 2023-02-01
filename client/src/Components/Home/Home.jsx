import CardsContainer from "../CardsContainer/CardsContainer";
import style from  "../Home/Home.module.css";
import FiltersOrders from "../FiltersOrders/FiltersOrders";
// cuando Home se monta que haga el dispatch 
const Home =()=>{

    return(
        <>

            <h1 className={style.titulo}> Lomitos Breeds </h1>
            <FiltersOrders />
            <CardsContainer />
            <footer className={style.footer}> Made with ❤️ by Yoel Preza </footer>
        </>
    )
}
export default Home;