import {makeAutoObservable} from 'mobx';
import {appHistory} from '../index';
import {TokenModel} from '../models/models';
import cryptor from '../utils/cryptor';

export class CommonStore {
    public user: TokenModel | null = null;
    public appLoaded: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUser = (user: TokenModel | null) => {
        try {
            this.user = user;
            cryptor.setDataToLocalStorage('26ed014a', JSON.stringify(user));
        } catch (e) {
            throw e;
        }
    };

    getUserFromLocalStorage = () => {
        try {
            this.user = cryptor.getDataFromLocalStorage<TokenModel>('26ed014a');
        } catch (e) {
            throw e;
        }
    }

    setAppLoaded = (value: boolean) => {
        this.appLoaded = value;
    };

    goToPage = (url: string) => {
        appHistory.push(url);
    };
}
