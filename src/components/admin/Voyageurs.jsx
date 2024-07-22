
import React, { useEffect, useState } from 'react';
import voyageurService from '../../services/voyageur';
import { NavLink } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Voyageurs(props) {

  const [voyageurs, setVoyageurs] = React.useState([]);

  const getVoyageurs = () => {
    voyageurService.gets().then((brs) => {
      if (brs.status === 200) {
        console.log({data:brs.data});
        setVoyageurs(brs.data);
      }
    })
  }

  React.useEffect(() => {
    getVoyageurs();
  },[]);

  const validation = (event) => {
    const voyageur_id = event.target.getAttribute('data-voyageurid');
    const valider = event.target.checked;
    voyageurService.valider(voyageur_id, valider).then(({data: u}) => {
      setVoyageurs(voyageurs.map(b => b.id == u.id ? u : b));
      voyageurs.map(b => console.log(b.id, b.date_validation));
    });
  }
  
  const suspenssion = (event) => {
    const voyageur_id = event.target.getAttribute('data-voyageurid');
    const suspendre = event.target.checked;
    voyageurService.suspendre(voyageur_id, suspendre).then(({data: u}) => {
      setVoyageurs(voyageurs.map(b => b.id == u.id ? u : b));
      voyageurs.map(b => console.log(b.id, b.date_suspension));
    });
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Voyageur</div>
        <div className="cell">Créer</div>
        <div className="cell slim" title="Suspension Admin">SA</div>
        <div className="cell slim" title="Validation Admin">VA</div>
      </div>
      {
        voyageurs.map((voyageur) => 
          <>
            <NavLink to={`/voyageurs/${voyageur.id}`} className={"row"}>
              <div className="cell">{voyageur.nom}</div>
              <div className="cell">{voyageur.date_creation.slice(0, 16).replace('T', ' ')}</div>
              {
                voyageur.date_suspension == null
                ? <div className="cell slim cgreenc"><FontAwesomeIcon icon={all.faLockOpen} className="burger" title={`Non suspendu par Admin`}/></div>
                : <div className="cell slim cred"><FontAwesomeIcon icon={all.faLock} className="burger" title={`Suspension Admin le ${voyageur.date_suspension.slice(0, 16).replace('T', ' ')}`}/></div>
              }
              {
                voyageur.date_validation == null
                ? <div className="cell slim cblue"><FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" title={`Attente de validation par l'admin`}/></div>
                : <div className="cell slim cgreen"><FontAwesomeIcon icon={all.faCheck} className="burger" title={`Validation Admin le  ${voyageur.date_validation.slice(0, 16).replace('T', ' ')}`}/></div>
              }
            </NavLink>
          </>
        )
      }
    </div>
  </>)
}