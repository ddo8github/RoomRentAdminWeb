import axios, {AxiosResponse} from 'axios';
import {store} from '../stores/stores';
import cryptor from './cryptor';
import {
    DataResultModel,
    District,
    Province,
    RefreshTokenModel,
    SignoutModel,
    TokenModel,
    UserLogin,
    Ward
} from '../models/models';

axios.defaults.baseURL = process.env.REACT_APP_API_ROOT;

axios.interceptors.request.use((config) => {
    try {
        const token = store.userStore.user?.IdToken;
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
    let ret: DataResultModel<any>;
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
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: any) => axios.post<T>(url, JSON.stringify(body)).then(responseBody),
    put: (url: string, body: any) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
    login: (user: UserLogin) => requests.post<DataResultModel<TokenModel>>('auth/0de2ac27', user),
    signout: (user: SignoutModel) => requests.post<DataResultModel<Boolean>>('auth/e0e9cc9a', user),
    refreshToken: (refreshtoken: RefreshTokenModel) => requests.post<DataResultModel<TokenModel>>('auth/3e5867c9', refreshtoken),
};

const Geography = {
    listProvince: () => requests.get<DataResultModel<Province[]>>('province/3e5867c9'),
    listDistrict: (provinceCode: string) => requests.get<DataResultModel<District[]>>(`province/82e81eac?provinceCode=${provinceCode}`),
    listWard: (provinceCode: string, districtCode: string) => requests.get<DataResultModel<Ward[]>>(`province/1dcf5b07?provinceCode=${provinceCode}&districtCode=${districtCode}`)
};

const agent = {
    Account,
    Geography
};

export default agent;
