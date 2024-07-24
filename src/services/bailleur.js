import api from 'services/requester';
import { notifier } from 'components/Notifications';

export default {
    get: (id) => {
        return api.get(`/bailleurs/${id}?cache=${Math.random()}`)
        .then((response) => response.status === 200 ? response.data : null)
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    gets: (event) => {
        return api.get(`/bailleurs?cache=${Math.random()}`)
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    valider: (id, valider) => {
        return api.post(`/bailleurs/validation/${id}`,{valider})
        .then((response) => {
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
        return api.post(`/bailleurs/suspenssion/${id}`, {suspendre})
        .then((response) => {
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
