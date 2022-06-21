import React, {useState} from 'react';
import FileUploadMainWidget from '../../layout/fileupload/file.upload.main.widget';
import {FileModel} from '../../models/models';
import {useStore} from '../../stores/stores';
import {observer} from 'mobx-react-lite';

function VideoComponent() {
    const {commonStore: {uploadInProgress, uploadFile, setUploadPhotoStatus}} = useStore();

    async function handlePhotoUpload(files: FileModel[]) {
        files.map(async (file) => {
            await uploadFile(file, files.length);
        });
    }

    return (
        <>
            <h1>Video.</h1>
            <FileUploadMainWidget uploadPhoto={handlePhotoUpload}
                                  acceptFileType={{'image/png': ['.png', '.jpg', '.jpeg']}} loading={uploadInProgress}/>
        </>
    );
}

export default observer(VideoComponent);
