import React, {Component} from 'react';
import './app.css';
import {RouterConfig} from './config/router.config';
import {Route} from 'react-router-dom';
import LoginComponent from './features/login/login.component';
import NavbarComponent from './features/nav/navbar.component';
import FooterComponent from './features/footer/footer.component';
import {ToastContainer} from 'react-toastify';

class App extends Component<any, any> {
    constructor(prop: any) {
        super(prop);
    }

    render() {
        return (
            // Fragment
            <>
                <ToastContainer position={'bottom-right'} hideProgressBar/>
                <Route exact path='/' component={LoginComponent}></Route>
                <Route path={'/(.+)'} render={() => (
                    <>
                        <NavbarComponent></NavbarComponent>
                        <div className='container-main'>
                            <RouterConfig/>
                        </div>
                        <FooterComponent></FooterComponent>
                    </>
                )}/>
            </>
        );
    }
}

export default App;
