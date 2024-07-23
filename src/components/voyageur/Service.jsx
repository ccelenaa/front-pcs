

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import serviceService from '../../services/service';
import Payment from 'services/payment';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Service(props) {
  const {id} = useParams();

  const [service, setService] = React.useState(null);

  React.useEffect(async () => {
    setService(await serviceService.get(id));
  }, []);

  const louer = () => {
    Payment.location(id);
  }

  const getCurrentPrestation = (service) => {
    console.log(service)
    if(
      service.prestations[0] && 
      service.prestations[0].date_suppression_admin == null &&
      service.prestations[0].date_suppression_voyageur == null &&
      service.prestations[0].date_suppression_prestataire == null
    ) {
      return service.prestations[0];
    }

    return null;
  }

  const paiement = () => {
    Payment.prestation(prestation.id);
  }

  if(!service) {
    return <></>;
  }

  const prestation = getCurrentPrestation(service);

  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <NavLink to="/services" className="" style={{borderRadius: "50px", padding: "4px 10px", height: "100%"}}>
          <FontAwesomeIcon icon={all.faArrowLeft} />
        </NavLink>
      </div>
    </div>

    {
    prestation
    ? <><div className="tab-container admin">
      <div className="row header">
        <div className="cell center title">Etapes et Actions</div>
      </div>
      <div className="row">
        <div className="cell slim200">1) Prix (Prestataire)</div>
        {
          prestation.statut > 1
          ? <><div className="cell">{prestation.prix_prestataire} €&nbsp;&nbsp;&nbsp;&nbsp; Total {(prestation.prix_prestataire * 1.1).toFixed(2)} € &nbsp;&nbsp;&nbsp;&nbsp;(+10 %) </div></>
          : <><div className="cell"><FontAwesomeIcon icon={all.faClockRotateLeft} /></div></>
        }
      </div>
      <div className="row">
        <div className="cell slim200">2) Paiement (Voyageur)</div>
        {
          prestation.statut < 2
          ? <div className="cell"><FontAwesomeIcon icon={all.faClockRotateLeft} /></div>
          : (
            prestation.statut == 2
            ? <div className="cell cgreenc"><button onClick={paiement}> Regler le paiement </button> </div> 
            : <div className="cell cgreenc"><FontAwesomeIcon icon={all.faCreditCard}/></div>
          )
          
        }
      </div>
      <div className="row">
        <div className="cell slim200">3) Terminé (Prestataire)</div>
        {
          prestation.statut < 3
          ? <><div className="cell"><FontAwesomeIcon icon={all.faClockRotateLeft} /></div></>
          : <><div className="cell"><FontAwesomeIcon icon={all.faCheck} /></div></>
        }
      </div>
    </div>
    </>
    : <></>}

    <div className="tab-container">
      <div className="row header">
        <div className="cell center title">Service - Prestation</div>
      </div>
      <div className="row">
        <div className="cell slim200">Titre</div>
        <div className="cell">{service.label}</div>
      </div>
      <div className="row" style={{height: "100px"}}>
        <div className="cell slim200">Description</div>
        <div className="cell">{service.description}</div>
      </div>
      <div className="row">
        <div className="cell slim200">Prix max</div>
        <div className="cell">{service.prix_max.toFixed(2)} €</div>
      </div>
      {
        prestation && prestation.prix_prestataire > 0 ? <>
          <div className="row">
            <div className="cell slim200">Prix Prestataire</div>
            <div className="cell">{prestation.prix_prestataire.toFixed(2)} €</div>
          </div>
          <div className="row">
            <div className="cell slim200">Prix Tatal (PCS)</div>
            <div className="cell">{(prestation.prix_prestataire * 1.1).toFixed(2)} € &nbsp;&nbsp;&nbsp;&nbsp;(+10 %)</div>
          </div>
        </> :
        <></>
      }
      <div className="row" style={{paddingBottom: "50px"}}>
        <div className="cell slim200">Date</div>
        <div className="cell">{service.date}</div>
      </div>
      <div className="row">
        <div className="cell slim200">Images</div>
        <div className="cell">
          <div className="image-container">
            {service.photos.map((image, index) => (
              <div key={index}>
                <img src={`/public/images/${service.photos[index].url}`} alt={`image-${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <br/>
  </>)
}