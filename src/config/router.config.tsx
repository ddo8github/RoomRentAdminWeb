import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ProfileComponent} from '../features/profile/profile.component';
import RoomcomComponent from '../features/roommanager/roomcom/roomcom.component';
import PartnerComponent from '../features/partner/partner.component';
import NotfoundComponent from '../features/notfound/notfound.component';
import PrivateRoute from './private.route';
import VideoComponent from '../features/video/video.component';
import RoomNewComponent from '../features/roommanager/roomnew/roomnew.component';
import {Constants} from './constant';

export class RouterConfig extends Component<any, any> {
    constructor(prop: any) {
        super(prop);
    }

    render() {
        return (
            <Switch>
                <PrivateRoute exact path={Constants.NAV_ROOM_COMPANY} component={RoomcomComponent}/>
                <PrivateRoute exact path={[Constants.NAV_ROM_NEW, Constants.NAV_ROM_EDIT]} component={RoomNewComponent}/>
                <PrivateRoute exact path='/profile' component={ProfileComponent}/>
                <PrivateRoute exact path={Constants.NAV_PARTNER} component={PartnerComponent}/>
                <PrivateRoute exact path='/video' component={VideoComponent}/>
                <Route component={NotfoundComponent}/>
            </Switch>
        );
    }
}
