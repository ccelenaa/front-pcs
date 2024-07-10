

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import bienService from '../../services/bien';
import Payment from 'services/payment';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

export default function Biens(props) {
  const {id} = useParams();

  const [bien, setbien] = React.useState({});

  React.useEffect(async () => {
    setbien(await bienService.get(id));
  }, []);

  const louer = () => {
    Payment.location(id);
  }

  return (<>
    <NavLink to="/biens">Retour</NavLink>
    <div className="tab-container">
      <div className="row">
        <div className="cell slim120">Type</div>
        <div className="cell">{bien.type}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Statut</div>
        <div className="cell">{bien.statut}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Surface</div>
        <div className="cell">{bien.surface}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Prix</div>
        <div className="cell">{(bien.prix*1.1).toFixed(2)} {bien.devise}</div>
      </div>
      <div className="row">
        <div className="cell slim120">Description</div>
        <div className="cell">{bien.description}</div>
      </div>
    </div>
    <input type="date"/>
    <input type="date"/>
    <button onClick={louer}>Location</button>
  </>)
}