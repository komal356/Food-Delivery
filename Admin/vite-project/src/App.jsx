import React from 'react';
// import { ToastContainer } from 'react-toastify';

import Navbar from './component/navbar/Navbar';
import Sidebar from './component/sidebar/sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './Pages/Add/Add';
import List from './Pages/List/List';
import Order from './Pages/Order/Order';
import { Navigate } from 'react-router-dom';

const App = () => {
  const url= "http://localhost:4000"
  return (
    <div>
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
  <Route path='/' element={<Navigate to='/Add' />} />
  <Route path='/Add' element={<Add url={url} />} />
  <Route path='/List' element={<List url={url} />} />
  <Route path='/Orders' element={<Order url={url} />} />

</Routes>
      </div>
   
      {/* <ToastContainer position='top-right' autoClose={3000} /> */}
    </div>
  );
};

export default App;
