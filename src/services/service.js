import api from 'services/requester';
import { notifier } from 'components/Notifications';

export default {
    gets: () => {
        return api.get(`/services?cache=${Math.random()}`)
        .then((response)=> response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error});
            return [];
        });
    },

    get: (id) => {
        return api.get(`/services/${id}?cache=${Math.random()}`)
        .then((response)=> response.status === 200 ? response.data : {})
        .catch(function (error) {
            console.log({error})
            return {};
        });
    },

    getPrestataireServices: (id_prestataire) => {
        if([undefined, null].includes(id_prestataire)){
            return [];
        }

        return api.get(`/services/prestataire/${id_prestataire}?cache=${Math.random()}`)
        .then((response)=> response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error})
            return [];
        });
    },

    getVoyageurServices: (id_voyageur) => {
        if([undefined, null].includes(id_voyageur)){
            return [];
        }

        return api.get(`/services/voyageur/${id_voyageur}?cache=${Math.random()}`)
        .then((response)=> response.status === 200 ? response.data : [])
        .catch(function (error) {
            console.log({error})
            return [];
        });
    },

    setPrestataire: (id, id_prestataire) => {
        return api.post(`/services/${id}/set/prestataire`,{id_prestataire})
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                if(id_prestataire > 0) {
                    notifier('success', `Prestation affecté au Prestataire`);
                } else {
                    notifier('success', `Préstation retirée au préstataire`);
                }
                return response.data;
            }
        }).catch(function (error) {
            notifier('error', `Erreur d'affectation du préstataire'`);
            console.log({error});
            return false;
        });
    },

    addService: (formData) => {
        return api.post(`/services/ajout`,formData)
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                notifier('success', `Demande crée avec succes`);
                return true;
            }
        }).catch(function (error) {
            notifier('error', `Erreur d'ajout de service`);
            console.log({error});
            return false;
        });

    },
}
