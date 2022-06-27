import React, {useState} from 'react';
import './roomnew.component.css';
import StepperComponent from '../../../layout/stepper/stepper.component';
import {useStore} from '../../../stores/stores';
import {observer} from 'mobx-react-lite';
import {Button, Header, Icon} from 'semantic-ui-react';
import RoomFirstStepComponent from './roomsteps/room.firststep.component';
import RoomSecondStepComponent from './roomsteps/room.secondstep.component';
import {RoomInfo} from '../../../models/models';
import RoomThirdStepComponent from './roomsteps/room.thirdstep.component';

function RoomNewComponent() {
    const {roomStore: {roomSteppers, setRoomInfo}} = useStore();
    const [step, setStep] = useState<number>(1);

    function nextStep() {
        setStep(step < 3 ? step + 1 : step);
    }

    function finishStep() {

    }

    function prevStep() {
        setStep(step > 1 ? step - 1 : step);
    }

    function renderStep() {
        roomSteppers.map((m) => {
            m.active = (m.key === step);
        });
        switch (step) {
            case 1:
                return (<RoomFirstStepComponent nextStep={nextStep} />);
            case 2:
                return (<RoomSecondStepComponent nextStep={nextStep} prevStep={prevStep}/>);
            case 3:
                return (<RoomThirdStepComponent finishStep={finishStep} prevStep={prevStep}/>);
        }
    }

    return (
        <div style={{display: 'table', margin: '0 auto', width: '100%'}}>
            <StepperComponent steppers={roomSteppers}/>
            <div style={{marginBottom: '10px'}}>
                {renderStep()}
            </div>
        </div>
    );
}

export default observer(RoomNewComponent);
