
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setConnexion, isConnected } from '../../services/user';
import { API_URL } from '../../Config';
import { useHistory, Link, NavLink } from 'react-router-dom';
import AsideSetting from '../aside/Settings';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import voyageurService from '../../services/voyageur';
import bienService from '../../services/bien';

export default function Voyageurs(props) {

  const [voyageurs, setVoyageurs] = React.useState([]);

  const getVoyageurs = () => {
    voyageurService.gets().then((brs) => {
      if (brs.status === 200) {
        console.log({data:brs.data});
        setVoyageurs(brs.data);
      }
    })
  }

  React.useEffect(() => {
    getVoyageurs();
  },[]);

  const validation = (event) => {
    const voyageur_id = event.target.getAttribute('data-voyageurid');
    const valider = event.target.checked;
    voyageurService.valider(voyageur_id, valider).then(({data: u}) => {
      setVoyageurs(voyageurs.map(b => b.id == u.id ? u : b));
      voyageurs.map(b => console.log(b.id, b.date_validation));
    });
  }
  
  const suspenssion = (event) => {
    const voyageur_id = event.target.getAttribute('data-voyageurid');
    const suspendre = event.target.checked;
    voyageurService.suspendre(voyageur_id, suspendre).then(({data: u}) => {
      setVoyageurs(voyageurs.map(b => b.id == u.id ? u : b));
      voyageurs.map(b => console.log(b.id, b.date_suspension));
    });
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Voyageur</div>
        <div className="cell">Créer</div>
        {/* <div className="cell slim40">Biens</div> */}
        <div className="cell slim">Susp</div>
        <div className="cell slim">Val</div>
        {/* <div className="cell slim"></div> */}
      </div>
      {
        voyageurs.map((voyageur) => 
          <>
            <div className="row">
              <div className="cell">{voyageur.nom}</div>
              <div className="cell">{voyageur.date_creation.slice(0, 16).replace('T', ' ')}</div>
              {/* <div className="cell slim40">{voyageur.bien.length}</div> */}
              <div className="cell slim"><input id={`${voyageur.id}_val`} data-voyageurid={voyageur.id} type="checkbox" defaultChecked={voyageur.date_suspension !== null} onChange={suspenssion} title={voyageur.date_suspension?.slice(0, 16).replace('T', ' ')} style={{display: voyageur.date_validation === null ? "none" : "initial"}}/></div>
              <div className="cell slim"><input id={`${voyageur.id}_sus`} data-voyageurid={voyageur.id} type="checkbox" defaultChecked={voyageur.date_validation !== null} onChange={validation} title={voyageur.date_validation?.slice(0, 16).replace('T', ' ')} disabled={voyageur.date_validation !== null}/></div>
              {/* <div className="cell slim"><FontAwesomeIcon icon={all.faRemove} className="burger" style={{fontSize: '18px', cursor: 'pointer'}}/></div> */}
            </div>
          </>
        )
      }
    </div>
  </>)
}