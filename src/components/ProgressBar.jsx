import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const ProgressBar = () => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    // Pas de besoin supplémentaire ici, car Axios interceptera les requêtes et gérera NProgress

    return () => {
      NProgress.done();
    };
  }, []);

  return null; // Ce composant n'affiche rien lui-même
};

export default ProgressBar;