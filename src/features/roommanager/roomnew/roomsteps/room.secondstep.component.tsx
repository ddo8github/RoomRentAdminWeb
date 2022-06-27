import React from 'react';
import {FileModel} from '../../../../models/models';
import {useStore} from '../../../../stores/stores';
import FileUploadMainWidget from '../../../../layout/fileupload/file.upload.main.widget';
import {Button, Divider, Icon} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';

interface Props {
    nextStep: () => void,
    prevStep: () => void
}

function RoomSecondStepComponent({prevStep, nextStep}: Props) {
    const {
        commonStore: {uploadInProgress, uploadFile}
    } = useStore();

    async function handlePhotoUpload(files: FileModel[]) {
        files.map(async (file) => {
            await uploadFile(file, files.length);
        });
    }

    return (
        <>
            <FileUploadMainWidget acceptFileType={{'image/png': ['.png', '.jpg', '.jpeg']}}
                                  uploadFiles={handlePhotoUpload} loading={uploadInProgress}/>
            <Divider/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {<Button primary onClick={() => {
                    prevStep();
                }} icon labelPosition='left'>
                    Quay lại
                    <Icon name='arrow left'/>
                </Button>}
                {<Button primary onClick={() => {
                    nextStep();
                }} icon labelPosition='right'>
                    Tiếp tục
                    <Icon name='arrow right'/>
                </Button>}
            </div>
        </>
    );
}

export default observer(RoomSecondStepComponent);
