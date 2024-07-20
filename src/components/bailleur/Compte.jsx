
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logout, setConnexion, isConnected } from '../../services/user';

export default function Compte(props) {
  var [isAuth, setAuth] = useState('load');
  var [userData, setUserData] = useState(null);

  const close = (event) => {
    logout();
  }
  
  const account = props.account ?? {};

  return (<>
    <div class="logout-panel">
      <input type="button" value="Logout" onClick={close}/>
    </div>
    <form class="formulaire">
    <div>
        <label>Nom</label>
        <input type="text" value={account.nom} />
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
      {/* {
        Object.entries(all).map(e => 
            <>
              <FontAwesomeIcon title={e[0]} icon={all[e[0]]} className="burger" style={{
                marginRight: "10px",
                marginBottom: "10px",
                fontSize: '20px'
              }}/>
              {e[0]}
            </>
          )
      } */}
    </form>
  </>)
}