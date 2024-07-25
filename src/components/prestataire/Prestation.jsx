

import React from 'react';
import serviceService from '../../services/service';
import prestataireService from '../../services/prestataire';
import prestationService from '../../services/prestation';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackLink from 'components/widgets/BackLink';

export default function Prestation(props) {
  const {id} = useParams();

  const [service, setService] = React.useState(null);
  const [prestataires, setPrestataires] = React.useState(null);

  const init = async () => {
    setService(await serviceService.get(id));
    setPrestataires(await prestataireService.gets());
  }

  React.useEffect(() => {
    init();
  }, []);

  const getCurrentPrestation = (service) => {
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

  const terminee = async (event) => {
    await prestationService.terminee(prestation.id);
    setService(await serviceService.get(id));
  }

  const setPrix = async (event) => {
    const prix = document.getElementById("prix_prestataire").value;
    await prestationService.setPrix(prestation.id, prix);
    setService(await serviceService.get(id));
  }

  if(!service || !prestataires) {
    return <></>;
  }

  const prestation = getCurrentPrestation(service);
  
  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <BackLink backlink="/services"/>
      </div>
    </div>

    <div className="tab-container admin">
      <div className="row header">
        <div className="cell center title">Etapes et Actions</div>
      </div>
      <div className="row">
        <div className="cell slim200">1) Prix (Prestataire)</div>
        {
          prestation.statut > 1
          ? <><div className="cell">{prestation.prix_prestataire} €</div></>
          : <><div className="cell"><input type="text" id="prix_prestataire"/><button onClick={setPrix}> &nbsp;&nbsp;&nbsp;Proposer&nbsp;&nbsp;&nbsp; </button></div></>
        }
      </div>
      <div className="row">
        <div className="cell slim200">2) Paiement (Voyageur)</div>
        {
          prestation.statut > 2
          ? <div className="cell cgreenc"><FontAwesomeIcon icon={all.faCreditCard}/></div>
          : <div className="cell"><FontAwesomeIcon icon={all.faClockRotateLeft} /></div>
        }
      </div>
      <div className="row">
        <div className="cell slim200">3) Terminé (Prestataire)</div>
        {
          prestation.statut < 3
          ? <><div className="cell"><FontAwesomeIcon icon={all.faClockRotateLeft} /></div></>
          : (
            prestation.statut == 3
            ? <><div className="cell"><button onClick={terminee}>Prestation terminée</button></div></>
            : <><div className="cell">Prestation terminée</div></>
          )
        }
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
