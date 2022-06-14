import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFoundComponent } from '../features/notfound/notfound.component';
import { ProfileComponent } from '../features/profile/profile.component';
import { VideoComponent } from '../features/video/video.component';
import RoomcomComponent from '../features/roomcom/roomcom.component';
import PartnerComponent from '../features/partner/partner.component';

export class RouterConfig extends Component<any, any> {
    constructor(prop: any) {
        super(prop);
    }
    render() {
        return (
            <Switch>
                <Route exact path='/roomcom' component={RoomcomComponent}/>
                <Route exact path='/profile' component={ProfileComponent}/>
                <Route exact path='/partner' component={PartnerComponent}/>
                <Route exact path='/video' component={VideoComponent}/>
                <Route component={NotFoundComponent}></Route>
            </Switch>
        );
    }
}
