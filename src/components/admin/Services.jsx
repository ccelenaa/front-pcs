import React from 'react';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import serviceService from '../../services/service';
import prestataireService from '../../services/prestataire';

export default function Services(props) {

  const [services, setServices] = React.useState([]);
  const [prestataires, setPrestataires] = React.useState([]);

  React.useEffect(async () => {
    setServices(await serviceService.gets());
    setPrestataires(await prestataireService.gets());
  },[]);

  const changePrestataire = (event) => {
    const service_id = event.currentTarget.dataset.serviceid;
    const prestataire_id = event.currentTarget.value;

    serviceService.setPrestataire(service_id, prestataire_id).then((u) => {
      setServices(services.map(p => p.id == u.id ? u : p));
    });
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Voyageur</div>
        <div className="cell">service</div>
        <div className="cell slim80">Note</div>
        <div className="cell">Prestataire</div>
        <div className="cell slim120">Date</div>
      </div>
      {
        services.map((service) => 
          <>
            <div className={"row service_"+service.id+""}>
              <div className="cell">{service.voyageur.nom}</div>
              <div className="cell">{service.service.label}</div>
              <div className="cell slim80">
                <div style={{display: service.prestataire ? 'inline': 'none'}} data-serviceid={service.id}>
                {
                  [1,2,3,4,5].map(i => <FontAwesomeIcon icon={all.faStar} className={"Star Star"+i+ (service.note && i<=service.note ? " level-"+service.note:"")} data-serviceid={service.id} data-level={i}/>)
                }
                </div>
              </div>
              <div className="cell">
                <select onChange={changePrestataire} data-serviceid={service.id} className={service.prestataire ? "assigned":""}>
                  {
                    service.prestataire ? <>
                      <option key="null" value="null">
                        {service.prestataire.nom}
                      </option>
                    </>
                    : <>
                      <option key="null" value="null">
                        Selection du prestataire
                      </option>
                      {prestataires.map(({ id, nom }) => (
                        <option key={id} value={id}>
                          {nom}
                        </option>
                      ))}                    
                    </>
                  }
                </select>
              </div>
              <div className="cell slim120">{service.date_service?.slice(0, 16).replace('T', ' ')}</div>
            </div>
          </>
        )
      }
    </div>
  </>)
}