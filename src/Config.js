let {env: {API_URL: API} = {API_URL: undefined}} = window;
console.log({API});

if(API === undefined) {
    var fullDomain = window.location.hostname;
    
    var domainParts = fullDomain.split('.');
    
    if (domainParts.length > 2) {
        // Si le domaine a un sous-domaine, combine les deux dernières parties
        API = domainParts.slice(domainParts.length - 2).join('.');
    } else {
        // Si le domaine n'a pas de sous-domaine, utilise le nom de domaine complet
        API = fullDomain;
    }
    console.log({API});

    API = `https://api.${API}`;
}

console.log({API});
export const API_URL = API;