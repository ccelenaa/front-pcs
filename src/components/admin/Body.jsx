
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Bien from './Bien';
import Biens from './Biens';
import Compte from './Compte';
import Login from 'components/login/Login';
import Service from './Service';
import Services from './Services';
import Bailleur from './Bailleur';
import Bailleurs from './Bailleurs';
import Prestataire from './Prestataire';
import Prestataires from './Prestataires';
import Voyageur from './Voyageur';
import Voyageurs from './Voyageurs';
import Messages from './Messages';
import Langues from './Langues';
import BienDispo from '../BienDispo';
import Facturations from './Facturations';

export default function Body(props) {

  return (<>
  <Routes>
    <Route path='/auth' element={<Login {...props}/>}/>
    <Route path='/inscription' element={<Login {...props}/>}/>
    <Route path='/compte' element={<Compte {...props}/>}/>
    <Route path='/messages' element={<Messages {...props}/>}/>
    <Route path='/biens' exact element={<Biens {...props}/>}/>
    <Route path='/biens/:id' element={<Bien {...props}/>}/>
    <Route path='/biens/:id/dispo' exact element={<BienDispo {...props}/>}/>
    <Route path='/services' element={<Services {...props}/>}/>
    <Route path='/services/:id' element={<Service {...props}/>}/>
    <Route path='/bailleurs' exact element={<Bailleurs {...props}/>}/>
    <Route path='/bailleurs/:id' element={<Bailleur {...props}/>}/>
    <Route path='/prestataires' exact element={<Prestataires {...props}/>}/>
    <Route path='/prestataires/:id' element={<Prestataire {...props}/>}/>
    <Route path='/voyageurs' exact element={<Voyageurs {...props}/>}/>
    <Route path='/voyageurs/:id' element={<Voyageur {...props}/>}/>
    <Route path='/facturations' exact element={<Facturations {...props}/>}/>
    <Route path='/langues' element={<Langues {...props}/>}/>
  </Routes>
  </>)
}