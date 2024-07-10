
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setConnexion, isConnected } from './../../services/user';
import { API_URL } from './../../Config';
import { useHistory, Link, NavLink, Route, useLocation } from 'react-router-dom';
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
    <Route path='/auth' render={(prps) => <Login {...props}/>}/>
    <Route path='/inscription' render={(prps) => <Login {...props}/>}/>
    <Route path='/compte' render={(prps) => <Compte {...props}/>}/>
    <Route path='/messages' render={(prps) => <Messages {...props}/>}/>
    <Route path='/services' render={(prps) => <Services {...props}/>}/>
    <Route path='/prestations' render={(prps) => <Prestations {...props}/>}/>
    <Route path='/planing' render={(prps) => <Planing {...props}/>}/>
    <Route path='/factures' render={(prps) => <Factures {...props}/>}/>
  </>)
}