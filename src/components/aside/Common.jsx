
import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import {
  faUniversity,
  faDove,
  faUser,
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
  faPen,
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
  faPhoneVolume
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AsideCommon(props) {
  console.log('LEFT BLOCK');

  return (
    <>
      <div className="left-block" style={{ flexShrink: 0, flexBasis: '400px', backgroundColor: '#F5F7FF', position: 'relative', fontSize: '16px'}}>
        <div style={{ position: 'sticky', top: '44px', padding: '30px' }}>
          <div class="presentation">
            <div>
              <FontAwesomeIcon icon={faFlag}/>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>{props.organization.name}</div>
                <div style={{lineHeight: '10px', paddingBottom: '15px', fontSize: '15px', fontFamily: 'arial', color: 'rgba(0,20,40,0.6)'}}>@{props.organization.reference}</div>
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon={faLocationDot}/>
              <div>Bejaia, Algerie</div>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone}/><div>06.98.24.57.21</div>
            </div>
            <div>
              <FontAwesomeIcon icon={faPenAlt}/><div>iheggaren@gmail.com</div>
            </div>
            <div>
              <FontAwesomeIcon icon={faClockRotateLeft}/><div>16 Sep 2022</div>
            </div>
            <div style={{marginTop: '20px'}}>
            <FontAwesomeIcon icon={faArrowRightLong}/><div>Iheggaren est une association ayant pour objectifs l'union, solidarité de tout les enfants du village d'iheggaren</div>
            </div>
            <div style={{marginTop: '20px'}}>
              <FontAwesomeIcon icon={faUnlockKeyhole}/>
              <div><span>iheggaren</span><span>solidarité</span><span>union</span></div>
            </div>
          </div>
          {/* <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <div style={{ textAlign: 'justify' }}>
            <h3 style={{ textAlign: 'center' }}>Communiqué</h3>
            <p>
              Toute l’équipe des « Enfants d’Ihaggarene »tient à vous remercier pour l’intérêt que vous avez porté au lancement de notre association via  notre  site internet. Merci à tous ceux qui ont dores et déjà répondu à l’appel en confirmant leur adhésion.<br />
              Nous sommes également touchés par les nombreux messages de soutien et d’encouragements reçus sur la messagerie de l’association.<br />
            </p>
            <h3 style={{ textAlign: 'center' }}>Communiqué</h3>
            <p>
              Nous invitons chacun d’entre vous à nous rejoindre très vite en compagnie de vos proches.<br />
              Nous profitons de ce message pour réitérer  notre appel à toutes bonnes volontés souhaitant participer activement à l’animation du site internet et à l’organisation d’évènements futurs.<br />
            </p>
            <h3 style={{ textAlign: 'center' }}>Condoléances</h3>
            <p>
              C'est avec une grande émotion que nous avons appris le décès de Monsieur M'Hand Arab.
              Toutes nos condoléances à la famille Arab, nos pensées sont avec vous.
            </p>
          </div>
          <br /> */}
          <br />
        </div>
      </div>
    </>
  )
}