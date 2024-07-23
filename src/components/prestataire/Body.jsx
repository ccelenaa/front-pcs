
import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import Planing from './Planing';
import Factures from './Factures';
import Compte from './Compte';
import Login from 'components/login/Login';
import Prestation from './Prestation';
import Prestations from './Prestations';

export default function Body(props) {

  return (<>
    <Routes>
    <Route path='/auth' element={<Login {...props}/>}/>
    <Route path='/inscription' element={<Login {...props}/>}/>
    <Route path='/compte' element={<Compte {...props}/>}/>
    <Route path='/services/:id' element={<Prestation {...props}/>}/>
    <Route path='/services' element={<Prestations {...props}/>}/>
    <Route path='/planing' element={<Planing {...props}/>}/>
    <Route path='/factures' element={<Factures {...props}/>}/>
    </Routes>
  </>)
}