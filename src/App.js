// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import RestaurantDetails from './components/Details/RestaurantDetails';
import Filter from './components/Filter/Filter';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/details/:rName" element={<RestaurantDetails/>}/>
        <Route path="/filter/:mealType" element={<Filter/>} />

       
      </Routes>
       
    </div>
  );
}

export default App;
