

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import bienService from '../../services/bien';
import Payment from 'services/payment';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Biens(props) {
  const {id} = useParams();

  const [bien, setbien] = React.useState(null);

  React.useEffect(async () => {
    setbien(await bienService.get(id));
  }, []);
  
  const suspension = (event) => {
    const suspendre = event.target.checked;
    bienService.bailleur_suspendre(bien.id, suspendre)
    .then(b => setbien(b?b:bien));
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
        <div className="cell center title">Administration</div>
      </div>
      <div className="row">
        <div className="cell slim200">Admin Validation</div>
        {
          bien.date_validation == null
          ? <div className="cell cblue"><FontAwesomeIcon icon={all.faClockRotateLeft} className="burger"/></div>
          : <div className="cell cgreen"><FontAwesomeIcon icon={all.faCheck} className="burger"/> {bien.date_validation?.slice(0, 16).replace('T', ' ')}</div>
        }
      </div>
      <div className="row">
        <div className="cell slim200">Admin Suspension</div>
        {
          bien.date_suspension == null
          ? <div className="cell cgreenc"><FontAwesomeIcon icon={all.faLockOpen} className="burger"/></div>
          : <div className="cell cred"><FontAwesomeIcon icon={all.faLock} className="burger"/> {bien.date_suspension?.slice(0, 16).replace('T', ' ')}</div>
        }
      </div>
      <div className="row">
        <div className="cell slim200">Bailleur Suspension</div>
        <div className="cell"><input type="checkbox" defaultChecked={bien.date_suspension_bailleur !== null} onChange={suspension} title={bien.date_suspension_bailleur?.slice(0, 16).replace('T', ' ')} style={{display: bien.date_validation === null ? "none" : "initial"}}/></div>
      </div>
    </div>
    <div className="tab-container">
      <div className="row header">
        <div className="cell center title">Bien immobilier</div>
      </div>
      <div className="row">
        <div className="cell slim200">Bailleur</div>
        <div className="cell"><NavLink to={`/bailleurs/${bien.bailleur?.id}`}>{bien.bailleur?.nom}</NavLink></div>
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
        <div className="cell slim200">Superficie</div>
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