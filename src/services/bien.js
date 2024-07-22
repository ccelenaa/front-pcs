import axios from 'axios';
import { API_URL } from '../Config';
import { notifier } from 'components/Notifications';

export default {
    gets: () => {
        return axios({
            method: 'get',
            url: `${API_URL}/biens?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
        }).catch(function (error) {
            console.log({error});
            return [];
        });
    },

    get: (id) => {
        return axios({
            method: 'get',
            url: `${API_URL}/biens/${id}?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
        }).then((response) => response.status === 200 ? response.data : {})
        .catch(function (error) {
            console.log({error});
            return {};
        });
    },

    getBailleur: () => {
        return axios({
            method: 'get',
            url: `${API_URL}/biens/bailleurs/me?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
        }).catch(function (error) {
            console.log({error});
            return [];
        });
    },

    add: (formData) => {
        return axios({
            method: 'post',
            url: `${API_URL}/biens/ajout`,
            responseType: 'json',
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: formData
        }).then((response) => {
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
        return axios({
            method: 'post',
            url: `${API_URL}/biens/validation/${id}`,
            responseType: 'json',
            withCredentials: true,
            data: {
                valider
            }
        }).then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Bien ${valider?'validé':'invalidé'} avec succes`);
                return true;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de validation de bien`);
            console.log({error});
            return false;
        });
    },

    suspendre: (id, suspendre) => {
        return axios({
            method: 'post',
            url: `${API_URL}/biens/suspenssion/${id}`,
            responseType: 'json',
            withCredentials: true,
            data: {
                suspendre
            }
        }).then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Bien ${suspendre?'suspendu':'réintégré'} avec succes`);
                return true;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de suspension du bien`);
            console.log({error});
            return false;
        });
    },

    bailleur_suspendre: (id, suspendre) => {
        return axios({
            method: 'post',
            url: `${API_URL}/biens/bailleur-suspenssion/${id}`,
            responseType: 'json',
            withCredentials: true,
            data: {
                suspendre
            }
        }).catch(function (error) {
            console.log({error})
            return null;
        });
    },
}
