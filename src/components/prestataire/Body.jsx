
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setConnexion, isConnected } from './../../services/user';
import { API_URL } from './../../Config';
import { Link, NavLink, Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import Planing from './Planing';
import Factures from './Factures';
import Services from './Services';
import Compte from './Compte';
import Messages from './Messages';
import Login from 'components/login/Login';
import Prestations from './Prestations';
import Prestataire from 'components/admin/Prestataire';

export default function Body(props) {
console.log({Prestataire: props})
  return (<>
    <Routes>
    <Route path='/auth' element={<Login {...props}/>}/>
    <Route path='/inscription' element={<Login {...props}/>}/>
    <Route path='/compte' element={<Compte {...props}/>}/>
    <Route path='/messages' element={<Messages {...props}/>}/>
    <Route path='/services' element={<Services {...props}/>}/>
    <Route path='/prestations' element={<Prestations {...props}/>}/>
    <Route path='/planing' element={<Planing {...props}/>}/>
    <Route path='/factures' element={<Factures {...props}/>}/>
    </Routes>
  </>)
}