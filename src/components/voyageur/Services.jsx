import React, { useEffect, useState } from 'react';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import prestationService from '../../services/prestation';
import { NavLink } from 'react-router-dom';

export default function Services(props) {

  const [prestations, setPrestations] = React.useState([]);

  React.useEffect(async () => {
    setPrestations(await prestationService.parVoyageur(props.account.id));
  },[]);

  function apply_level(id_prestation, level) {
    if(level && id_prestation){
      const elements = document.querySelectorAll('.prestation_'+id_prestation+' .Star');
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
    const id_prestation = event.currentTarget.dataset.prestationid;
    apply_level(id_prestation, level);
  }

  function mouseLeave(event) {
    const id_prestation = event.currentTarget.getAttribute('data-prestationid');

    const elements = document.querySelectorAll('.prestation_'+id_prestation+' .Star');
    elements.forEach((e) => [1,2,3,4,5].forEach((i) => e.classList.remove('level-'+i)));

    apply_level(id_prestation, prestations.find(e=>e.id===id_prestation).note);
  }


  function notation(event) {
    const note = event.currentTarget.dataset.level;
    const currentNote = event.currentTarget.dataset.currentnote;

    if(note !== currentNote) {
      const prestation_id = event.currentTarget.dataset.prestationid;
  
      prestationService.setNote(prestation_id, +note).then((u) => {
        setPrestations(prestations.map(p => p.id == u.id ? u : p));
      });
    }
  }

  return (<>
    <NavLink to="/services/ajout" className="">Nouvelle demande de service</NavLink>
    <br/>
    <br/>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Prestation</div>
        <div className="cell">Prestataire</div>
        <div className="cell slim80">Note</div>
        <div className="cell slim120">Date</div>
      </div>
      {
        prestations.map((prestation) => 
          <>
            <div className={"row prestation_"+prestation.id+(prestation.note ? "":" notation-enabled")}>
              <div className="cell">{prestation.service.label}</div>
              <div className="cell">
                {
                  prestation.prestataire ? <>{prestation.prestataire.nom}</> : <>-</>
                }
              </div>
              <div className="cell slim80">
                <div style={{display: prestation.prestataire ? 'inline': 'none'}} data-prestationid={prestation.id} onMouseLeave={mouseLeave}>
                {
                  [1,2,3,4,5].map(i => <FontAwesomeIcon icon={all.faStar} className={"Star Star"+i+ (prestation.note && i<=prestation.note ? " level-"+prestation.note:"")} data-prestationid={prestation.id} data-level={i} data-currentnote={prestation.note} onMouseEnter={mouseEnter} onClick={notation}/>)
                }
                </div>
              </div>
              <div className="cell slim120">{prestation.date_prestation?.slice(0, 16).replace('T', ' ')}</div>
            </div>
          </>
        )
      }
    </div>
  </>)
}