
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { API_URL } from './../../Config';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TopMenu(props) {
  const organization = props.organization;

  const getNameStyle = () => {
    return organization.data?.styles?.name ? organization.data.styles.name : {};
  }

  const handleClick = async (event) => {};

  const hideMenu = async (e) => {
    var [html] = document.getElementsByTagName('html');
    html.classList.remove('burger-menu-opened');
    goTop(e);
  };

  const goTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    //document.getElementsByTagName('html')[0].scrollTop = 0;
  };

  const menu = (event) => {
    var [html] = document.getElementsByTagName('html');

    if (html.classList.contains('burger-menu-opened')) {
      html.classList.remove('burger-menu-opened');
    } else {
      html.classList.add('burger-menu-opened');
    }
  }

  const settings = (event) => {
    // var [html] = document.getElementsByTagName('html');

    // if (html.classList.contains('settings-bloc-opened')) {
    //   html.classList.remove('settings-bloc-opened');
    // } else {
    //   html.classList.add('settings-bloc-opened');
    // }
  }

  return (
    <div className='header-container noselect'>
      <div className="menu">
        <div className="menu-block" onClick={hideMenu} style={{ overflowX: 'hidden', cursor: 'pointer' }}>
          <NavLink to="/" className="" style={{display: 'flex'}}>
            {
              (() => {
                if (props.organization.data.logo) {
                  let style = props.organization.data.logo.style;
                  style = { ...style, backgroundImage: `url(/public/images/${props.organization.data.logo.url})` };

                  return <div className="thelogo" style={style}></div>;
                } else {
                  return <></>;
                }
              })()
            }
            <div className="menu-item bold" style={{ overflowX: 'hidden' }}>
              {/* <FontAwesomeIcon icon={faDove} className="user-men" style={{
                                fontSize: "25px",
                                marginTop: "2px",
                                marginBottom: "0px",
                                marginRight: "5px",
                                marginLeft: "3px",
                                cursor: 'pointer',
                                color: '#363e5a'
                            }} />
                            <FontAwesomeIcon icon={faHome} size="2x" /> */}
              <div className="bold flower" style={getNameStyle()}>
                PCS {props.organization.name}
              </div>
            </div>
          </NavLink>
        </div>
        <div className="menu-block">
          {/* <NavLink to="/profile" onClick={hideMenu} className="">
                    <FontAwesomeIcon icon={faUniversity} className="user-men" style={{
                                fontSize: "22px",
                                marginTop: "11px",
                                marginBottom: "0px",
                                marginRight: "5px",
                                marginLeft: "3px",
                                cursor: 'pointer',
                                color: '#363e5a'
                            }} />
                    </NavLink> */}
          <NavLink to="/compte" onClick={settings} className="">
            <div className="logger" style={{ width: '40px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ height: '25px', width: '25px' }}>
                <svg className="icon icon-account" viewBox="0 0 24 24" aria-hidden="true" focusable="true" style={{ width: '25px' }}>
                  <use xlinkHref="#account">
                    <svg id="account" viewBox="0 0 24 24"><path d="M12 10.75c2.066 0 3.75-1.682 3.75-3.75S14.066 3.25 12 3.25 8.25 4.932 8.25 7s1.683 3.75 3.75 3.75zm0-6c1.24 0 2.25 1 2.25 2.25s-1 2.25-2.25 2.25-2.25-1-2.25-2.25 1-2.25 2.25-2.25zm0 7.5a8.26 8.26 0 0 0-8.25 8.25v.25h1.5v-.25A6.76 6.76 0 0 1 12 13.747a6.76 6.76 0 0 1 6.75 6.753v.25h1.5v-.25A8.26 8.26 0 0 0 12 12.25z"></path></svg>
                  </use>
                </svg>
              </div>
            </div>
          </NavLink>
          <div className="burger-zone" onClick={menu}>
            <div className="float-burger-btn">
              <div className="float-burger-line"></div>
            </div>
            <Link to="/login" className="login">
              <div className="button" role="link" onClick={handleClick}>
                login
              </div>
            </Link>
            <div className="membership" style={{ padding: '0', border: '0' }}>
              <div className="button" role="link" onClick={handleClick}>
                adhésion
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}