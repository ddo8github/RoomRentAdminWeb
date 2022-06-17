import {createContext, useContext} from 'react';
import {CommonStore} from './common.store';
import UserStore from './user.store';


interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore()
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
