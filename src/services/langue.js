import api from 'services/requester';

export default {
    gets: (event) => {
        return api.get(`/langues?cache=${Math.random()}`)
        .then((response) => {
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
