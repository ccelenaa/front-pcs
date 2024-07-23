

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

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell slim120">Type</div>
        <div className="cell slim70">Surface</div>
        <div className="cell">Bien</div>
        <div className="cell slim70">Prix</div>
      </div>
      {
        biens.filter(b=>(b.date_validation!==null && b.date_suspension==null && b.date_suspension_bailleur==null)).map((bien) => 
          <>
            <NavLink to={`/biens/${bien.id}`} className={"row bien_"+bien.id+""}>
              <div className="cell slim120">{bien.type}</div>
              <div className="cell slim70">{bien.surface}</div>
              <div className="cell">{bien.description}</div>
              <div className="cell slim70" style={{textAlign: 'right'}}>{(bien.prix*1.1).toFixed(2)} {bien.devise}</div>
            </NavLink>
          </>
        )
      }
    </div>
  </>)
}