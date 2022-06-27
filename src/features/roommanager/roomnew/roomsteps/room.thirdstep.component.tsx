import React from 'react';
import {Button, Divider, Header, Icon} from 'semantic-ui-react';
interface Props {
    finishStep: () => void,
    prevStep: () => void
}
function RoomThirdStepComponent({prevStep, finishStep}: Props) {
    return (
        <div>
            <Header content={'Third Step'}/>
            <Divider/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {<Button primary onClick={() => {
                    prevStep();
                }} icon labelPosition='left'>
                    Quay lại
                    <Icon name='arrow left'/>
                </Button>}
                {<Button primary onClick={() => {
                    finishStep();
                }} icon labelPosition='right'>
                    Lưu
                    <Icon name='save'/>
                </Button>}
            </div>
        </div>
    );
}

export default RoomThirdStepComponent;
