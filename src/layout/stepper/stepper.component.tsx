import React from 'react';
import {Step} from 'semantic-ui-react';
import {StepperModel} from '../../models/models';

interface Props {
    steppers: StepperModel[]
}

function StepperComponent({steppers}: Props) {
    return (
        <div>
            <Step.Group ordered items={steppers}>
                <Step active>
                    <Step.Content>
                        <Step.Title>Thông tin</Step.Title>
                        <Step.Description>Nhập thông tin phòng</Step.Description>
                    </Step.Content>
                </Step>

                <Step>
                    <Step.Content>
                        <Step.Title>Hình ảnh & Video</Step.Title>
                        <Step.Description>Upload hình ảnh và video</Step.Description>
                    </Step.Content>
                </Step>

                <Step>
                    <Step.Content>
                        <Step.Title>Xem lại & xác nhận</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        </div>
    );
}

export default StepperComponent;
