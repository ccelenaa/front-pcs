import axios from 'axios';
import { API_URL } from '../Config';

export default {
    gets: (event) => {
        return axios({
            method: 'get',
            url: `${API_URL}/langues?cache=${Math.random()}`,
            responseType: 'json',
            withCredentials: true,
        }).then((response) => {
            if(response.status === 200) {
                return response.data;
            }
            return [];
        }).catch(function (error) {
            console.log({error})
            return [];
        });
    },
}
