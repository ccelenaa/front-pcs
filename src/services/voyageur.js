import axios from 'axios';
import { API_URL } from '../Config';
import { notifier } from 'components/Notifications';

export default {
    get: (id) => {
        return axios({
            method: 'get',
            url: `${API_URL}/voyageurs/${id}?cache=${Math.random()}`,
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
            url: `${API_URL}/voyageurs?cache=${Math.random()}`,
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
            url: `${API_URL}/voyageurs/validation/${id}`,
            responseType: 'json',
            withCredentials: true,
            data: {
                valider
            }
        }).then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Voyageur ${valider?'validé':'invalidé'}`);
                return response.data;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de validation du Voyageur`);
            console.log({error});
            return null;
        });
    },

    suspendre: (id, suspendre) => {
        return axios({
            method: 'post',
            url: `${API_URL}/voyageurs/suspenssion/${id}`,
            responseType: 'json',
            withCredentials: true,
            data: {
                suspendre
            }
        }).then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Voyageur ${suspendre?'suspendu':'réintégré'}`);
                return response.data;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de suspension du Voyageur`);
            console.log({error});
            return null;
        });
    },
}
