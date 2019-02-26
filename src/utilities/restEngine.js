
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    DELETE_MANY,
    fetchUtils,
} from 'admin-on-rest';
import {translate } from 'react-admin';
import decodeJwt from 'jwt-decode';
const { queryParameters } = fetchUtils;
const { fetchJson } = fetchUtils;

/**
 * Maps admin-on-rest queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertRESTRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
            case 'GET_INFO': {
                url = `${apiUrl}/${resource}`;
                console.log('GET_INFO : ' + url);
                break;
            }
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...params.filter,
                    sort: field,
                    order: order,
                    //_start: (page - 1) * perPage,
                    //_end: page * perPage,
                    perPage: perPage,
                    page: page
                };
                url = `${apiUrl}/${resource}?${queryParameters(query)}`;
                break;
            }
            case GET_ONE:
            console.log(params);
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...params.filter,
                    [params.target]: params.id,
                    sort: field,
                    order: order,
                    //_start: (page - 1) * perPage,
                    //_end: page * perPage,
                    perPage: perPage,
                    page: page
                };
                url = `${apiUrl}/${resource}?${queryParameters(query)}`;
                console.log('GET_MANY_REFERENCE : ' + url);
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                console.log('UPDATE : ' + url);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                console.log('CREATE : ' + url);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                console.log('DELETE : ' + url);
                break;
            case 'DELETE_MANY':
                url = `${apiUrl}/${resource}`;
                options.method = 'DELETE';
                options.body = JSON.stringify(params.data);
                console.log('DELETE_MANY : ' + url);
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }

        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        //const { headers, json } = response;
        const { json } = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                //if (!headers.has('x-total-count')) {
                //    throw new Error('The X-Total-Count header is missing in the HTTP Response. The jsonServer REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?');
                //}
                return {
                    //data: json,
                    //total: parseInt(headers.get('x-total-count').split('/').pop(), 10),
                    // data: json.data.map(object => {object.id = object._id; return object}),
                    data: json.data.map(object => { return object}),
                    total: json.total
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            case UPDATE:
            case DELETE:
            case GET_ONE:
            default:
                console.log(json);
                return { data: { ...json, id: json.id} };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
        // json-server doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
        // const token = localStorage.getItem('token');
        // let decodedToken = '';
        // if (token) {
        //     decodedToken = decodeJwt(token);
        // }
        // const dateNow = new Date();
        // if (decodedToken.exp < (dateNow.getTime() / 1000)){
        //     console.log('Updated Account Profile');
        //     console.log(translate('resources.commons.tokenExpired'));
        //     alert(translate(
        //         'resources.commons.tokenExpired'
        //     ));
        // }
        if (type === GET_MANY) {
            return Promise.all(params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`)))
                .then(responses => ({ data: responses.map(response => response.json) }));
        }
        const { url, options } = convertRESTRequestToHTTP(type, resource, params);
        return httpClient(url, options)
            .then(response => convertHTTPResponseToREST(response, type, resource, params));
    };
};