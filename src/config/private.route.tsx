import {Redirect, Route, RouteComponentProps, RouteProps} from 'react-router-dom';
import React, {useEffect} from 'react';
import {useStore} from '../stores/stores';
import {observer} from 'mobx-react-lite';

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

function PrivateRoute({component: Component, ...rest}: Props) {
    const {userStore: {isLoggedIn}} = useStore();
    return (
        <Route
            {...rest}
            render={(props) => isLoggedIn ?
                <Component {...props}/> :
                <Redirect to={'/'}/>}
        />
    );
}

export default observer(PrivateRoute);
