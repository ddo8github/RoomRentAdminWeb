import React, {useEffect, useState} from 'react';
import {FileModel, RoomComImgViewModel} from '../../../../models/models';
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
        commonStore: {uploadInProgress, uploadFile, setFilesPhotoRooms, filesPhotoRooms},
        roomStore: {roomInfo}
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

    function setRoomComImg() {
        const res = filesPhotoRooms.map((m) => {
            const roomImg: RoomComImgViewModel = {Desc: m.Desc, Doctype: m.Ext, Roomdocurl: m.S3FileName};
            return roomImg;
        });
        if (roomInfo) {
            roomInfo.roomComImgViewModels = res;
        }
    }

    return (
        <>
            <FileUploadMainWidget
                acceptFileType={{'image/png': ['.png', '.jpg', '.jpeg', '.mp4', '.MP4']}}
                uploadFiles={handlePhotoUpload} loading={uploadInProgress}
                existedFiles={existedFiles} fileJustDropIntoRegion={fileJustDropIntoRegion}/>
            <Divider/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button primary onClick={() => {
                    prevStep();
                }} icon labelPosition='left' type={'button'}>
                    Quay lại
                    <Icon name='arrow left'/>
                </Button>
                {
                    shouldGoNext ? <Button primary onClick={() => {
                        setRoomComImg();
                        nextStep();
                    }} icon labelPosition='right' type={'button'}>
                        Tiếp tục
                        <Icon name='arrow right'/>
                    </Button> : <div/>
                }
            </div>
        </>
    );
}

export default observer(RoomSecondStepComponent);
