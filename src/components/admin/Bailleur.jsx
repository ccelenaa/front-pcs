import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import bailleurService from '../../services/bailleur';
import Payment from 'services/payment';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackLink from 'components/widgets/BackLink';

export default function Bailleur(props) {
  const {id} = useParams();

  const [bailleur, setBailleur] = React.useState(null);
  const setB = async () => {
    setBailleur(await bailleurService.get(id));
  };

  React.useEffect(() => {
    setB();
  }, []);

  const validation = (event) => {
    const valider = event.target.checked;
    bailleurService.valider(bailleur.id, valider)
    .then(b => setBailleur(b?b:bailleur));
  }
  
  const suspension = (event) => {
    const suspendre = event.target.checked;
    bailleurService.suspendre(bailleur.id, suspendre)
    .then(b => setBailleur(b?b:bailleur));
  }

  if(!bailleur) {
    return <></>
  }

  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <BackLink backlink="/bailleurs"/>
      </div>
    </div>

    <div className="tab-container admin">
      <div className="row header">
        <div className="cell center title">Administration</div>
      </div>
      <div className="row">
        <div className="cell slim200">Admin Validation</div>
        {
          bailleur.date_validation == null
          ? <div className="cell"><input type="checkbox" onChange={validation}/></div>
          : <div className="cell cgreen"><FontAwesomeIcon icon={all.faCheck} className="burger"/> {bailleur.date_validation?.slice(0, 16).replace('T', ' ')}</div>
        }
      </div>
      <div className="row">
        <div className="cell slim200">Admin Suspension</div>
        <div className="cell"><input type="checkbox" defaultChecked={bailleur.date_suspension !== null} onChange={suspension} title={bailleur.date_suspension?.slice(0, 16).replace('T', ' ')} style={{display: bailleur.date_validation === null ? "none" : "initial"}}/></div>
      </div>
    </div>

    <div className="tab-container">
      <div className="row header">
        <div className="cell center title">Bailleur</div>
      </div>
      <div className="row">
        <div className="cell slim120">Nom</div>
        <div className="cell">{bailleur.nom}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Login</div>
        <div className="cell">{bailleur.login}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Email</div>
        <div className="cell">{bailleur.email}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Telephone</div>
        <div className="cell">{bailleur.telephone}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Biens</div>
        <div className="cell">{bailleur.biens?.length}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Inscription</div>
        <div className="cell">{bailleur.date_creation}</div>
      </div>
    </div>
  </>)
}