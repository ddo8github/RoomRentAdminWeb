import React from 'react';
import './roomnew.component.css';
import {Step} from 'semantic-ui-react';
import StepperComponent from '../../../layout/stepper/stepper.component';
import {useStore} from '../../../stores/stores';
import {observer} from 'mobx-react-lite';

function RoomNewComponent() {
    const {roomStore: {steppers}} = useStore();
    return (
        <div style={{display: 'table', margin: '0 auto'}}>
            <StepperComponent steppers={steppers}/>
        </div>
    );
}

export default observer(RoomNewComponent);
