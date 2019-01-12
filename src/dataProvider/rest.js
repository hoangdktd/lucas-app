import restEngine from '../utilities/restEngine';
import { fetchUtils } from 'admin-on-rest';
import { APIServer } from '../utilities/constant';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    const token = localStorage.getItem('token');
    console.log(token);
    //options.headers.set('x-access-token', `Bearer ${token}`);
    options.headers.set('x-access-token', token);
    return fetchUtils.fetchJson(url, options);
}

const restClient = restEngine(APIServer, httpClient);
export default (type, resource, params) => new Promise(resolve => setTimeout(() => resolve(restClient(type, resource, params)), 500));
    