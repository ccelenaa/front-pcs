
import React, { useEffect, useState } from 'react';
import { API_URL } from './../../Config';
import { Link, NavLink, Route, Routes, BrowserRouter as Router, useLocation, Switch} from 'react-router-dom';
import Bien from './Bien';
import BienDispo from '../BienDispo';
import Biens from './Biens';
import Locations from './Locations';
import Service from './Service';
import Services from './Services';
import Paiements from './Paiements';
import Compte from './Compte';
import Messages from './Messages';
import Login from 'components/login/Login';
import AjoutService from './AjoutService';

export default function Body(props) {
  return (<>
    <Routes>
      <Route path='/auth' element={<Login {...props}/>}/>
      <Route path='/inscription' exact element={<Login {...props}/>}/>
      <Route path='/compte' exact element={<Compte {...props}/>}/>
      <Route path='/biens' exact element={<Biens {...props}/>}/>
      <Route path='/biens/:id' exact element={<Bien {...props}/>}/>
      <Route path='/biens/:id/dispo' exact element={<BienDispo {...props}/>}/>
      <Route path='/locations' element={<Locations {...props}/>}/>
      <Route path='/services' exact element={<Services {...props}/>}/>
      <Route path='/services/ajout' exact element={<AjoutService {...props}/>}/>
      <Route path='/services/:id' exact element={<Service {...props}/>}/>
      <Route path='/paiements' exact element={<Paiements {...props}/>}/>
    </Routes>
  </>)
}