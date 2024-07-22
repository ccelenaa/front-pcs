

import React, { useEffect, useState } from 'react';
import prestataireService from '../../services/prestataire';
import { NavLink } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Prestataires(props) {

  const [prestataires, setPrestataires] = React.useState([]);

  React.useEffect(async () => {
    setPrestataires(await prestataireService.gets());
  },[]);

  const validation = (event) => {
    const prestataire_id = event.target.getAttribute('data-prestataireid');
    const valider = event.target.checked;
    prestataireService.valider(prestataire_id, valider).then((u) => {
      setPrestataires(prestataires.map(b => b.id == u.id ? u : b));
    });
  }
  
  const suspenssion = (event) => {
    const prestataire_id = event.target.getAttribute('data-prestataireid');
    const suspendre = event.target.checked;
    prestataireService.suspendre(prestataire_id, suspendre).then((u) => {
      setPrestataires(prestataires.map(p => p.id == u.id ? u : p));
    });
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Pretstatire</div>
        <div className="cell">Créer</div>
        <div className="cell slim">Susp</div>
        <div className="cell slim">Val</div>
      </div>
      {
        prestataires.map((prestataire) => 
          <>
              <NavLink to={`/prestataires/${prestataire.id}`} className={"row"}>
                <div className="cell">{prestataire.nom}</div>
                <div className="cell">{prestataire.date_creation.slice(0, 16).replace('T', ' ')}</div>
                <div className="cell slim">{prestataire.date_suspension == null ? <></> : <FontAwesomeIcon icon={all.faCheck} className="burger"/>}</div>
                <div className="cell slim">{prestataire.date_validation == null ? <></> : <FontAwesomeIcon icon={all.faCheck} className="burger"/>}</div>
              </NavLink>
          </>
        )
      }
    </div>
  </>)
}