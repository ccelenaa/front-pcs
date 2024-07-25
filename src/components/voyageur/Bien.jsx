

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import bienService from '../../services/bien';
import Payment from 'services/payment';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Biens(props) {
  const {id} = useParams();

  const [bien, setbien] = React.useState({});

  const init = async () => {
    setbien(await bienService.get(id));
  }

  React.useEffect(() => {
    init();
  }, []);

  const louer = () => {
    const date_debut = document.getElementById('date_debut').value;
    const date_fin = document.getElementById('date_fin').value;
    Payment.location(id, date_debut, date_fin);
  }

  if(!bien) {
    return <></>
  }

  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <NavLink to="/biens" className="" style={{borderRadius: "50px", padding: "4px 10px", height: "100%"}}>
          <FontAwesomeIcon icon={all.faArrowLeft} />
        </NavLink>
      </div>
    </div>

    <div className="tab-container admin">
      <div className="row header">
        <div className="cell center title">Location</div>
      </div>
      <div className="row">
        <div className="cell slim200">Dates</div>
        <div className="cell">
          <input type="date" id="date_debut"/>
          <input type="date" id="date_fin"/>
          <button onClick={louer}>Louer</button>
        </div>
      </div>
      <div className="row">
        <div className="cell slim200">Disponibilités</div>
        <div className="cell">
          <NavLink to={`/biens/${bien.id}/dispo`}><button> Verifier </button></NavLink>
        </div>
      </div>
      <div className="row">
        <div className="cell slim200">Calcul du prix</div>
        <div className="cell">(Prix par jour + 10%) X Nombre de jour</div>
      </div>
    </div>

    <div className="tab-container">
      <div className="row header">
        <div className="cell center title">Bien immobilier</div>
      </div>
      <div className="row">
        <div className="cell slim200">Type</div>
        <div className="cell">{bien.type}</div>
      </div>
      <div className="row">
        <div className="cell slim200">Titre</div>
        <div className="cell">{bien.titre}</div>
      </div>
      <div className="row" style={{paddingBottom: "50px"}}>
        <div className="cell slim200">Description</div>
        <div className="cell">{bien.description}</div>
      </div>
      <div className="row">
        <div className="cell slim200">Surface</div>
        <div className="cell">{bien.surface}</div>
      </div>
      <div className="row">
        <div className="cell slim200">Prix</div>
        <div className="cell">{(bien.prix*1.1).toFixed(2)} {bien.devise}</div>
      </div>
      <div className="row">
        <div className="cell slim200">Contact</div>
        <div className="cell">{bien.contact}</div>
      </div>
      <div className="row">
        <div className="cell slim200">Images</div>
        <div className="cell">
          <div className="image-container">
            {bien.photos?.map((image, index) => (
              <div key={index}>
                <img src={`/public/images/${bien.photos[index].url}`} alt={`image-${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>)
}