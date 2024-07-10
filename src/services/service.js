import axios from 'axios';
import { API_URL } from '../Config';

export default {
    gets: () => {
        return axios({
            method: 'get',
            url: `${API_URL}/services?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
        }).then((response)=> response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error});
            return [];
        });
    },

    get: (id) => {
        return axios({
            method: 'get',
            url: `${API_URL}/services/${id}?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
        }).then((response)=> response.status === 200 ? response.data : {})
        .catch(function (error) {
            console.log({error})
            return {};
        });
    },

    getPrestataireServices: (id_prestataire) => {
        if([undefined, null].includes(id_prestataire)){
            return [];
        }

        return axios({
            method: 'get',
            url: `${API_URL}/services/prestataire/${id_prestataire}?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
        }).then((response)=> response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error})
            return [];
        });
    },

}
