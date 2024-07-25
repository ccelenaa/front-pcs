import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import voyageurService from '../../services/voyageur';
import Payment from 'services/payment';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Voyageur(props) {
  const {id} = useParams();

  const [voyageur, setVoyageur] = React.useState(null);

  const init = async () => {
    setVoyageur(await voyageurService.get(id));
  }

  React.useEffect(() => {
    init()
  }, []);

  const validation = (event) => {
    const valider = event.target.checked;
    voyageurService.valider(voyageur.id, valider)
    .then(v => setVoyageur(v?v:voyageur));
  }
  
  const suspension = (event) => {
    const suspendre = event.target.checked;
    voyageurService.suspendre(voyageur.id, suspendre)
    .then(v => setVoyageur(v?v:voyageur));
  }

  if(!voyageur) {
    return <></>
  }

  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <NavLink to="/voyageurs" className="" style={{borderRadius: "50px", padding: "4px 10px", height: "100%"}}>
          <FontAwesomeIcon icon={all.faArrowLeft} />
        </NavLink>
      </div>
    </div>

    <div className="tab-container admin">
      <div className="row header">
        <div className="cell center title">Administration</div>
      </div>
      <div className="row">
        <div className="cell slim200">Admin Validation</div>
        {
          voyageur.date_validation == null
          ? <div className="cell"><input type="checkbox" onChange={validation}/></div>
          : <div className="cell cgreen"><FontAwesomeIcon icon={all.faCheck} className="burger"/> {voyageur.date_validation?.slice(0, 16).replace('T', ' ')}</div>
        }
      </div>
      <div className="row">
        <div className="cell slim200">Admin Suspension</div>
        <div className="cell"><input type="checkbox" defaultChecked={voyageur.date_suspension !== null} onChange={suspension} title={voyageur.date_suspension?.slice(0, 16).replace('T', ' ')} style={{display: voyageur.date_validation === null ? "none" : "initial"}}/></div>
      </div>
    </div>

    <div className="tab-container">
      <div className="row header">
        <div className="cell center title">Voyageur</div>
      </div>
      <div className="row">
        <div className="cell slim120">Nom</div>
        <div className="cell">{voyageur.nom}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Login</div>
        <div className="cell">{voyageur.login}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Email</div>
        <div className="cell">{voyageur.email}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Telephone</div>
        <div className="cell">{voyageur.telephone}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Inscription</div>
        <div className="cell">{voyageur.date_creation}</div>
      </div>
    </div>
  </>)
}