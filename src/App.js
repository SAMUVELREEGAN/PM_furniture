import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import MyLayout from './Layouts/MyLayout';
import Products from './Pages/Products';
import ProductDetails from './components/ProductDetails';
import CategoryProduct from './components/CategoryProduct';
import ComparePage from './components/ComparePage';
import Wishlist from './components/Wishlist';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MyLayout />}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/product' element={<Products />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/product/:id' element={<ProductDetails />}></Route>
        <Route path='/products/:categorie' element={<CategoryProduct />}></Route>
        <Route path='/compare' element={<ComparePage />}></Route>
        <Route path='/wishlist' element={<Wishlist />}></Route>
        </Route>
        <Route path='/dealer/:link_name' element={<CategoryProduct />}></Route>
       
      </Routes> 
    </div>
  );
}

export default App;
