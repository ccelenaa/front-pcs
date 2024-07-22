
import React, { useEffect, useState } from 'react';
import bailleurService from '../../services/bailleur';
import { NavLink } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Bailleurs(props) {

  const [bailleurs, setBailleurs] = React.useState([]);

  const getBailleurs = () => {
    bailleurService.gets().then((brs) => {
      if (brs.status === 200) {
        console.log({data:brs.data});
        setBailleurs(brs.data);
      }
    })
  }

  React.useEffect(() => {
    getBailleurs();
  },[]);

  const validation = (event) => {
    const bailleur_id = event.target.getAttribute('data-bailleurid');
    const valider = event.target.checked;
    bailleurService.valider(bailleur_id, valider).then(({data: u}) => {
      setBailleurs(bailleurs.map(b => b.id == u.id ? u : b));
      bailleurs.map(b => console.log(b.id, b.date_validation));
    });
  }
  
  const suspenssion = (event) => {
    const bailleur_id = event.target.getAttribute('data-bailleurid');
    const suspendre = event.target.checked;
    bailleurService.suspendre(bailleur_id, suspendre).then(({data: u}) => {
      setBailleurs(bailleurs.map(b => b.id == u.id ? u : b));
      bailleurs.map(b => console.log(b.id, b.date_suspension));
    });
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Bailleur</div>
        <div className="cell">Inscription</div>
        <div className="cell slim40">Biens</div>
        <div className="cell slim" title="Suspension Admin">SA</div>
        <div className="cell slim" title="Validation Admin">VA</div>
      </div>
      {
        bailleurs.map((bailleur) => 
          <>
            <NavLink to={`/bailleurs/${bailleur.id}`} className="row">
              <div className="cell">{bailleur.nom}</div>
              <div className="cell">{bailleur.date_creation.slice(0, 16).replace('T', ' ')}</div>
              <div className="cell slim40">{bailleur.biens?.length}</div>
              {
                bailleur.date_suspension == null
                ? <div className="cell slim cgreenc"><FontAwesomeIcon icon={all.faLockOpen} className="burger" title={`Non suspendu par Admin`}/></div>
                : <div className="cell slim cred"><FontAwesomeIcon icon={all.faLock} className="burger" title={`Suspension Admin le ${bailleur.date_suspension.slice(0, 16).replace('T', ' ')}`}/></div>
              }
              {
                bailleur.date_validation == null
                ? <div className="cell slim cblue"><FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" title={`Attente de validation par l'admin`}/></div>
                : <div className="cell slim cgreen"><FontAwesomeIcon icon={all.faCheck} className="burger" title={`Validation Admin le  ${bailleur.date_validation.slice(0, 16).replace('T', ' ')}`}/></div>
              }
            </NavLink>
          </>
        )
      }
    </div>
  </>)
}