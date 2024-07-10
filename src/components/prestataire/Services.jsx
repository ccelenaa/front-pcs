

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import serviceService from '../../services/service';
import bienService from '../../services/bien';
import service from '../../services/service';

export default function Services(props) {
  
  const [services, setServices] = React.useState([]);
  const [prestataireServices, setPrestataireServices] = React.useState([]);

  React.useEffect(async () => {
    const [services, prestataireServices] = await Promise.all([serviceService.gets(), serviceService.getPrestataireServices(props.account.id)]);
    for(const service of services) {
      service.prestataire = prestataireServices.find((prs) => prs.id_service === service.id);
      service.enabled = service.prestataire !== undefined;
    };
    console.log({Miaw: services});

    setServices(services);
    setPrestataireServices(prestataireServices);
  },[]);

  const changePrix = (event) => {
    const service_id = event.target.getAttribute('data-serviceid');
    const service = services.find(s => s.id == service_id);
    service.prestataire.prix = +event.target.value;
    setServices([...services]);
  }

  const enableService = (event) => {
    const service_id = event.target.getAttribute('data-serviceid');
    const enable = event.target.checked;
    const service = services.find(s => s.id == service_id);
    service.enabled = enable;
    setServices([...services]);
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell slim"></div>
        <div className="cell">Service</div>
        <div className="cell slim90">Tarif STD</div>
        {/* <div className="cell slim"></div> */}
        <div className="cell slim80">Mes tarif</div>
        <div className="cell slim120">PCS marge</div>
        <div className="cell slim90" style={{textAlign: "right"}}>Prix client</div>
      </div>
      {
        services.map((service) => {
          const k = 0;
          return (<>
            <div className={"row "+(service.enabled === false || !service.prestataire ? "disabled": "")}>
              <div className="cell slim"><input type='checkbox' data-serviceid={service.id} defaultChecked={service.enabled === true && service.prestataire !== undefined} onChange={enableService}/></div>
              <div className="cell">{service.label}</div>
              <div className="cell slim90" style={{textAlign: "right"}}>{service.prix_standard} €</div>
              {/* <div className="cell slim">{service.enabled === true && service.prestataire ? (service.prix_standard > service.prestataire.prix ? '>' : '<'): ''}</div> */}
              <div className="cell slim80"><input onChange={changePrix} data-serviceid={service.id} type='text' defaultValue={service.prestataire ? service.prestataire.prix : service.prix_standard} style={{textAlign: "right", fontWeight: 'bold', width: "50px", padding: "5px 5px",border: "1px solid rgba(50,50,50,0.2)", borderRadius: "3px"}}/> €</div>
              <div className="cell slim120" style={{display: 'flex'}}>
                <div style={{flexGrow: 1, textAlign: "left"}}>
                  {service.pcs_marge} %
                </div>
                <div style={{flexGrow: 1, textAlign: "right"}}>
                  {(service.pcs_marge * (service.prestataire ? service.prestataire.prix : service.prix_standard) / 100).toFixed(2)} €
                </div>
              </div>
              <div className="cell slim90" style={{textAlign: "right", fontWeight: 'bold'}}>{((service.pcs_marge * (service.prestataire ? service.prestataire.prix : service.prix_standard) / 100) + (service.prestataire ? service.prestataire.prix : service.prix_standard)).toFixed(2)} €</div>
            </div>
          </>)
        })
      }
    </div>
  </>)
}