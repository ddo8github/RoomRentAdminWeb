import {makeAutoObservable} from 'mobx';

export class CommonStore {
    public token: string | null = window.localStorage.getItem('jwt');

    constructor() {
        makeAutoObservable(this);
    }

    setToken = (token: string | null) => {
        this.token = token;
    };
}
