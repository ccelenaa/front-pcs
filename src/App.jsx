import React, {useEffect, useState} from 'react';
import Organization from './components/Organization';
import { BrowserRouter as Router, useLocation} from 'react-router-dom';
import {setConnexion, isConnected} from './services/user';
import ProgressBar from 'components/ProgressBar';

function App() {
  isConnected(null).then((response) => {
    if (response.status === 200) {
        setConnexion(true);
    }
  }).catch((error) => {
    setConnexion(false);
  });

  return (
    <div class="size1280">
      <Router>
        <ProgressBar/>
        <Organization/>
      </Router>
    </div>
  );
}

export default App;
