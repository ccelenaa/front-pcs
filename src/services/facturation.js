import { API_URL } from '../Config';

export default class Facturation {
  static prestations = async () => {
    return await fetch(
      `${API_URL}/facturations/prestataires`,
      {
        method: 'get',
        credentials: 'include',
      }).then(res => {
        return res.json();
      });
  }

  static nexts = async () => {
    return await fetch(
      `${API_URL}/facturations/prestataires/next`,
      {
        method: 'get',
        credentials: 'include',
      }).then(res => {
        return res.json();
      });
  }
}