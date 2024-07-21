

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

  React.useEffect(async () => {
    setbien(await bienService.get(id));
  }, []);

  const louer = () => {
    Payment.location(id);
  }

  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <NavLink to="/biens" className="" style={{borderRadius: "50px", padding: "4px 10px", height: "100%"}}>
          <FontAwesomeIcon icon={all.faArrowLeft} />
        </NavLink>
      </div>
    </div>
    <div className="tab-container">
      <div className="row">
        <div className="cell slim120">Bailleur</div>
        <div className="cell">{bien.bailleur?.nom}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Type</div>
        <div className="cell">{bien.type}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Titre</div>
        <div className="cell">{bien.titre}</div>
      </div>
      <div className="row" style={{paddingBottom: "50px"}}>
        <div className="cell slim120">Description</div>
        <div className="cell">{bien.description}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Surface</div>
        <div className="cell">{bien.surface}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Prix</div>
        <div className="cell">{(bien.prix*1.1).toFixed(2)} {bien.devise}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Images</div>
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