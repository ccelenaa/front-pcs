

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import serviceService from '../../services/service';
import Payment from 'services/payment';
import { useParams } from 'react-router-dom';

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
    Payment.prestation(id);
  }

  if(service == null) {
    return <></>;
  }

  const prestation = getCurrentPrestation(service);

  return (<>
    <NavLink to="/services">Retour</NavLink>
    <div className="tab-container">
      <div className="row">
        <div className="cell slim120">Titre</div>
        <div className="cell">{service.label}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Description</div>
        <div className="cell">{service.description}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Prix max</div>
        <div className="cell">{service.prix_max.toFixed(2)} €</div>
      </div>
      {
        prestation && prestation.prix_prestataire > 0 ? <>
          <div className="row">
            <div className="cell slim120">Prix Prestataire</div>
            <div className="cell">{prestation.prix_prestataire.toFixed(2)} €</div>
          </div>
          <div className="row">
            <div className="cell slim120">Prix Tatal (PCS)</div>
            <div className="cell">{(prestation.prix_prestataire * 1.1).toFixed(2)} € &nbsp;&nbsp;&nbsp;&nbsp;(+10 %)  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={paiement}>Regler le paiement</button>
            </div>
          </div>
        </> :
        <></>
      }
      <div className="row">
        <div className="cell slim120">Date</div>
        <div className="cell">{service.date}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Images</div>
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