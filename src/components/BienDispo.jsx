

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
  const years = Array.from({ length: 4 }, (_, index) => currentYear - 1 + index);

  const {id} = useParams();

  const [bien, setbien] = React.useState(null);

  const setB = async () => {
    setbien(await bienService.get(id));
  };

  React.useEffect(() => {
    setB();
  }, []);

  const yearChange = (event) => {
    const year = event.currentTarget.dataset.year;
    setSelectedYear(year);
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
      {years.map((year) => (
        <div className={`tab${year==selectedYear ? " selected" : ""}`} data-year={year} onClick={yearChange} style={{}}>
          {year}
        </div>
      ))}      

    </div>
    {
      console.log({locations: bien.locations})
    }
    <Calendar availabilities={bien.locations} year={selectedYear}/>
  </>)
}