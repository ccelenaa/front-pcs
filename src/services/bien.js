import axios from 'axios';
import { API_URL } from '../Config';
import api from './requester';
import { notifier } from 'components/Notifications';

export default {
    gets: () => {
        return api.get(`/biens?cache=${Math.random()}`)
        .catch(function (error) {
            console.log({error});
            return [];
        });
    },

    get: (id) => {
        return api.get(`/biens/${id}?cache=${Math.random()}`)
        .then((response) => response.status === 200 ? response.data : {})
        .catch(function (error) {
            console.log({error});
            return {};
        });
    },

    getBailleur: () => {
        return api.get(`/biens/bailleurs/me?cache=${Math.random()}`)
        .catch(function (error) {
            console.log({error});
            return [];
        });
    },

    add: (formData) => {
        return api.post(`/biens/ajout`,formData)
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Votre bien est crée avec succes`);
                return true;
            }
        }).catch(function (error) {
            notifier('error', `Erreur d'ajout du bien`);
            console.log({error});
            return false;
        });
    },

    valider: (id, valider) => {
        return api.post(`/biens/validation/${id}`,{valider})
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Bien ${valider?'validé':'invalidé'}`);
                return response.data;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de validation de bien`);
            console.log({error});
            return false;
        });
    },

    suspendre: (id, suspendre) => {
        return api.post(`/biens/suspenssion/${id}`,{suspendre})
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Bien ${suspendre?'suspendu':'réintégré'}`);
                return response.data;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de suspension du bien`);
            console.log({error});
            return false;
        });
    },

    bailleur_suspendre: (id, suspendre) => {
        return api.post(`/biens/bailleur-suspenssion/${id}`,{suspendre})
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Bien ${suspendre?'suspendu':'réintégré'}`);
                return response.data;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de suspension du bien`);
            console.log({error});
            return false;
        });
    },
}
