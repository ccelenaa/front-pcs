
import { loadStripe } from '@stripe/stripe-js';
import { API_URL } from '../Config';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51P7zLsLAPUg4SYkPM4Kqy0st6kN5KrZwMcEaz3fOImGOtdhHK5Q1y8FwIM3ZyetykAHtSfFl9O3n0GAKuSkdj4mO00ZccwCL1k');

export default class Payment {
  static prestation = async (id) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(
      `${API_URL}/payments/prestations/${id}`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({date: new Date()})
      });
    const session = await response.json();

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

  static location = async (id) => {
    const stripe = await stripePromise;    
    if (stripe) {
      const session = await fetch(
        `${API_URL}/payments/locations/${id}`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({debut: new Date(),fin: new Date()})
        }).then(res => {
          return res.json();
        });

      // When the customer clicks on the button, redirect them to Checkout.
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

  static updatePayment = async (session) => {
    return await fetch(
      `${API_URL}/payments/${session}/update`,
      {
        method: 'get',
        credentials: 'include',
      });
      // .then(res => {
      //   return res.json();
      // });
  };

  static voyageurTransactions = async () => {
    return await fetch(
      `${API_URL}/voyageurs/1/transactions`,
      {
        method: 'get',
        credentials: 'include',
      }).then(res => {
        return res.json();
      });
  };

  static download_receipt = async (file) => {
    return await fetch(
      `${API_URL}/payments/receipts/${file}`,
      {
        method: 'get',
        credentials: 'include',
      });
  };

}