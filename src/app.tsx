import React, {Component, Fragment} from 'react';
import './app.css';
import {RouterConfig} from './config/router.config';
import {NavbarComponent} from './features/nav/navbar.component';
import {Route} from 'react-router-dom';
import LoginComponent from './features/login/login.component';


class App extends Component<any, any> {
    constructor(prop: any) {
        super(prop);
    }

    render() {
        return (
            // Fragment
            <>
                <Route exact path='/' component={LoginComponent}></Route>
                <Route path={'/(.+)'} render={() => (
                    <>
                        <NavbarComponent></NavbarComponent>
                        <div className='container-main'>
                            <RouterConfig/>
                        </div>
                    </>
                )}/>
            </>
        );
    }
}

export default App;
