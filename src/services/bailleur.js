import axios from 'axios';
import { API_URL } from '../Config';

export default {
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
        }).catch(function (error) {
            console.log({error})
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
        }).catch(function (error) {
            console.log({error})
            return null;
        });
    },
}
