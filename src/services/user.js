import axios from 'axios';
import { API_URL } from '../Config';
import {notifier} from '../components/Notifications'

export function setConnexion(connected) {
    var [html] = document.getElementsByTagName('html');

    if (connected) {
        html.classList.add('connected');
    } else {
        html.classList.remove('connected');
    }
}

function getUser(event) {
    return axios({
        method: 'get',
        url: `${API_URL}/comptes/moi`,
        responseType: 'json',
        withCredentials: true
    });
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
    axios({
        method: 'post',
        url: `${API_URL}/auth/signin`,
        responseType: 'json',
        data,
        withCredentials: true
    }).then(function (response) {
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
    return axios({
        method: 'post',
        url: `${API_URL}/auth/signout`,
        responseType: 'json',
        withCredentials: true
    }).then(function (response) {
        window.location.reload(true);
    }).catch(console.log);
}
