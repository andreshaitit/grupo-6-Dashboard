import React from 'react';
import SideBar from './SideBar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from '../pages/Users';
import Products from '../pages/Products';
import AddUsers from '../pages/AddUsers';
import Main from './Main';
import AddProduct from '../pages/AddProduct';

function App() {
  return (
    <React.Fragment>
      	<div id="wrapper">
          <SideBar />
              
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Main />}></Route>
              <Route path='/usuarios' element={<Users />}></Route>
              <Route path='/agregar-usuario' element={<AddUsers />}></Route>
              <Route path='/productos' element={<Products />}></Route>
              <Route path='/agregar-producto' element={<AddProduct />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
    </React.Fragment>
  );
}

export default App;
