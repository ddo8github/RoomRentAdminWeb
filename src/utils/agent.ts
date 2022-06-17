import axios, {AxiosResponse} from 'axios';
import {store} from '../stores/stores';
import cryptor from './cryptor';
import {DataResultModel, UserLogin} from '../models/models';

axios.defaults.baseURL = process.env.REACT_APP_API_ROOT;

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
    }
    config.headers!['Content-Type'] = 'application/json';
    config.data = cryptor.enRequestData(config.data);
    return config;
});

axios.interceptors.response.use(async (res) => {
    const ret = cryptor.deResponseData<DataResultModel<any>>(res.data);
    if (ret.ErrorNumber != null) {
        switch (ret.ErrorNumber) {
            case 401:
                throw new Error('Sai username hoặc password');
                break;
        }
        res.data = null;
    } else {
        res.data = ret;
    }
    return res;
});

const responseBody = (response: AxiosResponse) => {
    return response.data;
};

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: any) => axios.post<string>(url, JSON.stringify(body)).then(responseBody),
    put: (url: string, body: any) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
    login: (user: UserLogin) => requests.post('auth/e0e9cc9a', user)
};

const agent = {
    Account
};

export default agent;
