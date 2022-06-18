import {makeAutoObservable} from 'mobx';
import {UserLogin} from '../models/models';
import agent from '../utils/agent';
import {store} from './stores';
import {NAV_ROOM_COMPANY} from '../config/constant';

export default class UserStore {
    constructor() {
        makeAutoObservable(this);
    }

    login = async (creds: UserLogin) => {
        try {
            const res = await agent.Account.login(creds);
            store.commonStore.setUser(res.Data!);
            store.commonStore.goToPage('/' + NAV_ROOM_COMPANY);
        } catch (e) {
            throw e;
        }
    };

    logout = async () => {
        try {
            store.commonStore.setAppLoaded(true);
            const res = await agent.Account.signout({Username: store.commonStore.user?.Username});
            store.commonStore.setUser(null);
            window.localStorage.removeItem('26ed014a');
            store.commonStore.setAppLoaded(false);
            store.commonStore.goToPage('/');
        } catch (e) {
            store.commonStore.setAppLoaded(false);
            throw e;
        }
    }
}
