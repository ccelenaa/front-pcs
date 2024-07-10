import React from 'react';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import prestationService from '../../services/prestation';
import prestataireService from '../../services/prestataire';

export default function Prestations(props) {

  const [prestations, setPrestations] = React.useState([]);
  const [prestataires, setPrestataires] = React.useState([]);

  React.useEffect(async () => {
    setPrestations(await prestationService.gets());
    setPrestataires(await prestataireService.gets());
  },[]);

  const changePrestataire = (event) => {
    const prestation_id = event.currentTarget.dataset.prestationid;
    const prestataire_id = event.currentTarget.value;

    prestationService.setPrestataire(prestation_id, prestataire_id).then((u) => {
      setPrestations(prestations.map(p => p.id == u.id ? u : p));
    });
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Voyageur</div>
        <div className="cell">Prestation</div>
        <div className="cell slim80">Note</div>
        <div className="cell">Prestataire</div>
        <div className="cell slim120">Date</div>
      </div>
      {
        prestations.map((prestation) => 
          <>
            <div className={"row prestation_"+prestation.id+""}>
              <div className="cell">{prestation.voyageur.nom}</div>
              <div className="cell">{prestation.service.label}</div>
              <div className="cell slim80">
                <div style={{display: prestation.prestataire ? 'inline': 'none'}} data-prestationid={prestation.id}>
                {
                  [1,2,3,4,5].map(i => <FontAwesomeIcon icon={all.faStar} className={"Star Star"+i+ (prestation.note && i<=prestation.note ? " level-"+prestation.note:"")} data-prestationid={prestation.id} data-level={i}/>)
                }
                </div>
              </div>
              <div className="cell">
                <select onChange={changePrestataire} data-prestationid={prestation.id} className={prestation.prestataire ? "assigned":""}>
                  {
                    prestation.prestataire ? <>
                      <option key="null" value="null">
                        {prestation.prestataire.nom}
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
              <div className="cell slim120">{prestation.date_prestation?.slice(0, 16).replace('T', ' ')}</div>
            </div>
          </>
        )
      }
    </div>
  </>)
}