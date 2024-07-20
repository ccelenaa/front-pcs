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

    getVoyageurServices: (id_voyageur) => {
        if([undefined, null].includes(id_voyageur)){
            return [];
        }

        return axios({
            method: 'get',
            url: `${API_URL}/services/voyageur/${id_voyageur}?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
        }).then((response)=> response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error})
            return [];
        });
    },

    setPrestataire: (id, id_prestataire) => {
        return axios({
            method: 'post',
            url: `${API_URL}/services/${id}/set/prestataire`,
            responseType: 'json',
            withCredentials: true,
            data: {
                id_prestataire
            }
        }).then((response) => response.status === 200 ? response.data : {})
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

}
