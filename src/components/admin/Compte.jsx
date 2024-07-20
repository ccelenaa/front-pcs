
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logout, setConnexion, isConnected } from '../../services/user';
import { useTranslation } from "react-i18next";

export default function Compte(props) {
  const { i18n, t } = useTranslation();

  var [isAuth, setAuth] = useState('load');
  var [userData, setUserData] = useState(null);

  const close = (event) => {
    logout();
  }

  const account = props.account ?? {};


  const onChangeLang = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (<>
    <div class="logout-panel">
      <select defaultValue={i18n.language} onChange={onChangeLang}>
        {props.langues.map(({ langue, label }) => (
          <option key={langue} value={langue}>
            {label}
          </option>
        ))}
      </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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