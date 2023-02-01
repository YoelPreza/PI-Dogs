import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import AddDog from "./Components/AddDog/AddDog";
import DogDetail from "./Components/DogDetail/DogDetail";
import NavBar from "./Components/NavBar/NavBar";
import { Route, useLocation } from "react-router-dom";
import './App.css';


function App() {
  // useLocation es un hook que sirve para condicionar donde aparece la nav, 
  // pathname guarda la direccion "/"

  const location = useLocation(); 
  return (
    <div className="App">
    {location.pathname === "/home"  && <NavBar />}
    {/* // "&&" es un operador lógico, se utiliza para evaluar dos expresiones
    //si la ruta actual no es la raiz, entonces se renderizará el componente <NavBar />. */}
    <Route path exact="/" component ={ LandingPage } />
     <Route path="/home" component ={ Home } />  
     <Route path="/dogdetail/:id" component ={ DogDetail } />  
     <Route path="/addDog" component ={ AddDog } />  

     {/*con render le puedes pasar props */}
     {/* <Route path="/home" render ={() => <Home /> } />   */}
     
    </div>
  );
}

export default App;
