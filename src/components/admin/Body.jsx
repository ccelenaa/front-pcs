
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setConnexion, isConnected } from './../../services/user';
import { API_URL } from './../../Config';
import { useHistory, Link, NavLink, Route, useLocation } from 'react-router-dom';
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
import Facturations from './Facturations';

export default function Body(props) {

  return (<>
    <Route path='/auth' render={(prps) => <Login {...props}/>}/>
    <Route path='/inscription' render={(prps) => <Login {...props}/>}/>
    <Route path='/compte' render={(prps) => <Compte {...props}/>}/>
    <Route path='/messages' render={(prps) => <Messages {...props}/>}/>
    <Route path='/biens' exact render={(prps) => <Biens {...props}/>}/>
    <Route path='/biens/:id' render={(prps) => <Bien {...props}/>}/>
    <Route path='/services' render={(prps) => <Services {...props}/>}/>
    <Route path='/services/:id' render={(prps) => <Service {...props}/>}/>
    <Route path='/bailleurs' exact render={(prps) => <Bailleurs {...props}/>}/>
    <Route path='/bailleurs/:id' render={(prps) => <Bailleur {...props}/>}/>
    <Route path='/prestataires' exact render={(prps) => <Prestataires {...props}/>}/>
    <Route path='/prestataires/:id' render={(prps) => <Prestataire {...props}/>}/>
    <Route path='/voyageurs' exact render={(prps) => <Voyageurs {...props}/>}/>
    <Route path='/voyageurs/:id' render={(prps) => <Voyageur {...props}/>}/>
    <Route path='/facturations' exact render={(prps) => <Facturations {...props}/>}/>
    <Route path='/langues' render={(prps) => <Langues {...props}/>}/>
  </>)
}