import api from 'services/requester'
import { notifier } from 'components/Notifications';

export default {
    get: (id) => {
        return api.get(`/prestataires/${id}?cache=${Math.random()}`)
        .then((response) => response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    gets: (event) => {
        return api.get(`/prestataires?cache=${Math.random()}`)
        .then((response) => response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    valider: (id, valider) => {
        return api.post(`/prestataires/validation/${id}`,{valider})
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Prestataire ${valider?'validé':'invalidé'}`);
                return response.data;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de validation du prestataire`);
            console.log({error});
            return null;
        });
    },

    suspendre: (id, suspendre) => {
        return api.post(`/prestataires/suspenssion/${id}`,{suspendre})
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Prestataire ${suspendre?'suspendu':'réintégré'}`);
                return response.data;
            }
        }).catch(function (error) {
            notifier('error', `Erreur de suspension du Prestataire`);
            console.log({error});
            return null;
        });
    },
}
