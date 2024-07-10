
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setConnexion, isConnected } from './../../services/user';
import { API_URL } from './../../Config';
import { useHistory, Link, NavLink, Route, useLocation } from 'react-router-dom';
import Bien from './Bien';
import Prestation from './Prestation';
import Facture from './Facture';
import Compte from './Compte';
import Message from './Message';
import Login from 'components/login/Login';

export default function Body(props) {

  return (<>
    <Route path='/auth' render={(prps) => <Login {...props}/>}/>
    <Route path='/inscription' render={(prps) => <Login {...props}/>}/>
    <Route path='/compte' render={(prps) => <Compte {...props}/>}/>
    <Route path='/messages' render={(prps) => <Message {...props}/>}/>
    <Route path='/biens' render={(prps) => <Bien {...props}/>}/>
    <Route path='/prestations' render={(prps) => <Prestation {...props}/>}/>
    <Route path='/factures' render={(prps) => <Facture {...props}/>}/>
  </>)
}