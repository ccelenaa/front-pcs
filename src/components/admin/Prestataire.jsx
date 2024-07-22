import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import prestataireService from '../../services/prestataire';
import Payment from 'services/payment';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Prestataire(props) {
  const {id} = useParams();

  const [prestataire, setPrestataire] = React.useState({});

  React.useEffect(async () => {
    setPrestataire(await prestataireService.get(id));
  }, []);


  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <NavLink to="/prestataires" className="" style={{borderRadius: "50px", padding: "4px 10px", height: "100%"}}>
          <FontAwesomeIcon icon={all.faArrowLeft} />
        </NavLink>
      </div>
    </div>
    <div className="tab-container">
      <div className="row">
        <div className="cell slim120">Nom</div>
        <div className="cell">{prestataire.nom}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Login</div>
        <div className="cell">{prestataire.login}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Email</div>
        <div className="cell">{prestataire.email}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Telephone</div>
        <div className="cell">{prestataire.telephone}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Inscription</div>
        <div className="cell">{prestataire.date_creation}</div>
      </div>
    </div>
  </>)
}