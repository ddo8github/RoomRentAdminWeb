import axios, {AxiosResponse} from 'axios';
import {store} from '../stores/stores';
import cryptor from './cryptor';
import {
    DataResultModel,
    District, PagedList, PagingParams,
    Province,
    RefreshTokenModel,
    RoomCompanySummary,
    RoomComViewModel, RoomInfo,
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
        const pagination = res.headers['pagination'];
        if (pagination) {
            ret.Data = new PagedList(ret.Data, JSON.parse(pagination));
        }
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

const Room = {
    insertNewRoomCompany: (room: RoomComViewModel) => requests.post<DataResultModel<Boolean>>('room/269133c5', room),
    getListRoomCompany: (pagingParam: PagingParams) => requests.get<DataResultModel<PagedList<RoomCompanySummary[]>>>(`room/119b029c?pageSize=${pagingParam.pageSize}&pageNumber=${pagingParam.pageNumber}`),
    getRoomCompanyDetail: (roomId: string) => requests.get<DataResultModel<RoomInfo>>(`room/dd55b850?roomId=${roomId}`),
    updateRoomCompany: (room: RoomComViewModel) => requests.post<DataResultModel<Boolean>>('room/bf984ec4', room)
};

const agent = {
    Account,
    Geography,
    Room
};

export default agent;
