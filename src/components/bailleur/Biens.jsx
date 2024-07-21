
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
export default function Biens(props) {

  return (<>
    <div class="">
    <NavLink to="/biens/ajout" className="">Ajouter un bien</NavLink>
    <br/>
      List des Biens
    </div>
  </>)
}