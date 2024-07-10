

import React, { useEffect, useState } from 'react';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import langueService from '../../services/langue';

export default function Langues(props) {

  const [langues, setLangues] = React.useState([]);

  const getLangues = () => langueService.gets().then((lngs) => setLangues(lngs));

  React.useEffect(() => {
    getLangues();
  },[]);


  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell slim40">Code</div>
        <div className="cell">Langues</div>
        <div className="cell">Créer</div>
        {/* <div className="cell slim">Susp</div>
        <div className="cell slim">Val</div> */}
        {/* <div className="cell slim"></div> */}
      </div>
      {
        langues.map((langue) => 
          <>
            <div className="row">
              <div className="cell slim40">[{langue.langue}]</div>
              <div className="cell">{langue.label}</div>
              <div className="cell">{langue.date_creation.slice(0, 16).replace('T', ' ')}</div>
              {/* <div className="cell slim"><input id={`${voyageur.id}_val`} data-voyageurid={voyageur.id} type="checkbox" defaultChecked={voyageur.suspended_at !== null} onChange={suspenssion} title={voyageur.suspended_at?.slice(0, 16).replace('T', ' ')} style={{display: voyageur.verified_at === null ? "none" : "initial"}}/></div>
              <div className="cell slim"><input id={`${voyageur.id}_sus`} data-voyageurid={voyageur.id} type="checkbox" defaultChecked={voyageur.verified_at !== null} onChange={validation} title={voyageur.verified_at?.slice(0, 16).replace('T', ' ')} disabled={voyageur.verified_at !== null}/></div> */}
              {/* <div className="cell slim"><FontAwesomeIcon icon={all.faRemove} className="burger" style={{fontSize: '18px', cursor: 'pointer'}}/></div> */}
            </div>
          </>
        )
      }
    </div>
  </>)
}