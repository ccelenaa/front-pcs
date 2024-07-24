import api from 'services/requester'
import {notifier} from 'components/Notifications'

export function setConnexion(connected) {
    var [html] = document.getElementsByTagName('html');

    if (connected) {
        html.classList.add('connected');
    } else {
        html.classList.remove('connected');
    }
}

function getUser(event) {
    return api.get(`/comptes/moi`);
}

export function isConnected() {
    return getUser();
}

export function getUserData(event) {
    return getUser(event)
        .then(response => response.status === 200 ? response.data : null)
        .catch(err => null);
}

export function login(data) {
    return api.post(`/auth/signin`,data)
    .then(function (response) {
        if (200 <= response.status < 400) {
            isConnected().then((res) => {
                if (200 <= res.status < 400) {
                    window.location.assign("/");
                }
            })
        }
    }).catch((error) => {
        notifier('auth-error', `Authentification echouée pour "${data.login}"`);
        if (error.response.status === 401) {
            setConnexion(false);
        }
    });
}

export function logout(event) {
    return api.post(`/auth/signout`)
    .then(function (response) {
        window.location.reload(true);
    }).catch(console.log);
}
