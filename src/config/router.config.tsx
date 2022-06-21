import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ProfileComponent} from '../features/profile/profile.component';
import RoomcomComponent from '../features/roomcom/roomcom.component';
import PartnerComponent from '../features/partner/partner.component';
import NotfoundComponent from '../features/notfound/notfound.component';
import {NAV_PARTNER, NAV_ROOM_COMPANY} from './constant';
import PrivateRoute from './private.route';
import VideoComponent from '../features/video/video.component';

export class RouterConfig extends Component<any, any> {
    constructor(prop: any) {
        super(prop);
    }

    render() {
        return (
            <Switch>
                <PrivateRoute exact path={'/' + NAV_ROOM_COMPANY} component={RoomcomComponent}/>
                <PrivateRoute exact path='/profile' component={ProfileComponent}/>
                <PrivateRoute exact path={'/' + NAV_PARTNER} component={PartnerComponent}/>
                <PrivateRoute exact path='/video' component={VideoComponent}/>
                <Route component={NotfoundComponent}/>
            </Switch>
        );
    }
}
