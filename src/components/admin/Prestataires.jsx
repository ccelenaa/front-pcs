

import React, { useEffect, useState } from 'react';
import prestataireService from '../../services/prestataire';
import { NavLink } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Prestataires(props) {

  const [prestataires, setPrestataires] = React.useState([]);

  const init = async () => {
    setPrestataires(await prestataireService.gets());
  }

  React.useEffect(() => {
    init()
  },[]);

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Pretstatire</div>
        <div className="cell">Inscription</div>
        <div className="cell slim80">Prestations</div>
        <div className="cell slim" title="Suspension Admin">SA</div>
        <div className="cell slim" title="Validation Admin">VA</div>
      </div>
      {
        prestataires.map((prestataire) => 
          <>
              <NavLink to={`/prestataires/${prestataire.id}`} className={"row"}>
                <div className="cell">{prestataire.nom}</div>
                <div className="cell">{prestataire.date_creation.slice(0, 16).replace('T', ' ')}</div>
                <div className="cell slim80">{prestataire.prestations?.length}</div>
                {
                  prestataire.date_suspension == null
                  ? <div className="cell slim cgreenc"><FontAwesomeIcon icon={all.faLockOpen} className="burger" title={`Non suspendu par Admin`}/></div>
                  : <div className="cell slim cred"><FontAwesomeIcon icon={all.faLock} className="burger" title={`Suspension Admin le ${prestataire.date_suspension.slice(0, 16).replace('T', ' ')}`}/></div>
                }
                {
                  prestataire.date_validation == null
                  ? <div className="cell slim cblue"><FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" title={`Attente de validation par l'admin`}/></div>
                  : <div className="cell slim cgreen"><FontAwesomeIcon icon={all.faCheck} className="burger" title={`Validation Admin le  ${prestataire.date_validation.slice(0, 16).replace('T', ' ')}`}/></div>
                }
             </NavLink>
          </>
        )
      }
    </div>
  </>)
}