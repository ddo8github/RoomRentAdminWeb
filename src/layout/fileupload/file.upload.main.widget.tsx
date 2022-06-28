import React, {useEffect, useState} from 'react';
import FileWidgetDropzone from './file.widget.dropzone';
import FileWidgetListPreview from './file.widget.listpreview';
import {Button, Divider, Header} from 'semantic-ui-react';
import {Accept} from 'react-dropzone';
import {FileModel} from '../../models/models';
import {observer} from 'mobx-react-lite';


interface Props {
    acceptFileType: Accept;
    uploadFiles: (files: FileModel[]) => void;
    fileJustDropIntoRegion: (files: FileModel[]) => void;
    loading: boolean;
    existedFiles: FileModel[];
}

function FileUploadMainWidget({acceptFileType, uploadFiles, loading, existedFiles, fileJustDropIntoRegion}: Props) {
    const [files, setFiles] = useState<FileModel[]>(existedFiles.length > 0 ? existedFiles : []);
    const [uploaded, setUploaded] = useState<boolean>(false);
    let timer: NodeJS.Timeout;
    useEffect(() => {
        // existedFiles.length > 0 => already uploaded
        setUploaded(existedFiles.length > 0);
        return () => {
            // revokeObjectURL will clean the URL.createObjectURL
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        };
    }, [files, existedFiles]);

    return (
        <>
            <div style={{width: '100%'}}>
                <Header sub color={'teal'} content={'Chọn files'}/>
                <FileWidgetDropzone setFiles={(files) => {
                    setFiles(files);
                    setUploaded(false);
                    fileJustDropIntoRegion(files);
                }} acceptFileType={acceptFileType}/>
            </div>
            {files && files.length > 0 &&
            <div>
                <Divider/>
                <div style={{width: '100%', marginBottom: '10px'}}>
                    <Header sub color={'teal'} content={'Xem lại files'}/>
                    <FileWidgetListPreview files={files}/>
                </div>
                <div style={{width: '100%', marginBottom: '10px', textAlign: 'right'}}>
                    {!uploaded &&
                    <Button loading={loading} onClick={() => {
                        uploadFiles(files);
                        setUploaded(true);
                    }} primary icon={'upload'} labelPosition='right' content={'Upload Files'}/>}
                </div>
            </div>
            }
        </>
    );
}

export default observer(FileUploadMainWidget);
