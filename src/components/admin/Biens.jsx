

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
        <div className="cell slim50">B-Sus</div>
        <div className="cell slim">Sus</div>
        <div className="cell slim">Val</div>
      </div>
      {
        biens.map((bien) => 
          <>
            <NavLink to={`/biens/${bien.id}`} className={"row bien_"+bien.id+""}>
              <div className="cell slim120">{bien.bailleur.nom}</div>
              <div className="cell slim90">{bien.type}</div>
              <div className="cell">{bien.titre}</div>
              <div className="cell slim70">{bien.surface}</div>
              <div className="cell slim60">{bien.prix} €</div>
              <div className="cell slim50">{bien.date_suspension_bailleur == null ? <></> : <FontAwesomeIcon icon={all.faCheck} className="burger"/>}</div>
              <div className="cell slim">{bien.date_suspension == null ? <></> : <FontAwesomeIcon icon={all.faCheck} className="burger"/>}</div>
              <div className="cell slim">{bien.date_validation == null ? <></> : <FontAwesomeIcon icon={all.faCheck} className="burger"/>}</div>
            </NavLink>
          </>
        )
      }
    </div>
  </>)
}