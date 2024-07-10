
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setConnexion, isConnected } from '../../services/user';
import { API_URL } from '../../Config';
import { useHistory, Link, NavLink } from 'react-router-dom';
import AsideSetting from '../aside/Settings';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bailleurService from '../../services/bailleur';
import bienService from '../../services/bien';

export default function Bailleurs(props) {

  const [bailleurs, setBailleurs] = React.useState([]);

  const getBailleurs = () => {
    bailleurService.gets().then((brs) => {
      if (brs.status === 200) {
        console.log({data:brs.data});
        setBailleurs(brs.data);
      }
    })
  }

  React.useEffect(() => {
    getBailleurs();
  },[]);

  const validation = (event) => {
    const bailleur_id = event.target.getAttribute('data-bailleurid');
    const valider = event.target.checked;
    bailleurService.valider(bailleur_id, valider).then(({data: u}) => {
      setBailleurs(bailleurs.map(b => b.id == u.id ? u : b));
      bailleurs.map(b => console.log(b.id, b.date_validation));
    });
  }
  
  const suspenssion = (event) => {
    const bailleur_id = event.target.getAttribute('data-bailleurid');
    const suspendre = event.target.checked;
    bailleurService.suspendre(bailleur_id, suspendre).then(({data: u}) => {
      setBailleurs(bailleurs.map(b => b.id == u.id ? u : b));
      bailleurs.map(b => console.log(b.id, b.date_suspension));
    });
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Bailleur</div>
        <div className="cell">Créer</div>
        <div className="cell slim40">Biens</div>
        <div className="cell slim">Susp</div>
        <div className="cell slim">Val</div>
        {/* <div className="cell slim"></div> */}
      </div>
      {
        bailleurs.map((bailleur) => 
          <>
            <div className="row">
              <div className="cell">{bailleur.nom}</div>
              <div className="cell">{bailleur.date_creation.slice(0, 16).replace('T', ' ')}</div>
              <div className="cell slim40">{bailleur.bien.length}</div>
              <div className="cell slim"><input id={`${bailleur.id}_val`} data-bailleurid={bailleur.id} type="checkbox" defaultChecked={bailleur.date_suspension !== null} onChange={suspenssion} title={bailleur.date_suspension?.slice(0, 16).replace('T', ' ')} style={{display: bailleur.date_validation === null ? "none" : "initial"}}/></div>
              <div className="cell slim"><input id={`${bailleur.id}_sus`} data-bailleurid={bailleur.id} type="checkbox" defaultChecked={bailleur.date_validation !== null} onChange={validation} title={bailleur.date_validation?.slice(0, 16).replace('T', ' ')} disabled={bailleur.date_validation !== null}/></div>
              {/* <div className="cell slim"><FontAwesomeIcon icon={all.faRemove} className="burger" style={{fontSize: '18px', cursor: 'pointer'}}/></div> */}
            </div>
          </>
        )
      }
    </div>
  </>)
}