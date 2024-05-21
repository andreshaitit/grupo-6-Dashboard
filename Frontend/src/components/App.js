import React from 'react';
import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from '../pages/Users';
import Products from '../pages/Products';
import AddUsers from '../pages/AddUsers';
import EditUsers from '../pages/EditUsers';

function App() {
  return (
    <React.Fragment>
      	<div id="wrapper">
          <SideBar />
              
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<ContentWrapper />}></Route>
              <Route path='/usuarios' element={<Users />}></Route>
              <Route path='/productos' element={<Products />}></Route>
              <Route path='/agregar-usuario' element={<AddUsers />}></Route>
              <Route path='/editar-usuario/:id' element={<EditUsers />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
    </React.Fragment>
  );
}

export default App;
