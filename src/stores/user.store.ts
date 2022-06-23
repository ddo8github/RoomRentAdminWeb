import {makeAutoObservable, runInAction} from 'mobx';
import {RefreshTokenModel, TokenModel, UserLogin} from '../models/models';
import agent from '../utils/agent';
import {store} from './stores';
import {MSG_LOADING_APP, NAV_ROOM_COMPANY} from '../config/constant';
import cryptor from '../utils/cryptor';

export default class UserStore {
    public user: TokenModel | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        this.getUserFromLocalStorage();
        return !!this.user;
    }

    login = async (creds: UserLogin) => {
        try {
            const res = await agent.Account.login(creds);
            this.setUser(res.Data!);
            this.startRefreshTokenTimer();
            store.commonStore.goToPage('/' + NAV_ROOM_COMPANY);
        } catch (e) {
            throw e;
        }
    };

    logout = async () => {
        try {
            store.commonStore.setAppLoaded(true, MSG_LOADING_APP);
            const res = await agent.Account.signout({Username: this.user?.Username});
            this.setUser(null);
            window.localStorage.removeItem('26ed014a');
            store.commonStore.setAppLoaded(false, '');
            store.commonStore.goToPage('/');
        } catch (e) {
            store.commonStore.setAppLoaded(false, '');
            throw e;
        }
    };

    setUser = (user: TokenModel | null) => {
        try {
            this.user = user;
            cryptor.setDataToLocalStorage('26ed014a', user);
        } catch (e) {
            throw e;
        }
    };

    private getUserFromLocalStorage = () => {
        try {
            runInAction(() => {
                this.user = cryptor.getDataFromLocalStorage<TokenModel>('26ed014a');
            });
            this.startRefreshTokenTimer();
        } catch (e) {
            throw e;
        }
    }

    refreshToken = async () => {
        try {
            if (this.user) {
                const refreshTokenModel: RefreshTokenModel = {
                    RefreshToken: this.user?.RefreshToken
                };
                const res = await agent.Account.refreshToken(refreshTokenModel);
                res.Data!.RefreshToken = this.user.RefreshToken;
                this.setUser(res.Data!);
            }
        } catch (e) {
            throw e;
        }
    };

    private startRefreshTokenTimer() {
        if (this.user) {
            const jwtToken = JSON.parse(atob(this.user.AccessToken.split('.')[1]));
            const expires = new Date(jwtToken.exp * 1000);
            // 5 mins timeout
            const timeout = expires.getTime() - Date.now() - (3580 * 1000);
            setTimeout(this.refreshToken, timeout);
        }
    }
}
