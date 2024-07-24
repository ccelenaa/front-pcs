
import { loadStripe } from '@stripe/stripe-js';
import api from 'services/requester';
import { notifier } from 'components/Notifications';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51P7zLsLAPUg4SYkPM4Kqy0st6kN5KrZwMcEaz3fOImGOtdhHK5Q1y8FwIM3ZyetykAHtSfFl9O3n0GAKuSkdj4mO00ZccwCL1k');

export default class Payment {
  static prestation = async (id) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const session = await api.post(`/payments/prestations/${id}`).then(r=r.data);

    if (stripe) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      // if (result.error) {
      //   // If `redirectToCheckout` fails due to a browser or network
      //   // error, display the localized error message to your customer
      //   // using `result.error.message`.
      // }
    } else {

    }
  };

  static location = async (id, date_debut, date_fin) => {
    const stripe = await stripePromise;    
    if (stripe) {
      const session = await api.post(`/payments/locations/${id}`,{date_debut,date_fin})
      .then((response) => {
        if(response.status >= 200 && response.status < 300) {
            return response.data;
        }
      }).catch(function (error) {
        if (error.response) {
          const status = error.response.status;
      
          if (status === 409) {
            notifier('error', `Bien indisponible pour ces dates`);
            return null;
          } else if (status === 400) {
            notifier('error', `Dates incorrectes`);
            return null;
          } else {
            notifier('error', `Erreur de paiement`);
            return null;
          }
        } else {
          // Si error.response n'existe pas, gérer les autres types d'erreurs (e.g., réseau)
          notifier('error', `Erreur de réseau`);
          return null;
        }
      });

      if(session){
        const result = await stripe.redirectToCheckout({
          sessionId: session.id
        });

        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        }
      }
    } else {

    }
  };

  static updatePayment = async (session) => {
    return api.get(`/payments/${session}/update`);
  };

  static voyageurTransactions = async () => {
    return api.get(`/voyageurs/transactions`)
    .then(res => res.data);
  };

  // static download_receipt = async (file) => {
  //   return await fetch(
  //     `${API_URL}/payments/receipts/${file}`,
  //     {
  //       method: 'get',
  //       credentials: 'include',
  //     });
  // };

}