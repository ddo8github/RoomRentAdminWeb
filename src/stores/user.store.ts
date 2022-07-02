import {makeAutoObservable, runInAction} from 'mobx';
import {RefreshTokenModel, TokenModel, UserLogin} from '../models/models';
import agent from '../utils/agent';
import {store} from './stores';
import cryptor from '../utils/cryptor';
import {Constants} from '../config/constant';

export default class UserStore {
    public user: TokenModel | null = null;
    private dontRefreshToken:boolean = false;

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
            store.commonStore.goToPage(Constants.NAV_ROOM_COMPANY);
        } catch (e) {
            throw e;
        }
    };

    logout = async () => {
        try {
            this.dontRefreshToken=true;
            store.commonStore.setAppLoaded(true, Constants.MSG_LOADING_APP);
            const res = await agent.Account.signout({Username: this.user?.Username});
            this.setUser(null);
            window.localStorage.removeItem('26ed014a');
            store.commonStore.setAppLoaded(false, '');
            store.commonStore.goToPage('/');
            this.dontRefreshToken=false;
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
            if (this.user && this.user.RefreshToken && !this.dontRefreshToken) {
                const refreshTokenModel: RefreshTokenModel = {
                    RefreshToken: this.user?.RefreshToken
                };
                const res = await agent.Account.refreshToken(refreshTokenModel);
                res.Data!.RefreshToken = this.user.RefreshToken;
                res.Data!.Username = this.user.Username;
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
            const timeout = expires.getTime() - Date.now() - (Constants.TIME_OUT_SECOND * 1000);
            setTimeout(this.refreshToken, timeout);
        }
    }
}
