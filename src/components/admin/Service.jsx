

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import serviceService from '../../services/service';
import prestataireService from '../../services/prestataire';
import Payment from 'services/payment';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Service(props) {
  const {id} = useParams();

  const [service, setService] = React.useState(null);
  const [prestataires, setPrestataires] = React.useState(null);

  const init = async () => {
    setService(await serviceService.get(id));
    setPrestataires(await prestataireService.gets());
  }

  React.useEffect(() => {
    init()
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

  const changePrestataire = (event) => {
    const prestataire_id = event.currentTarget.value;

    serviceService.setPrestataire(service.id, prestataire_id).then(s => setService(s?s:service));
  }

  const paiement = () => {
    Payment.prestation(id);
  }

  if(!service || !prestataires) {
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

    <div className="tab-container admin">
      <div className="row header">
        <div className="cell center title">Administration</div>
      </div>
      <div className="row">
        <div className="cell slim200">Prestataire</div>
        <div className="cell">
          <select onChange={changePrestataire} data-serviceid={service.id} className={service.prestataire ? "assigned":""}>
            {                    
              <>
                <option key="0" value="0">
                  Selection du prestataire
                </option>
                {prestataires.map(({ id, nom }) => (
                  <option key={id} value={id} selected={id == prestation?.id_prestataire}>
                    {nom}
                  </option>
                ))}
              </>
            }
          </select>
        </div>
      </div>
    </div>

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
            <div className="cell">{(prestation.prix_prestataire * 1.1).toFixed(2)} € &nbsp;&nbsp;&nbsp;&nbsp;(+10 %)  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={paiement}>Regler le paiement</button>
            </div>
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
