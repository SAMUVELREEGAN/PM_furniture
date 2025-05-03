import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import MyLayout from './Layouts/MyLayout';
import Products from './Pages/Products';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MyLayout />}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/product' element={<Products />}></Route>
        </Route>
      </Routes> 
    </div>
  );
}

export default App;
