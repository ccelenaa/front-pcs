
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Bien from './Bien';
import Biens from './Biens';
import BienDispo from '../BienDispo';
import Prestation from './Prestation';
import Facture from './Facture';
import Compte from './Compte';
import Message from './Message';
import Login from 'components/login/Login';
import AjoutBien from './AjoutBien';
import Locations from './Locations';

export default function Body(props) {

  return (<>
  <Routes>
    <Route path='/auth' element={<Login {...props}/>}/>
    <Route path='/inscription' element={<Login {...props}/>}/>
    <Route path='/compte' element={<Compte {...props}/>}/>
    <Route path='/messages' exact element={<Message {...props}/>}/>
    <Route path='/biens/:id' exact element={<Bien {...props}/>}/>
    <Route path='/biens/:id/dispo' exact element={<BienDispo {...props}/>}/>
    <Route path='/biens' exact element={<Biens {...props}/>}/>
    <Route path='/biens/ajout' exact element={<AjoutBien {...props}/>}/>
    <Route path='/locations' element={<Locations {...props}/>}/>
    <Route path='/prestations' element={<Prestation {...props}/>}/>
    <Route path='/factures' element={<Facture {...props}/>}/>
  </Routes>
  </>)
}