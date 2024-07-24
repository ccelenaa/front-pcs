import api from 'services/requester'
import { notifier } from 'components/Notifications';

export default {
    get: (id) => {
        return api.get(`/voyageurs/${id}?cache=${Math.random()}`)
        .then((response) => response.status === 200 ? response.data : null)
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    gets: (event) => {
        return api.get(`/voyageurs?cache=${Math.random()}`)
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    valider: (id, valider) => {
        return api.post(`/voyageurs/validation/${id}`,{valider})
        .then((response) => {
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
        return api.post(`/voyageurs/suspenssion/${id}`,{suspendre})
        .then((response) => {
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
