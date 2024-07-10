
import React, { useEffect, useState } from 'react';
import { API_URL } from './../../Config';
import { useHistory, Link, NavLink, Route, useLocation } from 'react-router-dom';
import Bien from './Bien';
import Biens from './Biens';
import Locations from './Locations';
import Prestations from './Prestations';
import Paiements from './Paiements';
import Compte from './Compte';
import Messages from './Messages';
import Login from 'components/login/Login';

export default function Body(props) {
  return (<>
    <Route path='/auth' render={(prps) => <Login {...props}/>}/>
    <Route path='/inscription' render={(prps) => <Login {...props}/>}/>
    <Route path='/compte' render={(prps) => <Compte {...props}/>}/>
    <Route path='/biens' exact render={(prps) => <Biens {...props}/>}/>
    <Route path='/biens/:id' render={(prps) => <Bien {...props}/>}/>
    <Route path='/locations' render={(prps) => <Locations {...props}/>}/>
    <Route path='/prestations' render={(prps) => <Prestations {...props}/>}/>
    <Route path='/paiements' render={(prps) => <Paiements {...props}/>}/>
  </>)
}