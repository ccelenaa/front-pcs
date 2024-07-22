

import React, { useEffect, useState } from 'react';
import bienService from '../../services/bien';
import { NavLink } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Biens(props) {

  const [biens, setbiens] = React.useState([]);

  const getbiens = () => {
    bienService.getBailleur().then((brs) => {
      if (brs.status === 200) {
        setbiens(brs.data);
      }
    })
  }

  React.useEffect(() => {
    getbiens();
  },[]);


  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <NavLink to="/biens/ajout" className="" style={{borderRadius: "50px", padding: "4px 10px", height: "100%"}}>
          <FontAwesomeIcon icon={all.faAdd} />
        </NavLink>
      </div>
    </div>
    <div className="tab-container">
      <div className="row header">
        <div className="cell slim" title="Visibilité du bien pour les voyageurs">Vis</div>
        <div className="cell slim90" style={{textAlign: "left"}}>Type</div>
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
              {
                bien.date_validation && bien.date_suspension == null && bien.date_suspension_bailleur == null
                ? <div className="cell slim cgreen"><FontAwesomeIcon icon={all.faEye} className="burger" title={`Visible pour les voyageurs`}/></div>
                : <div className="cell slim cred"><FontAwesomeIcon icon={all.faEyeSlash} className="burger" title={`Invisible pour les voyageurs`}/></div>
              }
              <div className="cell slim90" style={{textAlign: "left"}}>{bien.type}</div>
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