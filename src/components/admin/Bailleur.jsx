
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setConnexion, isConnected } from '../../services/user';
import { API_URL } from '../../Config';
import { useHistory, Link, NavLink } from 'react-router-dom';
import AsideSetting from '../aside/Settings';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bailleurService from '../../services/bailleur';
// import bienService from '../../services/bien';

export default function Bailleur(props) {

  const [bailleurs, setBailleurs] = React.useState({});
  React.useEffect(() => {
    bailleurService.getBailleurs().then((brs) => {
      if (brs.status === 200) {
        setBailleurs(brs.data);
      }
    })
  },[]);

  return (<>
    <div class="">
      Pour un seul Bailleur
    </div>
  </>)
}