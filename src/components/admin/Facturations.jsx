
import React from 'react';
import Facturation from '../../services/facturation';

export default function Facturations(props) {
  // const [facturations, setFacturations] = React.useState([]);
  const [next, setNext] = React.useState(null);
  const [minutor, setMinutor] = React.useState(100);

  const update = React.useCallback(() => {
    setNext(prevNext => {
      if (prevNext !== null) {

        const rest = prevNext.rest - 1000;

        if(rest <= 0) {
          Facturation.nexts().then(data => setNext(data));
        }

        const minute = Math.max(0, rest * 100 / prevNext.interval)
        setMinutor(minute);

        return {...prevNext, rest: Math.max(0,rest)};
      }
      return prevNext;
    });
  }, []);

  React.useEffect(async () => {
    const data = await Facturation.nexts();
    setMinutor(data.rest * 100 / data.interval);
    setNext(data);

    const intervalId = setInterval(update, 1000);
    return () => clearInterval(intervalId);
  }, []);


  function formatDateDiff(diff) {
    // Conversion de la différence en millisecondes en jours, heures, minutes et secondes
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Calcul des restes pour obtenir les valeurs restantes après chaque conversion
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    return (days > 0 ? `${days} jours ` : '') + `${remainingHours}h${String(remainingMinutes).padStart(2, '0')} ${String(remainingSeconds).padStart(2, '0')}s`;
  }

  return (<>
    <div className="tab-container">
      <div className="row header">
        <div className="cell">Now</div>
        <div className="cell">Next</div>
        <div className="cell">Reste</div>
      </div>
      {
        <>
          <div className="row">
            {/* <div className="cell">{next?.previous.slice(0, 16).replace('T', ' ')}</div> */}
            <div className="cell">{next?.next.slice(0, 16).replace('T', ' ')}</div>
            <div className={"cell" + (next ? " compteur" : "")} style={{fontSize: '19px', fontWeight: '500', '--width': `${minutor}%`, textAlign: 'center'}}><div style={{background: 'rgba(16, 79, 176, 0.5)', display: "inline", borderRadius: '50px', padding: '2px 10px', color: 'white'}}>{formatDateDiff(next ? next.rest : 0)}</div></div>
          </div>
        </>
      }
    </div>
  </>)
}