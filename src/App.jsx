import React, {useEffect, useState} from 'react';
import Organization from './components/Organization';
import { BrowserRouter as Router, useLocation} from 'react-router-dom';
import {setConnexion, isConnected} from './services/user';

function App() {
  // console.log('APP()');

  isConnected(null).then((response) => {
    // console.log('APP():isConnected');
    if (response.status === 200) {
        setConnexion(true);
    }
  }).catch((error) => {
      if (error.response.status === 401) {
          setConnexion(false);
      }
  });
  return (
    <div class="size1280">
      <Router>
        <Organization/>
      </Router>
    </div>
  );
}

export default App;
