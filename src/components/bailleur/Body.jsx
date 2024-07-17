
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setConnexion, isConnected } from './../../services/user';
import { API_URL } from './../../Config';
import { useHistory, Link, NavLink, Route, useLocation, Switch } from 'react-router-dom';
import Biens from './Biens';
import Prestation from './Prestation';
import Facture from './Facture';
import Compte from './Compte';
import Message from './Message';
import Login from 'components/login/Login';
import AjoutBien from './AjoutBien';

export default function Body(props) {

  return (<>
  <Switch>
    <Route path='/auth' render={(prps) => <Login {...props}/>}/>
    <Route path='/inscription' render={(prps) => <Login {...props}/>}/>
    <Route path='/compte' render={(prps) => <Compte {...props}/>}/>
    <Route path='/messages' exact render={(prps) => <Message {...props}/>}/>
    <Route path='/biens' exact render={(prps) => <Biens {...props}/>}/>
    <Route path='/biens/ajout' exact render={(prps) => <AjoutBien {...props}/>}/>
    <Route path='/prestations' render={(prps) => <Prestation {...props}/>}/>
    <Route path='/factures' render={(prps) => <Facture {...props}/>}/>
  </Switch>
  </>)
}