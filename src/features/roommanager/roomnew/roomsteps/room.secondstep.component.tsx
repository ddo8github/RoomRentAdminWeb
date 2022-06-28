import React, {useEffect, useState} from 'react';
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
    const [shouldGoNext, setShouldGoNext] = useState<boolean>(false);
    const {
        commonStore: {uploadInProgress, uploadFile, setFilesPhotoRooms, filesPhotoRooms}
    } = useStore();

    const [existedFiles, setExistedFiles] = useState<FileModel[]>(filesPhotoRooms);

    useEffect(() => {
        setShouldGoNext(filesPhotoRooms.length > 0);
    }, [setShouldGoNext]);

    async function handlePhotoUpload(files: FileModel[]) {
        setFilesPhotoRooms([]);
        setShouldGoNext(false);
        files.map(async (file) => {
            await uploadFile(file, files.length);
        });
        setShouldGoNext(true);
    }

    function fileJustDropIntoRegion(files: FileModel[]) {
        setFilesPhotoRooms([]);
        setShouldGoNext(false);
        setExistedFiles([]);
    }

    return (
        <>
            <FileUploadMainWidget acceptFileType={{'image/png': ['.png', '.jpg', '.jpeg']}}
                                  uploadFiles={handlePhotoUpload} loading={uploadInProgress}
                                  existedFiles={existedFiles} fileJustDropIntoRegion={fileJustDropIntoRegion}/>
            <Divider/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button primary onClick={prevStep} icon labelPosition='left' type={'button'}>
                    Quay lại
                    <Icon name='arrow left'/>
                </Button>
                <Button primary onClick={nextStep} icon labelPosition='right' disabled={!shouldGoNext} type={'button'}>
                    Tiếp tục
                    <Icon name='arrow right'/>
                </Button>
            </div>
        </>
    );
}

export default observer(RoomSecondStepComponent);
