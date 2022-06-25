import React from 'react';
import {Step} from 'semantic-ui-react';
import {StepperModel} from '../../models/models';
import './stepper.component.css';

interface Props {
    steppers: StepperModel[]
}

function StepperComponent({steppers}: Props) {
    return (
        <div className={'stepperStyle'}>
            <Step.Group ordered items={steppers}/>
        </div>
    );
}

export default StepperComponent;
