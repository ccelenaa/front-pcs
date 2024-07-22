import axios from 'axios';
import { API_URL } from '../Config';
import { notifier } from 'components/Notifications';

export default {
    get: (id) => {
        return axios({
            method: 'get',
            url: `${API_URL}/bailleurs/${id}?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
            // headers: {
            //     'Cache-Control': 'no-cache',
            //     'Pragma': 'no-cache',
            //     'Expires': '0',
            // }
        }).then((response) => response.status === 200 ? response.data : null)
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    gets: (event) => {
        return axios({
            method: 'get',
            url: `${API_URL}/bailleurs?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
            // headers: {
            //     'Cache-Control': 'no-cache',
            //     'Pragma': 'no-cache',
            //     'Expires': '0',
            // }
        }).catch(function (error) {
            console.log({error})
            return null;
        });
    },

    valider: (id, valider) => {
        return axios({
            method: 'post',
            url: `${API_URL}/bailleurs/validation/${id}`,
            responseType: 'json',
            withCredentials: true,
            data: {
                valider
            }
        }).then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Bailleur ${valider?'validé':'invalidé'}`);
                return response.data;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de validation du Bailleur`);
            console.log({error});
            return null;
        });
    },

    suspendre: (id, suspendre) => {
        return axios({
            method: 'post',
            url: `${API_URL}/bailleurs/suspenssion/${id}`,
            responseType: 'json',
            withCredentials: true,
            data: {
                suspendre
            }
        }).then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Bailleur ${suspendre?'suspendu':'réintégré'}`);
                return response.data;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de suspension du Bailleur`);
            console.log({error});
            return null;
        });
    },
}
