import React, { useState, useEffect } from 'react';
import ModalImage from '../commun/ModalImage';
import Banner from '../header/Banner';
import AsideCommon from '../aside/Common';
import {getHome} from '../../services/home';
import { Since } from './../../utils/date.ts';

const founder1 = '/public/images/ihaggarene6.jpg';
const founder2 = '/public/images/founders.png';

export default function Home(props) {
  const [isOpen, setModalOpen] = useState(false);

  document.getElementsByTagName('html')[0].scrollTop = 0;
  const [home, setHome] = React.useState(null);
  useEffect(() => {
      getHome(null).then((response) => {

      if (response.status === 200) {
        console.log({home: response.data});
        setHome(response.data);
      }
    });
  },[]);

  return !home ? (<></>) : 
  (
    <>
      <ModalImage isOpen={isOpen} url={'/static/media/village5.17e7675e.jpg'} close={() => setModalOpen(false)}></ModalImage>
      <Banner covers={home.covers ?? {meow:'kkkk'}}/>
      <div class="body-content-inner">
        <AsideCommon {...props}/>
        <div class="main-container" style={{width:'100%'}}>
          <div class="main-content">
            <div className="deep-content">
              <div className="in-deep">
                {
                  home.publications.map((publication) => 
                    <>
                      <div className="" data-date={publication.pined_at}
                      style={{
                        display: 'flex',
                        verticalAlign: 'middle',
                        marginTop: '10px'
                      }}>
                        <div style={{
                          minHeight: '45px',
                          minWidth: '45px',
                          borderRadius: '500px',
                          backgroundColor: 'rgba(0,10,30,0.1)',
                          display: 'inline-block',
                          marginRight: '10px',
                        }}></div>
                        <div style={{
                          padding: '8px 5pax',
                          display: 'inline-block',
                          marginRight: '7px',
                          fontWeight: 'bold'
                        }} className="organization">{props.organization.name} </div>
                        <span style={{
                          color: 'rgba(0,20,50,0.5)',
                        }} className="createdAt" data-date={publication.pined_at}>{Since(new Date(publication.pined_at))}</span>
                      </div>
                      <div style={{marginBottom: '50px'}} dangerouslySetInnerHTML={{ __html: publication.content.content }}></div>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}