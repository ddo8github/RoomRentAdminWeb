import {createContext, useContext} from 'react';
import {CommonStore} from './common.store';
import UserStore from './user.store';
import RoomStore from './room.store';


interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    roomStore: RoomStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    roomStore: new RoomStore()
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
