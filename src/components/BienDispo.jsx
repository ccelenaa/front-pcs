

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import bienService from '../services/bien';
import { useParams } from 'react-router-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from './Calendar';

export default function Dispo(props) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const years = Array.from({ length: 3 }, (_, index) => currentYear + index);

  const {id} = useParams();

  const [bien, setbien] = React.useState(null);

  const setB = async () => {
    setbien(await bienService.get(id));
  };

  React.useEffect(() => {
    setB();
  }, []);

  const yearChange = (event) => {
    setSelectedYear(+document.getElementById('year-select').value);
  }

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
      <div className='tab1' style={{display: 'flex', alignItems: 'center', width: '200px'}}>
        <select id="year-select" onChange={yearChange} style={{width: '100%'}}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>


    <Calendar availabilities={bien.locations} year={selectedYear}/>
  </>)
}