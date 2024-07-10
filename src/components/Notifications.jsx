
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as all from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default () => {
  return (
    <div id="notificationBox" className="notificationBox"></div>
  )
}

const pause = (event) => {
  notificationBox.classList.add('stopped')
}

const run = (event) => {
  notificationBox.classList.remove('stopped')
}

export function notifier(type, message) {
  let element = null;
  switch (type) {
    case 'success': element = <Success data={{ message }} />; break;
    case 'note': element = <Note data={{ message }} />; break;
    case 'warning': element = <Warning data={{ message }} />; break;
    case 'error': element = <Error data={{ message }} />; break;
    case 'auth-error': element = <AuthError data={{ message }} />; break;
    case 'payment': element = <Payment data={{ message }} />; break;
    default: element = <Information data={{ message }} />; break;
  }

  const notificationBox = document.getElementById('notificationBox');
  notificationBox.removeEventListener('mouseenter', pause);
  notificationBox.removeEventListener('mouseleave', run);

  const container = document.createElement('div');
  ReactDOM.render(element, container);
  const notification = container.firstChild;
  notificationBox.appendChild(notification);

  // const firstChild = notificationBox.firstChild;
  // notificationBox.insertBefore(notification, firstChild);

  notificationBox.addEventListener('mouseenter', pause);
  notificationBox.addEventListener('mouseleave', run);

  notification.addEventListener('animationend', (event) => {
    if (event.animationName === 'consum') {
      notification.remove();
    }
  });
}

export const Information = (props) => {
  return (
    <div className='notification'>
      <div className='notification-icon'>
        <FontAwesomeIcon icon={all.faInfoCircle} />
      </div>
      <div className="notification-content">{props.data.message}</div>
    </div>
  )
}

export const Success = (props) => {
  return (
    <div className='notification'>
      <div className='notification-icon'>
        <FontAwesomeIcon icon={all.faAnchorLock} />
      </div>
      <div className="notification-content">{props.data.message}</div>
    </div>
  )
}

export const Warning = (props) => {
  return (
    <div className='notification warning'>
      <div className='notification-icon'>
        <FontAwesomeIcon icon={all.faAnchorLock} />
      </div>
      <div className="notification-content">{props.data.message}</div>
    </div>
  )
}

export const Error = (props) => {
  return (
    <div className='notification error'>
      <div className='notification-icon'>
        <FontAwesomeIcon icon={all.faAnchorLock} />
      </div>
      <div className="notification-content">{props.data.message}</div>
    </div>
  )
}

export const AuthError = (props) => {
  return (
    <div className='notification error'>
      <div className='notification-icon'>
        <FontAwesomeIcon icon={all.faLock} />
      </div>
      <div className="notification-content">{props.data.message}</div>
    </div>
  )
}

export const Note = (props) => {
  return (
    <div className='notification'>
      <div className='notification-icon'>
        <FontAwesomeIcon icon={all.faStar} />
      </div>
      <div className="notification-content">{props.data.message}</div>
    </div>
  )
}

export const Payment = (props) => {
  return (
    <div className='notification'>
      <div className='notification-icon'>
        <FontAwesomeIcon icon={all.faCreditCard} />
      </div>
      <div className="notification-content">{props.data.message}</div>
    </div>
  )
}