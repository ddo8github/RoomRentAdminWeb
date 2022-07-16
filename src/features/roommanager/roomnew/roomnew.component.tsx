import React, {useEffect, useState} from 'react';
import './roomnew.component.css';
import StepperComponent from '../../../layout/stepper/stepper.component';
import {useStore} from '../../../stores/stores';
import {observer} from 'mobx-react-lite';
import RoomFirstStepComponent from './roomsteps/room.firststep.component';
import RoomSecondStepComponent from './roomsteps/room.secondstep.component';
import RoomThirdStepComponent from './roomsteps/room.thirdstep.component';
import {toast} from 'react-toastify';
import {Constants} from '../../../config/constant';
import {useParams} from 'react-router-dom';
import {PagingParams} from '../../../models/models';

function RoomNewComponent() {
    const {
        roomStore: {insertNewCompanyRoom, updateRoomCompany, resetRoomInfo, setReloadForEdit, setPagingParams},
        commonStore: {setAppLoaded, goToPage, resetFilePhotoRooms}
    } = useStore();
    const [step, setStep] = useState<number>(1);
    const {id} = useParams<{ id: string }>();

    function nextStep() {
        setStep(step < 3 ? step + 1 : step);
    }

    useEffect(() => {
        return () => {
            resetRoomInfo();
            setReloadForEdit(true);
            resetFilePhotoRooms();
        };
    }, []);

    async function finishStep() {
        try {
            if (id) {
                setAppLoaded(true, 'Đang lưu dữ liệu...');
                await updateRoomCompany();
                setPagingParams(new PagingParams());
                goToPage(Constants.NAV_ROOM_COMPANY);
                setAppLoaded(false, '');
            } else {
                setAppLoaded(true, 'Đang lưu dữ liệu...');
                await insertNewCompanyRoom();
                setPagingParams(new PagingParams());
                goToPage(Constants.NAV_ROOM_COMPANY);
                setAppLoaded(false, '');
            }
        } catch (e: any) {
            setAppLoaded(false, '');
            toast.error(e.Message);
        }
    }

    function prevStep() {
        setStep(step > 1 ? step - 1 : step);
    }

    function renderStep() {
        Constants.ROOM_STEPPERS.map((m) => {
            m.active = (m.key === step);
        });
        switch (step) {
            case 1:
                return (<RoomFirstStepComponent nextStep={nextStep}/>);
            case 2:
                return (<RoomSecondStepComponent nextStep={nextStep} prevStep={prevStep}/>);
            case 3:
                return (<RoomThirdStepComponent finishStep={finishStep} prevStep={prevStep}/>);
        }
    }

    return (
        <div style={{display: 'table', margin: '0 auto', width: '100%'}}>
            <StepperComponent steppers={Constants.ROOM_STEPPERS}/>
            <div style={{marginBottom: '10px'}}>
                {renderStep()}
            </div>
        </div>
    );
}

export default observer(RoomNewComponent);
