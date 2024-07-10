

import React, { useEffect, useState,  } from 'react';
import { NavLink } from 'react-router-dom';
import bienService from '../../services/bien';
import Utils from 'services/payment';

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
      biens.map(b => console.log(b.id, b.verified_at));
    });
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell slim120">Type</div>
        <div className="cell slim70">Surface</div>
        <div className="cell">Bien</div>
        <div className="cell slim70">Prix</div>
        <div className="cell slim90">Reservation</div>
        {/* <div className="cell slim">Sus</div>
        <div className="cell slim">Val</div> */}
      </div>
      {
        biens.filter(b=>(b.validated_at!==null && b.suspended_at==null && b.bailleur_suspended_at==null)).map((bien) => 
          <>
            <div className="row">
              <div className="cell slim120">{bien.type}</div>
              <div className="cell slim70">{bien.surface}</div>
              <div className="cell">{bien.description}</div>
              <div className="cell slim70" style={{textAlign: 'right'}}>{(bien.prix*1.1).toFixed(2)} {bien.devise}</div>
              <div className="cell slim90"><NavLink to={`/biens/${bien.id}`}><input type="button" value="Reserver" data-bienid={bien.id}/></NavLink></div>
              {/* <div className="cell slim50"><input id={`${bien.id}_b_val`} data-bienid={bien.id} type="checkbox" defaultChecked={bien.bailleur_suspended_at !== null} title={bien.bailleur_suspended_at?.slice(0, 16).replace('T', ' ')} disabled/></div>
              <div className="cell slim"><input id={`${bien.id}_val`} data-bienid={bien.id} type="checkbox" defaultChecked={bien.suspended_at !== null} onChange={suspenssion} title={bien.suspended_at?.slice(0, 16).replace('T', ' ')} style={{display: bien.validated_at === null ? "none" : "initial"}}/></div>
              <div className="cell slim"><input id={`${bien.id}_sus`} data-bienid={bien.id} type="checkbox" defaultChecked={bien.validated_at !== null} onChange={validation} title={bien.validated_at?.slice(0, 16).replace('T', ' ')} disabled={bien.validated_at !== null}/></div> */}
              {/* <div className="cell slim"><FontAwesomeIcon icon={all.faRemove} className="burger" style={{fontSize: '18px', cursor: 'pointer'}}/></div> */}
            </div>
          </>
        )
      }
    </div>
  </>)
}