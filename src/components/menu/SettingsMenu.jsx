import React, { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Route, useParams, NavLink } from 'react-router-dom';
import {
  faUser,faHandshakeAngle,faFolderClosed,faShieldAlt,faPen,faCreditCard,faHaykal
} from '@fortawesome/free-solid-svg-icons';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Settings from 'components/settings/Settings';
export default function SettingsMenu(props) {

  const menus = [
    {
      menu: 'profile',
      label: 'Profile',
      icon: faUser
    },{
      menu: 'memberships',
      label: 'Adhésions',
      icon: faHandshakeAngle
    },{
      menu: 'payments',
      label: 'Paiements',
      icon: faCreditCard
    },{
      menu: 'messages',
      label: 'Messages',
      icon: all.faPaperPlane
    },{
      menu: 'security',
      label: 'Sécurité',
      icon: faShieldAlt
    },{
      menu: 'parameters',
      label: 'Parametres',
      icon: all.faCog
    },{
      menu: 'account',
      label: 'Compte',
      icon: faFolderClosed
    },
  ]

  const select = (event) => {
    var [html] = document.getElementsByTagName('html');

    if (html.classList.contains('settings-bloc-selected')) {
      html.classList.remove('settings-bloc-selected');
    } else {
      html.classList.add('settings-bloc-selected');
    }
  }

  return (
    <>
      <div className="settings-bloc">
      {/* <div className="in-settings-bloc"> */}
        <div className="gauche">
        <div style={{ flexShrink: 0, flexBasis: '400px', backgroundColor: '#F5F7FF', position: 'relative', fontSize: '16px'}}>
        <div style={{ position: 'sticky', top: '44px', padding: '30px 0px', margin: '0 auto', maxWidth: '600px' }}>
          <div class="presentation">
            <ul>
              {
                menus.map((m) => {
                  return (
                    <li>
                      <NavLink to={`/settings/${m.menu}`} onClick={select} style={{display: 'flex'}}>
                        <div style={{flexShrink: '0', flexGrow: '0', height: '12px', width: '25px', textAlign: 'center', paddingRight: '8px'}}>
                          <FontAwesomeIcon icon={m.icon} className="burger" style={{}}/>
                        </div>
                        <div style={{flexShrink: '1', flexGrow: '1'}}>{m.label}</div>
                        <div style={{
                            height: '12px', flexShrink: '0', flexGrow: '0'
                            }}><FontAwesomeIcon icon={all['faAngleRight']} className="burger" style={{
                              marginTop: "1px"
                            }}/></div>
                      </NavLink>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
        </div>
        <div className="droite">
          {/* <Settings/> */}
        </div>
      {/* </div> */}
      </div>
    </>
  )
}