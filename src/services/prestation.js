import api from 'services/requester';
import {notifier} from '../components/Notifications';

export default {
    gets: () => {
        return api.get(`/prestations?cache=${Math.random()}`)
        .then((response) => response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error});
            return [];
        });
    },

    parVoyageur: (id_voyageur) => {
        return api.get(`/prestations/voyageur/${id_voyageur}?cache=${Math.random()}`)
        .then((response) => response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error});
            return [];
        });
    },

    get: (id) => {
        return api.get(`/prestations/${id}`)
        .then((response) => response.status === 200 ? response.data : {})
        .catch(function (error) {
            console.log({error})
            return null;
        });
    },

    setNote: (id,note) => {
        return api.post(`/prestations/${id}/set/note`,{note})
        .then((response) => {
            if(response.status === 200) {
                const prestation = response.data;
                notifier('note', `+${prestation.note} pour ${prestation.prestataire.nom}`);
                return prestation;
            }
            return {};
        }).catch(function (error) {
            console.log({error})
            return null;
        });
    },

    terminee: (id) => {
        return api.post(`/prestations/${id}/terminee`)
        .then((response) => {
            if(response.status === 200) {
                const prestation = response.data;
                notifier('success', `La prestation est terminée`);
                return prestation;
            }
            return {};
        }).catch(function (error) {
            notifier('success', `Erreur ...`);
            console.log({error})
            return null;
        });
    },

    setPrix: (id,prix_prestataire) => {
        return api.post(`/prestations/${id}/set/prix`,{prix_prestataire})
        .then((response) => {
            if(response.status === 200) {
                const prestation = response.data;
                notifier('success', `Affectation de prix`);
                return prestation;
            }
            return {};
        }).catch(function (error) {
            notifier('error', `Erreur d'affectation de prix`);
            console.log({error})
            return null;
        });
    },

}
