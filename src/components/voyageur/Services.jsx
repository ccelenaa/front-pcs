import React, { useEffect, useState } from 'react';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import serviceService from '../../services/service';
import prestationService from '../../services/prestation';
import { NavLink } from 'react-router-dom';

export default function Services(props) {

  const [anglet, setAnglet] = React.useState(1);
  const [services, setServices] = React.useState([]);

  React.useEffect(async () => {
    setServices(await serviceService.getVoyageurServices(props.account.id));
  },[]);

  function apply_level(id_service, level) {
    if(level && id_service){
      const elements = document.querySelectorAll('.service_'+id_service+' .Star');
      elements.forEach(function(e,i) {
        [1,2,3,4,5].forEach((i) => e.classList.remove('level-'+i));
        if(i<+level){
          e.classList.add('level-'+level);
        }
      });
    }
  }

  function mouseEnter (event) {
    const level = event.currentTarget.dataset.level;
    const id_service = event.currentTarget.dataset.serviceid;
    apply_level(id_service, level);
  }

  function mouseLeave(event) {
    const id_service = event.currentTarget.getAttribute('data-serviceid');

    const elements = document.querySelectorAll('.service_'+id_service+' .Star');
    elements.forEach((e) => [1,2,3,4,5].forEach((i) => e.classList.remove('level-'+i)));

    apply_level(id_service, services.find(e=>e.id===id_service).prestations[0].note);
  }


  function notation(event) {
    const note = event.currentTarget.dataset.level;
    const currentNote = event.currentTarget.dataset.currentnote;
    console.log({note, currentNote})
    if(note !== currentNote) {
      const service_id = event.currentTarget.dataset.serviceid;
      const prestation_id = event.currentTarget.dataset.prestationid;
      console.log({currentNote,note,prestation_id})
      prestationService.setNote(prestation_id, +note).then(() => {
        setServices(services.map(s=>{
          if(s.id == service_id) { s.prestations[0].note = +note; console.log("YESSSSSSSSSSSSSS")}
          return s;
        }))
      });
    }
  }

  const getCurrentPrestation = (service) => {
    console.log(service)
    if(
      service.prestations[0] && 
      service.prestations[0].date_suppression_admin == null &&
      service.prestations[0].date_suppression_voyageur == null &&
      service.prestations[0].date_suppression_prestataire == null
    ) {
      console.log(service.prestations[0]);
      return service.prestations[0];
    }

    console.log({});
    return {};
  }

  const tabClick = (event) => {
    const tab = event.currentTarget.dataset.tab;
    setAnglet(tab);
  }

return (<>
  <div className="tableur">
    <div className='tab ajout'>
      <NavLink to="/services/ajout" className="" style={{borderRadius: "50px", padding: "4px 10px", height: "100%"}}>
        <FontAwesomeIcon icon={all.faAdd} />
      </NavLink>
    </div>
    <div className={`tab${anglet==1?" selected":""}`} data-tab="1" onClick={tabClick}>Nouvelles</div>
    <div className={`tab${anglet==2?" selected":""}`} data-tab="2" onClick={tabClick}>En-cours</div>
    <div className={`tab${anglet==3?" selected":""}`} data-tab="3" onClick={tabClick}>Terminées</div>
  </div>

  {anglet == 1 ? <>
  <div className="tab-container">
    <div className="row header">
      <div className="cell">service</div>
      <div className="cell slim50">Max</div>
      <div className="cell slim120">Date</div>
    </div>
    {
      services.filter(s=>s.statut==0).map((service) => {
        return <>
          <div className={"row service_"+service.id+""}>
            <div className="cell">{service.label}</div>
            <div className="cell slim50">{service.prix_max} €</div>
            <div className="cell slim120">{service.date?.slice(0, 16).replace('T', ' ')}</div>
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
          <div className="cell">service</div>
          <div className="cell slim50">Max</div>
          <div className="cell slim50">Prix</div>
          <div className="cell slim50">pay</div>
          <div className="cell slim120">Date</div>
          <div className="cell">Prestataire</div>
        </div>
        {
          services.filter(s=>s.statut>0 && s.statut<10).map((service) => {
            const prestation = getCurrentPrestation(service);
            const prix = prestation.prix_pretataire ? `${prestation.prix_pretataire} €` : <FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" style={{}}/>;
            const pay = prestation.statut == 3 ? <FontAwesomeIcon icon={all.faCreditCard} className="burger" style={{color: "green"}}/> : <FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" style={{}}/>;

            return <>
              <div className={"row service_"+service.id+""}>
                <div className="cell">{service.label}</div>
                <div className="cell slim50">{service.prix_max} €</div>
                <div className="cell slim50">{prix}</div>
                <div className="cell slim50">{pay}</div>
                <div className="cell slim120">{service.date?.slice(0, 16).replace('T', ' ')}</div>
                <div className="cell">
                  { prestation.prestataire ? <>{prestation.prestataire.nom}</> : <>-</> }
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
          <div className="cell">service</div>
          <div className="cell slim50">Max</div>
          <div className="cell slim50">Prix</div>
          <div className="cell slim50">pay</div>
          <div className="cell slim120">Date</div>
          <div className="cell">Prestataire</div>
          <div className="cell slim80">Note</div>
        </div>
        {
          services.filter(s=>s.statut==10).map((service) => {
            const prestation = getCurrentPrestation(service);
            console.log({Meow: prestation.id});

            const prix = prestation.prix_pretataire ? `${prestation.prix_pretataire} €` : <FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" style={{}}/>;
            const pay = prestation.statut == 3 ? <FontAwesomeIcon icon={all.faCreditCard} className="burger" style={{color: "green"}}/> : <FontAwesomeIcon icon={all.faClockRotateLeft} className="burger" style={{}}/>;

            return <>
              <div className={"row service_"+service.id+""}>
                <div className="cell">{service.label}</div>
                <div className="cell slim50">{service.prix_max} €</div>
                <div className="cell slim50">{prix}</div>
                <div className="cell slim50">{pay}</div>
                <div className="cell slim120">{service.date?.slice(0, 16).replace('T', ' ')}</div>
                <div className="cell">
                  { prestation.prestataire ? <>{prestation.prestataire.nom}</> : <>-</> }
                </div>
                <div className="cell slim80">
                  <div style={{display: prestation ? 'inline': 'none'}} data-prestationid={prestation.id}  data-serviceid={service.id} onMouseLeave={mouseLeave}>
                  {
                    [1,2,3,4,5].map(i => <FontAwesomeIcon icon={all.faStar} className={"Star Star"+i+ (prestation.note && i<=prestation.note ? " level-"+prestation.note:"")} data-serviceid={service.id} data-prestationid={prestation.id} data-level={i} data-currentnote={prestation.note} onMouseEnter={mouseEnter} onClick={notation}/>)
                  }
                  </div>
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