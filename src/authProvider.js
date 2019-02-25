import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS  } from 'react-admin';
import decodeJwt from 'jwt-decode';
import { APIServer } from './utilities/constant';
import * as APIUrl from './utilities/APIUrl';
const AuthApiUrl = APIUrl.AuthApiUrl;

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        // const { username } = params;
        // localStorage.setItem('username', username);
        // accept all username/password combinations
        // return Promise.resolve();
        const { username, password } = params;
        const request = new Request(APIServer + AuthApiUrl.API_AUTH_LOGIN, {
            method: 'POST',
            body: JSON.stringify({
                'userId': username,
                'password': password
            }),
            headers: new Headers({'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    if (response.status === 400) {
                        throw new Error('Wrong username or password, please try again.');
                    } else {
                        throw new Error(response.statusText);
                    }
                }
                return response.json();
            })
            .then(({ token, user }) => {
                if (token && user) {
                    const decodedToken = decodeJwt(token);
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', decodedToken.role);
                    localStorage.setItem('username', decodedToken.username);
                    localStorage.setItem('userId', user.userId);
                    localStorage.setItem('id', user.id);
                }
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        return Promise.resolve();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unkown method');
};
