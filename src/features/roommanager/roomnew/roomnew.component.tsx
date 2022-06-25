import React, {useState} from 'react';
import './roomnew.component.css';
import StepperComponent from '../../../layout/stepper/stepper.component';
import {useStore} from '../../../stores/stores';
import {observer} from 'mobx-react-lite';
import {Button, Header, Icon} from 'semantic-ui-react';
import RoomFirstStepComponent from './roomsteps/room.firststep.component';
import RoomSecondStepComponent from './roomsteps/room.secondstep.component';

function RoomNewComponent() {
    const {roomStore: {roomSteppers}} = useStore();
    const [step, setStep] = useState<number>(1);

    function renderStep() {
        roomSteppers.map((m) => {
            m.active = (m.key === step);
        });
        switch (step) {
            case 1:
                return (<RoomFirstStepComponent/>);
            case 2:
                return (<RoomSecondStepComponent/>);
            case 3:
                return (<Header content={'Step 3'}/>);
        }
    }

    return (
        <div style={{display: 'table', margin: '0 auto'}}>
            <StepperComponent steppers={roomSteppers}/>
            <div style={{marginBottom: '10px'}}>
                {renderStep()}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {<Button primary onClick={() => {
                    setStep(step - 1);
                }} disabled={!(step > 1)} icon labelPosition='left'>
                    Quay lại
                    <Icon name='arrow left'/>
                </Button>}
                {<Button primary onClick={() => {
                    setStep(step + 1);
                }} disabled={!(step < roomSteppers.length)} icon labelPosition='right'>
                    Tiếp tục
                    <Icon name='arrow right'/>
                </Button>}
            </div>
        </div>
    );
}

export default observer(RoomNewComponent);
