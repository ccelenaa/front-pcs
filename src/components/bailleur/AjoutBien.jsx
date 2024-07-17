
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logout, setConnexion, isConnected } from '../../services/user';
import { API_URL } from '../../Config';
import { useHistory, Link, NavLink } from 'react-router-dom';
import AsideSetting from '../aside/Settings';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AjoutBien(props) {
  var [isAuth, setAuth] = useState('load');
  var [userData, setUserData] = useState(null);
  const history = useHistory();

  const close = (event) => {
    logout();
  }
  
  const account = props.account ?? {};

  return (<>
    <form class="formulaire">
      <div>
        <label>Type du bien</label>
        <select style={{width: "100%"}}>
          <option>Sellection du type</option>
          <option>Appartement</option>
          <option>Studio</option>
        </select>
      </div>
      <div>
        <label>Descrption</label>
        <textarea type="text" style={{width: "100%", height: "170px"}} value="" />
      </div>
      <div>
        <label for="">Telephone</label>
        <input type="text" value={account.telephone} />
      </div>
      <div>
        <label>Email</label>
        <input type="text" value={account.email} disabled/>
      </div>
      <div>
        <label>Login</label>
        <input type="text" value={account.login} disabled/>
      </div>
      <div>
        <input type="submit" value="Sauvegarder" />
      </div>
      <br/>
      <br/>
    </form>
  </>)
}