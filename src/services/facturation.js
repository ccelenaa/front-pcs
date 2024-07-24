import api from 'services/requester';

export default class Facturation {
  static prestations = async () => {
    return api.get(`/facturations/prestataires`)
    .then(res => res.data);
  }

  static nexts = async () => {
    return api.get(`/facturations/prestataires/next`)
    .then(res => res.data);
  }
}