import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Router } from '../router/Routes';
import { PaginatedResponse } from '../models/Pagination';

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;

    switch (status) {
        case 400: 
            if(data.errors) {
                const modalErrorState: string[] = [];
                for (const key in data.errors) {
                    if(data.errors[key]) modalErrorState.push(data.errors[key]);
                }
                throw modalErrorState.flat();
            }
        toast.error(data.title)
        break;
        case 401: toast.error(data.title)
        break;
        case 500: Router.navigate('/server-error', {state: {error: data}});
        break;
        default:
        break;
    }

    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.get(url).then(responseBody),
}

const Catelog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters')
}

const Account = {
    login: (values: any) => requests.post("account/login", values),
    register: (values: any) => requests.post("account/register", values),
    currentUser: () => requests.get("account/currentUser")
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get404Error: () => requests.get('buggy/not-found'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    deleteItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const agent = {
    Catelog,
    TestErrors,
    Basket,
    Account
}

export default agent;