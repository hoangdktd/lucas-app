import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from 'react-admin';
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
console.log(params);
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
                    console.log(response.msg);
                    console.log(response.json().msg);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                const decodedToken = decodeJwt(token);
                console.log(decodedToken);
                localStorage.setItem('token', token);
                localStorage.setItem('role', decodedToken.role);
                localStorage.setItem('username', decodedToken.username);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unkown method');
};
