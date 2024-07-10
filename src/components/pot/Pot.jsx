
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useParams } from 'react-router-dom';
import { getWallet } from '../../services/wallet';
import Utils from '../../services/payment';
import AsideCommon from '../aside/Common';

export default function Pot(props) {
  const { wallet } = useParams();

  console.log(process.env.NODE_ENV);
  console.log(process.env.WDS_SOCKET_PATH);
  console.log(process.env.REACT_APP_PUBLIC_KEY);
  console.log(process.env.PUBLIC_KEY);

  var [choice, setChoice] = React.useState(2);

  const [wallet2, setWallet] = React.useState(null);

  React.useEffect(() => {
    getWallet(wallet).then((response) => {
      if (response.status === 200) {
        setWallet(response.data);
      }
    });
  }, []);

  const click = () => {
    Utils.checkoutPrice(wallet2.prices[choice].id);
  }

  return (
    <>
      <div class="body-content-inner">
        <AsideCommon {...props}/>
        <div class="main-content">
          <div class="main-container">
            {
              wallet2 === null ? <></> : <>
                <h3 style={{ textAlign: 'center' }}>{wallet2.title}</h3>
                <div>
                  <div dangerouslySetInnerHTML={{ __html: wallet2.description }}></div>
                </div>
                <ul className="ul-menu" style={{ textAlign: 'center', margin: 'auto', margin: '30px auto', padding: '0px' }}>
                  {
                    (() => {
                      const template = (price, index) => {
                        return (
                          <li key={index} className={choice == index ? "price selected" : "price"} onClick={(e) => setChoice(index)} data-price={price.value.price}>
                            {price.value.price / 100} €
                          </li>
                        )
                      };

                      return wallet2.prices.map(function (price, index) {
                        return template(price, index);
                      });
                    })()
                  }
                </ul>
                <div style={{ margin: '10px 0px 60px 0px', textAlign: 'center' }}>
                  <button type="button" className="flat_button" style={{ padding: '5px 50px', fontSize: '20px', textTransform: 'capitalize' }} onClick={click}>Suivant</button>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}