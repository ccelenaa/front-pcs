
import React, { useEffect, useState } from 'react';
import { API_URL } from './../../Config';
import { useHistory, Link, NavLink, Route, useLocation, Switch} from 'react-router-dom';
import Bien from './Bien';
import Biens from './Biens';
import Locations from './Locations';
import Services from './Services';
import Paiements from './Paiements';
import Compte from './Compte';
import Messages from './Messages';
import Login from 'components/login/Login';
import AjoutService from './AjoutService';

export default function Body(props) {
  return (<>
    <Switch>
      <Route path='/auth' render={(prps) => <Login {...props}/>}/>
      <Route path='/inscription' render={(prps) => <Login {...props}/>}/>
      <Route path='/compte' render={(prps) => <Compte {...props}/>}/>
      <Route path='/biens' exact render={(prps) => <Biens {...props}/>}/>
      <Route path='/biens/:id' exact render={(prps) => <Bien {...props}/>}/>
      <Route path='/locations' render={(prps) => <Locations {...props}/>}/>
      <Route path='/services' render={(prps) => <Services {...props}/>}/>
      <Route path='/services/ajout' render={(prps) => <AjoutService {...props}/>}/>
      <Route path='/paiements' render={(prps) => <Paiements {...props}/>}/>
    </Switch>
  </>)
}