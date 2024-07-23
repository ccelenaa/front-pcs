

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import bienService from '../services/bien';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from './Calendar';

export default function Dispo(props) {
  
  const {id} = useParams();

  const [bien, setbien] = React.useState(null);

  React.useEffect(async () => {
    setbien(await bienService.get(id));
  }, []);

  if(!bien) {
    return <></>
  }

  return (<>
    <div className="tableur">
      <div className='tab ajout'>
        <NavLink to={`/biens/${bien.id}`} className="" style={{borderRadius: "50px", padding: "4px 10px", height: "100%"}}>
          <FontAwesomeIcon icon={all.faArrowLeft} />
        </NavLink>
      </div>
    </div>

    <Calendar availabilities={bien.locations} />
  </>)
}