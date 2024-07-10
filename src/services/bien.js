import axios from 'axios';
import { API_URL } from '../Config';

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

    valider: (id, valider) => {
        return axios({
            method: 'post',
            url: `${API_URL}/biens/validation/${id}`,
            responseType: 'json',
            withCredentials: true,
            data: {
                valider
            }
        }).catch(function (error) {
            console.log({error})
            return null;
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
        }).catch(function (error) {
            console.log({error})
            return null;
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
