
import React, { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Route, useParams, NavLink } from 'react-router-dom';
import {
  faUser,faUnlockKeyhole,faHandshakeAngle,faUserFriends,faUserGroup,faFolderClosed,faShieldAlt,faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useTranslation } from "react-i18next";

export default function AsideSetting(props) {
  // const {menu: selected} = useParams();
  const {pathname: selected = ""} = useLocation();
  const { i18n, t } = useTranslation();

  useEffect(() => {

  },[]);

  let menus = [];
  if(props.isAuth !== 'true'){
    menus = [
      {
        menu: '/auth',
        label: 'side.auth',
        icon: faUnlockKeyhole
      },
      {
        menu: '/inscription',
        label: 'side.register',
        icon: all.faAdd
      }
    ];
  } else {
    switch(props.organization.name){
      case "admin":
        menus = [
          {
            menu: '/compte',
            label: 'side.admin.account',
            icon: faUser
          },{
            menu: '/messages',
            label: 'side.admin.messages',
            icon: all.faComment
          },{
            menu: '/biens',
            label: 'side.admin.biens',
            icon: all.faHomeLg
          },{
            menu: '/services',
            label: 'side.admin.services',
            icon: all.faHandshakeAngle
          },{
            menu: '/bailleurs',
            label: 'side.admin.bailleurs',
            icon: faUserFriends
          },{
            menu: '/voyageurs',
            label: 'side.admin.voyageurs',
            icon: faUserGroup
          },{
            menu: '/prestataires',
            label: 'side.admin.prestataires',
            icon: faUserGroup
          },{
            menu: '/facturations',
            label: 'Facturations',
            icon: faUserGroup
          },{
            menu: '/langues',
            label: 'side.admin.langues',
            icon: all.faLanguage
          },
        ]; break;
      case "bailleur":
        menus = [
          {
            menu: '/compte',
            label: 'Compte',
            icon: faUser
          },{
            menu: '/messages',
            label: 'Messages',
            icon: all.faComment
          },{
            menu: '/biens',
            label: 'Mes biens',
            icon: all.faHomeLg
          },{
            menu: '/prestations',
            label: 'Prestations',
            icon: all.faAdd
          },{
            menu: '/factures',
            label: 'Mes factures',
            icon: all.faCreditCard
          },
        ]; break;
      case "prestataire":
        menus = [
          {
            menu: '/compte',
            label: 'Compte',
            icon: faUser
          },{
            menu: '/messages',
            label: 'Messages',
            icon: all.faComment
          },{
            menu: '/services',
            label: 'Mes services',
            icon: faHandshakeAngle
          },{
            menu: '/prestations',
            label: 'Mes prestations',
            icon: faHandshakeAngle
          },{
            menu: '/planing',
            label: 'Mes disponibilités',
            icon: all.faCalendar
          },{
            menu: '/factures',
            label: 'Mes factures',
            icon: faCreditCard
          },
        ]; break;
      case "voyageur":
        menus = [
          {
            menu: '/compte',
            label: 'Compte',
            icon: faUser
          },{
            menu: '/biens',
            label: 'Biens',
            icon: all.faHomeLg
          },{
            menu: '/locations',
            label: 'Mes locations',
            icon: all.faHomeLg
          },{
            menu: '/services',
            label: 'Services',
            icon: all.faHandshakeAngle
          },{
            menu: '/paiements',
            label: 'Paiements',
            icon: faCreditCard
          },
        ];
    }
  }

  return (
    <>
      <div className="left-block" style={{ flexShrink: 0, flexBasis: '330px', backgroundColor: '#F5F7FF', position: 'relative', fontSize: '16px'}}>
        <div style={{ position: 'sticky', top: '44px', padding: '30px 0px', margin: '0 auto', maxWidth: '600px' }}>
          <div class="presentation">
            <ul>
              {
                menus.map((m) => {
                  return (
                    <li>
                      <NavLink to={m.menu} className={selected.startsWith(m.menu) ? 'selectedd': ''} style={{display: 'flex'}}>
                        <div style={{flexShrink: '0', flexGrow: '0', height: '12px', width: '25px', textAlign: 'center', paddingRight: '8px'}}>
                          <FontAwesomeIcon icon={m.icon} className="burger" style={{}}/>
                        </div>
                        <div style={{flexShrink: '1', flexGrow: '1'}}>{t(m.label)}</div>
                        {
                          selected.startsWith(m.menu)
                          ? <div style={{
                            height: '12px', flexShrink: '0', flexGrow: '0'
                            }}><FontAwesomeIcon icon={all['faAngleRight']} className="burger" style={{
                              marginTop: "1px"
                            }}/></div>
                          : <></>
                        }
                      </NavLink>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}