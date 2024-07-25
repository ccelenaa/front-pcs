import React, {useEffect, useState} from 'react';
import Organization from './components/Organization';
import { BrowserRouter as Router, useLocation} from 'react-router-dom';
import {setConnexion, isConnected} from './services/user';
import ProgressBar from 'components/ProgressBar';
import Notifications from 'components/Notifications';
import { Navigator } from 'components/widgets/Navigator';

function App() {
  isConnected(null).then((response) => {
    if (response.status === 200) {
        setConnexion(true);
    }
  }).catch((error) => {
    setConnexion(false);
  });

  return (
    <>
    <Notifications/>
    <div class="global-container size1280">
      <ProgressBar/>
      <Router>
        <Navigator>
          <Organization/>
        </Navigator>
      </Router>
    </div>
    </>
  );
}

export default App;
