import axios, {AxiosResponse} from 'axios';
import {store} from '../stores/stores';
import cryptor from './cryptor';
import {DataResultModel, SignoutModel, TokenModel, UserLogin} from '../models/models';

axios.defaults.baseURL = process.env.REACT_APP_API_ROOT;

axios.interceptors.request.use((config) => {
    try {
        const token = store.commonStore.user;
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        config.headers!['Content-Type'] = 'application/json';
        config.data = cryptor.enRequestData(config.data);
        return config;
    } catch (e) {
        throw e;
    }
});

axios.interceptors.response.use(async (res) => {
    let ret:DataResultModel<any>;
    try {
        ret = cryptor.deResponseData<DataResultModel<any>>(res.data);
    } catch (e) {
        throw e;
    }
    if (ret.ErrorNumber != null) {
        switch (ret.ErrorNumber) {
            case 401:
                throw new Error('Sai username hoặc password');
            default:
                throw new Error('Đã có lỗi xảy ra: ' + ret.Message);
        }
    } else {
        res.data = ret;
    }
    return res;
});

const responseBody = <T>(response: AxiosResponse<T>) => {
    return response.data;
};

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: <T>(url: string, body: any) => axios.post<T>(url, JSON.stringify(body)).then(responseBody),
    put: (url: string, body: any) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
    login: (user: UserLogin) => requests.post<DataResultModel<TokenModel>>('auth/0de2ac27', user),
    signout: (user: SignoutModel) => requests.post<DataResultModel<Boolean>>('auth/e0e9cc9a', user),
};

const agent = {
    Account
};

export default agent;
