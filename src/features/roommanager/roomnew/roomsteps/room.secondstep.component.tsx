import React from 'react';
import {FileModel} from '../../../../models/models';
import {useStore} from '../../../../stores/stores';
import FileUploadMainWidget from '../../../../layout/fileupload/file.upload.main.widget';

function RoomSecondStepComponent() {
    const {commonStore: {uploadInProgress, uploadFile, setUploadPhotoStatus}} = useStore();

    async function handlePhotoUpload(files: FileModel[]) {
        files.map(async (file) => {
            await uploadFile(file, files.length);
        });
    }

    return (
        <>
            <FileUploadMainWidget uploadPhoto={handlePhotoUpload}
                                  acceptFileType={{'image/png': ['.png', '.jpg', '.jpeg']}} loading={uploadInProgress}/>
        </>
    );
}

export default RoomSecondStepComponent;
