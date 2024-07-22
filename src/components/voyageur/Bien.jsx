

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import bienService from '../../services/bien';
import Payment from 'services/payment';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from '../Calendar';

export default function Biens(props) {
  const {id} = useParams();

  const [bien, setbien] = React.useState({});

  React.useEffect(async () => {
    setbien(await bienService.get(id));
  }, []);

  const louer = () => {
    Payment.location(id);
  }

  if(!bien) {
    return <></>
  }

  const availabilities = [
    { date_debut: '2024-01-01', date_fin: '2024-01-10' },
    { date_debut: '2024-02-15', date_fin: '2024-02-20' },
    { date_debut: '2024-03-01', date_fin: '2024-03-05' }
  ];
  console.log(bien.locations);
  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <NavLink to="/biens" className="" style={{borderRadius: "50px", padding: "4px 10px", height: "100%"}}>
          <FontAwesomeIcon icon={all.faArrowLeft} />
        </NavLink>
      </div>
    </div>

    <Calendar availabilities={availabilities} />


    <div className="tab-container location">
      <div className="row header">
        <div className="cell center title">Location</div>
      </div>
      <div className="row">
        <div className="cell slim200">Dates</div>
        <div className="cell">
          <input type="date"/>
          <input type="date"/>
          <button onClick={louer}>Louer</button>
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