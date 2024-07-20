

import React, { useEffect, useState } from 'react';
import bienService from '../../services/bien';

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

  const validation = (event) => {
    const bien_id = event.target.getAttribute('data-bienid');
    const valider = event.target.checked;
    bienService.valider(bien_id, valider).then(({data: u}) => {
      setbiens(biens.map(b => b.id == u.id ? u : b));
      biens.map(b => console.log(b.id, b.date_validation));
    });
  }
  
  const suspension = (event) => {
    const bien_id = event.target.getAttribute('data-bienid');
    const suspendre = event.target.checked;
    bienService.suspendre(bien_id, suspendre).then(({data: u}) => {
      setbiens(biens.map(p => p.id == u.id ? u : p));
      biens.map(p => console.log(p.id, p.date_suspension));
    });
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell slim120">Propriétaire</div>
        <div className="cell slim90">Type</div>
        <div className="cell">Bien</div>
        <div className="cell slim70">Surface</div>
        <div className="cell slim60">Prix</div>
        <div className="cell slim50">B-Sus</div>
        <div className="cell slim">Sus</div>
        <div className="cell slim">Val</div>
      </div>
      {
        biens.map((bien) => 
          <>
            <div className="row">
              <div className="cell slim120">{bien.bailleur.nom}</div>
              <div className="cell slim90">{bien.type}</div>
              <div className="cell">{bien.description}</div>
              <div className="cell slim70">{bien.surface}</div>
              <div className="cell slim60">{bien.prix} €</div>
              <div className="cell slim50"><input id={`${bien.id}_b_val`} data-bienid={bien.id} type="checkbox" defaultChecked={bien.date_suspension_bailleur !== null} title={bien.date_suspension_bailleur?.slice(0, 16).replace('T', ' ')} disabled/></div>
              <div className="cell slim"><input id={`${bien.id}_sus`} data-bienid={bien.id} type="checkbox" defaultChecked={bien.date_suspension !== null} onChange={suspension} title={bien.date_suspension?.slice(0, 16).replace('T', ' ')} style={{display: bien.date_validation === null ? "none" : "initial"}}/></div>
              <div className="cell slim"><input id={`${bien.id}_val`} data-bienid={bien.id} type="checkbox" defaultChecked={bien.date_validation !== null} onChange={validation} title={bien.date_validation?.slice(0, 16).replace('T', ' ')} disabled={bien.date_validation !== null}/></div>
              {/* <div className="cell slim"><FontAwesomeIcon icon={all.faRemove} className="burger" style={{fontSize: '18px', cursor: 'pointer'}}/></div> */}
            </div>
          </>
        )
      }
    </div>
  </>)
}