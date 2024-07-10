
import React, { useState } from 'react';
import AsideCommon from '../aside/Common';
import ModalImage from '../commun/ModalImage';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';


export default function Webmaster(props) {
  const [isOpen, setModalOpen] = useState(false);
  return (
    <>
      <ModalImage isOpen={isOpen} url={'/static/media/village5.17e7675e.jpg'} close={() => setModalOpen(false)}></ModalImage>
      <div class="body-content-inner">
        <AsideCommon {...props}/>
        <div class="main-container">
          <div class="main-content">
            <div style={{ textAlign: 'justify' }}>
              <h3 style={{ textAlign: 'center' }}>Web master</h3>
              <p>
                ESGI
              </p>
              <p>
                Paris
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}