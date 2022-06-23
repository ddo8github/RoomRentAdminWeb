import React, {useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {Route} from 'react-router-dom';
import LoginComponent from './features/login/login.component';
import NavbarComponent from './layout/nav/navbar.component';
import {RouterConfig} from './config/router.config';
import FooterComponent from './layout/footer/footer.component';
import {useStore} from './stores/stores';
import LoadingComponent from './layout/loading/loading.component';
import {observer} from 'mobx-react-lite';
import './app.css';
import cryptor from './utils/cryptor';
import {NAV_ROOM_COMPANY} from './config/constant';

function App() {
    const {commonStore, userStore} = useStore();
    useEffect(() => {
        // userStore.getUserFromLocalStorage();
        if (userStore.isLoggedIn) {
            const res = cryptor.isJWTExpired(userStore.user?.AccessToken!);
            if (res) {
                userStore.logout().catch((e) => toast.error(e.message));
            } else {
                if (window.location.pathname === '/') {
                    commonStore.goToPage('/' + NAV_ROOM_COMPANY);
                }
            }
        } else {
            commonStore.goToPage('/');
        }
    }, [commonStore]);
    if (commonStore.appLoaded) {
        return <LoadingComponent content={commonStore.appLoadedContent}/>;
    }
    return (
        // Fragment
        <>
            <ToastContainer position={'bottom-right'} hideProgressBar/>
            <Route exact path='/' component={LoginComponent}/>
            <Route path={'/(.+)'} render={() => (
                <>
                    <NavbarComponent/>
                    <div className='container-main'>
                        <RouterConfig/>
                    </div>
                    <FooterComponent/>
                </>
            )}/>
        </>
    );
}

export default observer(App);
