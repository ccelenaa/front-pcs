
import React, { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Route, useParams, NavLink } from 'react-router-dom';
import {
  faUniversity,
  faDove,
  faUser,
  faLock,
  faLocationDot,
  faBirthdayCake,
  faAddressBook,
  faAddressCard,
  faKeyboard,
  faKey,
  faFileWord,
  faFlag,
  faClockRotateLeft,
  faClockFour,
  faClock,
  faContactBook,
  faContactCard,
  faPenAlt,
  faUnlockKeyhole,
  faFaceFrownOpen,
  faFaceFrown,
  faArrowLeftLong,
  faArrowRightLong,
  faPhoneAlt,
  faPhone,
  faPhoneSquare,
  faPhoneFlip,
  faPhoneVolume,
  faChevronRight,
  faUserAlt, faHandshakeAngle, faFolderClosed, faShieldAlt, faPen, faCreditCard, faHaykal
} from '@fortawesome/free-solid-svg-icons';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout, setConnexion } from 'services/user';

export default function AsideSSetting(props) {
  const { menu: selected } = useParams();
  useEffect(() => {

  }, []);

  const menus = [
    {
      menu: 'profile',
      label: 'Profile',
      icon: faUser
    }, {
      menu: 'memberships',
      label: 'Adhésions',
      icon: faHandshakeAngle
    }, {
      menu: 'payments',
      label: 'Paiements',
      icon: faCreditCard
    }, {
      menu: 'messages',
      label: 'Messages',
      icon: all.faPaperPlane
    }, {
      menu: 'security',
      label: 'Sécurité',
      icon: faShieldAlt
    }, {
      menu: 'parameters',
      label: 'Parametres',
      icon: all.faCog
    }, {
      menu: 'account',
      label: 'Compte',
      icon: faFolderClosed
    }, {
      menu: 'logout',
      label: 'Compte',
      icon: all.faLock,
      action: (event) => {
        event.preventDefault();
        logout();
      }
    },
  ];

  const defalut = () => {};
  // console.log("test");
  // console.log(Object.entries(all));

  return (
    <>
      <div className="top-options-menu">
        {
          menus.map((m) => {
            return (
              <>
                <NavLink to={`/settings/${m.menu}`} className={selected === m.menu ? 'selectedd2' : ''}
                  onClick={m.action ?? defalut}
                  style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  display: 'flex',
                  borderTop: 'solid 3px transparent',
                }}>
                  <div style={{
                    display: 'flex',
                    flexShrink: '0',
                    flexGrow: '0',
                    height: '38px',
                    width: '32px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                    flexShrink: 1                    
                  }}>
                    <FontAwesomeIcon icon={m.icon} className="burger" style={{}} />
                  </div>
                  {/* {
                        selected===m.menu
                        ? <div style={{
                          height: '12px', flexShrink: '0', flexGrow: '0'
                          }}><FontAwesomeIcon icon={all['faAngleRight']} className="burger" style={{
                            marginTop: "1px"
                          }}/></div>
                        : <></>
                      }
                  */}
                </NavLink>
                </>
            )
          })
        }
      </div>
    </>
  )
}