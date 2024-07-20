

import React, { useEffect, useState } from 'react';
import prestataireService from '../../services/prestataire';
import bienService from '../../services/bien';

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
        {/* <div className="cell slim40">Biens</div> */}
        <div className="cell slim">Susp</div>
        <div className="cell slim">Val</div>
        {/* <div className="cell slim"></div> */}
      </div>
      {
        prestataires.map((prestataire) => 
          <>
            <div className="row">
              <div className="cell">{prestataire.nom}</div>
              <div className="cell">{prestataire.date_creation.slice(0, 16).replace('T', ' ')}</div>
              {/* <div className="cell slim40">{prestataire.bien.length}</div> */}
              <div className="cell slim"><input id={`${prestataire.id}_val`} data-prestataireid={prestataire.id} type="checkbox" defaultChecked={prestataire.date_suspension !== null} onChange={suspenssion} title={prestataire.date_suspension?.slice(0, 16).replace('T', ' ')} style={{display: prestataire.date_validation === null ? "none" : "initial"}}/></div>
              <div className="cell slim"><input id={`${prestataire.id}_sus`} data-prestataireid={prestataire.id} type="checkbox" defaultChecked={prestataire.date_validation !== null} onChange={validation} title={prestataire.date_validation?.slice(0, 16).replace('T', ' ')} disabled={prestataire.date_validation !== null}/></div>
              {/* <div className="cell slim"><FontAwesomeIcon icon={all.faRemove} className="burger" style={{fontSize: '18px', cursor: 'pointer'}}/></div> */}
            </div>
          </>
        )
      }
    </div>
  </>)
}