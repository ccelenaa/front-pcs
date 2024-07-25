import React from 'react';
import prestataireService from '../../services/prestataire';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackLink from 'components/widgets/BackLink';

export default function Prestataire(props) {
  const {id} = useParams();

  const [prestataire, setPrestataire] = React.useState(null);
  const init = async () => {
    setPrestataire(await prestataireService.get(id));
  }

  React.useEffect(() => {
    init();
  }, []);


  const validation = (event) => {
    const valider = event.target.checked;
    prestataireService.valider(prestataire.id, valider)
    .then(p => setPrestataire(p?p:prestataire));
  }
  
  const suspension = (event) => {
    const suspendre = event.target.checked;
    prestataireService.suspendre(prestataire.id, suspendre)
    .then(p => setPrestataire(p?p:prestataire));
  }

  if(!prestataire) {
    return <></>
  }

  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <BackLink backlink="/prestataires"/>
      </div>
    </div>

    <div className="tab-container admin">
      <div className="row header">
        <div className="cell center title">Administration</div>
      </div>
      <div className="row">
        <div className="cell slim200">Admin Validation</div>
        {
          prestataire.date_validation == null
          ? <div className="cell"><input type="checkbox" onChange={validation}/></div>
          : <div className="cell cgreen"><FontAwesomeIcon icon={all.faCheck} className="burger"/> {prestataire.date_validation?.slice(0, 16).replace('T', ' ')}</div>
        }
      </div>
      <div className="row">
        <div className="cell slim200">Admin Suspension</div>
        <div className="cell"><input type="checkbox" defaultChecked={prestataire.date_suspension !== null} onChange={suspension} title={prestataire.date_suspension?.slice(0, 16).replace('T', ' ')} style={{display: prestataire.date_validation === null ? "none" : "initial"}}/></div>
      </div>
    </div>

    <div className="tab-container">
      <div className="row header">
        <div className="cell center title">Prestataire</div>
      </div>
      <div className="row">
        <div className="cell slim120">Nom</div>
        <div className="cell">{prestataire.nom}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Login</div>
        <div className="cell">{prestataire.login}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Email</div>
        <div className="cell">{prestataire.email}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Telephone</div>
        <div className="cell">{prestataire.telephone}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Prestations</div>
        <div className="cell">{prestataire.prestations?.length}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Inscription</div>
        <div className="cell">{prestataire.date_creation}</div>
      </div>
    </div>
  </>)
}