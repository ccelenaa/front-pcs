

import React, { useEffect, useState } from 'react';
import bienService from '../../services/bien';
import { NavLink } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Biens(props) {

  const [biens, setbiens] = React.useState([]);

  const getbiens = () => {
    bienService.gets().then((brs) => {
      if (brs.status === 200) {
        setbiens(brs.data);
      }
    })
  }

  React.useEffect(() => {
    getbiens();
  },[]);


  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell slim120">Propriétaire</div>
        <div className="cell slim90">Type</div>
        <div className="cell">Bien</div>
        <div className="cell slim70">Surface</div>
        <div className="cell slim60">Prix</div>
        <div className="cell slim" title="Suspension Bailleur">SB</div>
        <div className="cell slim" title="Suspension Admin">SA</div>
        <div className="cell slim" title="Validation Admin">VA</div>
      </div>
      {
        biens.map((bien) => 
          <>
            <NavLink to={`/biens/${bien.id}`} className="row">
              <div className="cell slim120">{bien.bailleur.nom}</div>
              <div className="cell slim90">{bien.type}</div>
              <div className="cell">{bien.titre}</div>
              <div className="cell slim70">{bien.surface}</div>
              <div className="cell slim60">{bien.prix} €</div>
              {
                bien.date_suspension_bailleur == null
                ? <div className="cell slim cgreenc"><FontAwesomeIcon icon={all.faLockOpen} className="burger" title={`Non suspendu par le Bailleur`}/></div>
                : <div className="cell slim cred"><FontAwesomeIcon icon={all.faLock} className="burger" title={`Suspension Bailleur le ${bien.date_suspension_bailleur.slice(0, 16).replace('T', ' ')}`}/></div>
              }
              {
                bien.date_suspension == null
                ? <div className="cell slim cgreenc"><FontAwesomeIcon icon={all.faLockOpen} className="burger" title={`Non suspendu par Admin`}/></div>
                : <div className="cell slim cred"><FontAwesomeIcon icon={all.faLock} className="burger" title={`Suspension Admin le ${bien.date_suspension.slice(0, 16).replace('T', ' ')}`}/></div>
              }
              {
                bien.date_validation == null
                ? <div className="cell slim cblue"><FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" title={`Attente de validation par l'admin`}/></div>
                : <div className="cell slim cgreen"><FontAwesomeIcon icon={all.faCheck} className="burger" title={`Validation Admin le  ${bien.date_validation.slice(0, 16).replace('T', ' ')}`}/></div>
              }
            </NavLink>
          </>
        )
      }
    </div>
  </>)
}