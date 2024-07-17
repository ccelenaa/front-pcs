import React from 'react';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import serviceService from '../../services/service';
import prestataireService from '../../services/prestataire';

export default function Services(props) {

  const [anglet, setAnglet] = React.useState(1);
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

  const getCurrentPrestation = (service) => {
    if(
      service.prestations[0] && 
      service.prestations[0].date_suppression_admin == null &&
      service.prestations[0].date_suppression_voyageur == null &&
      service.prestations[0].date_suppression_prestataire == null
    ) {
      return service.prestations[0];
    }

    return {};
  }

  const tabClick = (event) => {
    const tab = event.currentTarget.dataset.tab;
    setAnglet(tab);
  }

  return (<>
    <div className="tableur">
      <div className={`tab${anglet==1?" selected":""}`} data-tab="1" onClick={tabClick}>Nouvelles</div>
      <div className={`tab${anglet==2?" selected":""}`} data-tab="2" onClick={tabClick}>En-cours</div>
      <div className={`tab${anglet==3?" selected":""}`} data-tab="3" onClick={tabClick}>Terminées</div>
    </div>

    {anglet == 1 ? <>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Voyageur1</div>
        <div className="cell">service</div>
        <div className="cell slim120">Date</div>
        <div className="cell">Prestataire</div>
      </div>
      {
        services.map((service) => {
          const prestation = getCurrentPrestation(service);

          return <>
            <div className={"row service_"+service.id+""}>
              <div className="cell">{service.voyageur.nom}</div>
              <div className="cell">{service.label}</div>
              <div className="cell slim120">{service.date?.slice(0, 16).replace('T', ' ')}</div>
              <div className="cell">
                <select onChange={changePrestataire} data-serviceid={service.id} className={service.prestataire ? "assigned":""}>
                  {                    
                    <>
                      <option key="0" value="0">
                        Selection du prestataire
                      </option>
                      {prestataires.map(({ id, nom }) => (
                        <option key={id} value={id} selected={id == prestation.id_prestataire}>
                          {nom}
                        </option>
                      ))}
                    </>
                  }
                </select>
              </div>
            </div>
          </>
          }
        )
      }
      </div>
      </> :

      (anglet == 2 ? <>
        <div className="tab-container">
          <div className="row header">
            <div className="cell">Voyageur2</div>
            <div className="cell">service</div>
            <div className="cell slim120">Date</div>
            <div className="cell">Prestataire</div>
          </div>
          {
            services.map((service) => {
              const prestation = getCurrentPrestation(service);

              return <>
                <div className={"row service_"+service.id+""}>
                  <div className="cell">{service.voyageur.nom}</div>
                  <div className="cell">{service.label}</div>
                  <div className="cell slim120">{service.date?.slice(0, 16).replace('T', ' ')}</div>
                  <div className="cell">
                    <select onChange={changePrestataire} data-serviceid={service.id} className={service.prestataire ? "assigned":""}>
                      {                    
                        <>
                          <option key="0" value="0">
                            Selection du prestataire
                          </option>
                          {prestataires.map(({ id, nom }) => (
                            <option key={id} value={id} selected={id == prestation.id_prestataire}>
                              {nom}
                            </option>
                          ))}
                        </>
                      }
                    </select>
                  </div>
                </div>
              </>
              }
            )
          }
          </div>
        </>:

        <>
          <div className="tab-container">
            <div className="row header">
              <div className="cell">Voyageur3</div>
              <div className="cell">service</div>
              <div className="cell slim120">Date</div>
              <div className="cell slim80">Note</div>
              <div className="cell">Prestataire</div>
            </div>
            {
              services.map((service) => {
                const prestation = getCurrentPrestation(service);

                return <>
                  <div className={"row service_"+service.id+""}>
                    <div className="cell">{service.voyageur.nom}</div>
                    <div className="cell">{service.label}</div>
                    <div className="cell slim120">{service.date?.slice(0, 16).replace('T', ' ')}</div>
                    <div className="cell slim80">
                      <div style={{display: prestation ? 'inline': 'none'}} data-serviceid={service.id}>
                      {
                        [1,2,3,4,5].map(i => <FontAwesomeIcon icon={all.faStar} className={"Star Star"+i+ (prestation.note && i<=prestation.note ? " level-"+service.note:"")} data-serviceid={service.id} data-level={i}/>)
                      }
                      </div>
                    </div>
                    <div className="cell">
                      <select data-serviceid={service.id} className={prestation ? "assigned":""}>
                        {                    
                          <>
                            <option key="0" value="0">
                              {prestataires.find(p=>p.id==prestation.id_prestataire).nom}
                            </option>
                          </>
                        }
                      </select>
                    </div>
                  </div>
                </>
                }
              )
            }
            </div>
        </>
      )}
      </>)
}