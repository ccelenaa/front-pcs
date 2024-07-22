import axios from 'axios';
import { API_URL } from '../Config';

export default {
    get: (id) => {
        return axios({
            method: 'get',
            url: `${API_URL}/prestataires/${id}?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
            // headers: {
            //     'Cache-Control': 'no-cache',
            //     'Pragma': 'no-cache',
            //     'Expires': '0',
            // }
        }).then((response) => response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    gets: (event) => {
        return axios({
            method: 'get',
            url: `${API_URL}/prestataires?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
            // headers: {
            //     'Cache-Control': 'no-cache',
            //     'Pragma': 'no-cache',
            //     'Expires': '0',
            // }
        }).then((response) => response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    valider: (id, valider) => {
        return axios({
            method: 'post',
            url: `${API_URL}/prestataires/validation/${id}`,
            responseType: 'json',
            withCredentials: true,
            data: {
                valider
            }
        }).then((response) => response.status === 200 ? response.data : {})
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    suspendre: (id, suspendre) => {
        return axios({
            method: 'post',
            url: `${API_URL}/prestataires/suspenssion/${id}`,
            responseType: 'json',
            withCredentials: true,
            data: {
                suspendre
            }
        }).then((response) => response.status === 200 ? response.data : {})
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },
}
