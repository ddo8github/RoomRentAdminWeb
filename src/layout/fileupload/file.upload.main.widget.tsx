import React, {useEffect, useState} from 'react';
import FileWidgetDropzone from './file.widget.dropzone';
import FileWidgetListPreview from './file.widget.listpreview';
import {Button, Divider, Header} from 'semantic-ui-react';
import {Accept} from 'react-dropzone';
import {FileModel} from '../../models/models';
import {observer} from 'mobx-react-lite';

interface Props {
    loading: boolean;
    acceptFileType: Accept;
    uploadPhoto: (files: FileModel[]) => void;
}

function FileUploadMainWidget({uploadPhoto, acceptFileType, loading}: Props) {
    const [files, setFiles] = useState<FileModel[]>([]);
    useEffect(() => {
        return () => {
            // revokeObjectURL will clean the URL.createObjectURL
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    return (
        <>
            <div style={{width: '100%'}}>
                <Header sub color={'teal'} content={'Chọn files'}/>
                <FileWidgetDropzone setFile={setFiles} acceptFileType={acceptFileType}/>
            </div>
            {files && files.length > 0 &&
            <div>
                <Divider/>
                <div style={{width: '100%', marginBottom: '10px'}}>
                    <Header sub color={'teal'} content={'Xem lại files'}/>
                    <FileWidgetListPreview files={files}/>
                </div>
                <div style={{width: '100%', marginBottom: '10px'}}>
                    <Header sub color={'teal'} content={'Upload files'}/>
                    <Button loading={loading} onClick={() => uploadPhoto(files)} primary icon={'check'}
                            content={'Upload Files'}/>
                </div>
            </div>
            }
        </>
    );
}

export default FileUploadMainWidget;
