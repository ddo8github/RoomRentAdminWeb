import React from 'react';
import {ToastContainer} from 'react-toastify';
import {Route} from 'react-router-dom';
import LoginComponent from './features/login/login.component';
import NavbarComponent from './features/nav/navbar.component';
import {RouterConfig} from './config/router.config';
import FooterComponent from './features/footer/footer.component';
import {useStore} from './stores/stores';
import LoadingComponent from './features/layout/loading.component';
import {observer} from 'mobx-react-lite';
import './app.css';

function App() {
    const {commonStore} = useStore();
    if (commonStore.appLoaded) {
        return <LoadingComponent content={'Loading App...'}/>;
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
