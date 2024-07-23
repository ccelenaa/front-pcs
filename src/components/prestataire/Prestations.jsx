import React from 'react';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import serviceService from '../../services/service';
import prestataireService from '../../services/prestataire';
import { NavLink } from 'react-router-dom';

export default function Prestations({account}) {
  const [anglet, setAnglet] = React.useState(2);
  const [services, setServices] = React.useState([]);

  const getData = async () => {
    setServices(await serviceService.gets());
  }

  React.useEffect(async () => {
    await getData();
  },[]);

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
      <div className={`tab${anglet==2?" selected":""}`} data-tab="2" onClick={tabClick}>En-cours</div>
      <div className={`tab${anglet==3?" selected":""}`} data-tab="3" onClick={tabClick}>Terminées</div>
    </div>

    {anglet == 2 ? <>
        <div className="tab-container">
          <div className="row header">
            <div className="cell">Voyageur</div>
            <div className="cell">service</div>
            <div className="cell slim50">Max</div>
            <div className="cell slim120">Date</div>
            <div className="cell slim50">Prix</div>
            <div className="cell slim50">pay</div>
          </div>
          {
            services.filter(s=>s.statut>0 && s.statut<10).map((service) => {
              const prestation = getCurrentPrestation(service);

              if(prestation.id_prestataire != account.id) {
                return <></>
              }

              const prix = prestation.prix_prestataire ? `${prestation.prix_prestataire} €` : <FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" style={{}}/>;
              const pay = prestation.statut == 3 ? <FontAwesomeIcon icon={all.faCreditCard} className="burger" style={{color: "green"}}/> : <FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" style={{}}/>;

              return <>
                <NavLink to={`/services/${service.id}`} className="row">
                  <div className="cell">{service.voyageur.nom}</div>
                  <div className="cell">{service.label}</div>
                  <div className="cell slim50">{service.prix_max} €</div>
                  <div className="cell slim120">{service.date?.slice(0, 16).replace('T', ' ')}</div>
                  <div className="cell slim50">{prix}</div>
                  <div className="cell slim50">{pay}</div>
                </NavLink>
              </>
              }
            )
          }
          </div>
        </>:

        <>
        <div className="tab-container">
          <div className="row header">
            <div className="cell">Voyageur</div>
            <div className="cell">service</div>
            <div className="cell slim50">Max</div>
            <div className="cell slim120">Date</div>
            <div className="cell slim50">Prix</div>
            <div className="cell slim50">pay</div>
            <div className="cell slim80">Note</div>
          </div>
          {
            services.filter(s=>s.statut==10).map((service) => {
              const prestation = getCurrentPrestation(service);

              if(prestation.id_prestataire != account.id) {
                return <></>
              }

              const prix = prestation.prix_prestataire ? `${prestation.prix_prestataire} €` : <FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" style={{}}/>;
              const pay = prestation.statut == 3 ? <FontAwesomeIcon icon={all.faCreditCard} className="burger" style={{color: "green"}}/> : <FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" style={{}}/>;

              return <>
                <NavLink to={`/services/${service.id}`} className="row">
                  <div className="cell">{service.voyageur.nom}</div>
                  <div className="cell">{service.label}</div>
                  <div className="cell slim50">{service.prix_max} €</div>
                  <div className="cell slim120">{service.date?.slice(0, 16).replace('T', ' ')}</div>
                  <div className="cell slim50">{prix}</div>
                  <div className="cell slim50">{pay}</div>
                  <div className="cell slim80">
                    <div style={{display: prestation ? 'inline': 'none'}} data-serviceid={service.id}>
                    {
                      [1,2,3,4,5].map(i => <FontAwesomeIcon icon={all.faStar} className={"Star Star"+i+ (prestation.note && i<=prestation.note ? " level-"+service.note:"")} data-serviceid={service.id} data-level={i}/>)
                    }
                    </div>
                  </div>
                </NavLink>
              </>
              }
            )
          }
          </div>
        </>
      }
      </>)
}