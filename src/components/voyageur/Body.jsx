
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
      <Route path='/inscription' exact render={(prps) => <Login {...props}/>}/>
      <Route path='/compte' exact render={(prps) => <Compte {...props}/>}/>
      <Route path='/biens' exact render={(prps) => <Biens {...props}/>}/>
      <Route path='/biens/:id' exact render={(prps) => <Bien {...props}/>}/>
      <Route path='/locations' render={(prps) => <Locations {...props}/>}/>
      <Route path='/services' exact render={(prps) => <Services {...props}/>}/>
      <Route path='/services/ajout' exact render={(prps) => <AjoutService {...props}/>}/>
      <Route path='/paiements' exact render={(prps) => <Paiements {...props}/>}/>
    </Switch>
  </>)
}