import {makeAutoObservable} from 'mobx';
import {TokenModel, UserLogin} from '../models/models';
import agent from '../utils/agent';
import {appHistory} from '../index';
import {store} from './stores';

export default class UserStore {
    public user: TokenModel | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    login = async (creds: UserLogin) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user);
            appHistory.push('/activities');
        } catch (e) {
            throw e;
        }
    };
}
