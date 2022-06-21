import React, {useCallback} from 'react';
import {Header, Icon} from 'semantic-ui-react';
import {Accept, useDropzone} from 'react-dropzone';
import {FileModel} from '../../models/models';
import {observer} from 'mobx-react-lite';

interface Props {
    acceptFileType: Accept;
    setFile: (files: FileModel[]) => void;
}

function FileWidgetDropzone({setFile, acceptFileType}: Props) {
    const dzStyle = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '10px',
        textAlign: 'center' as 'center',
        height: '120px',
        cursor: 'pointer'
    };

    const dzActive = {
        borderColor: 'green'
    };

    const onDrop = useCallback((acceptedFiles) => {
        const res = acceptedFiles.map((file: File) => {
            const fileModel: FileModel = {
                previewImage: URL.createObjectURL(file),
                File: file,
                Ext: file.name.split('.').pop()!,
                Size: file.size,
                S3FileName: '',
                Percentage: 0,
                Key: '',
                Location: '',
                Bucket: '',
                error: undefined
            };
            return fileModel;
        });
        setFile(res);
    }, [setFile]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: acceptFileType});

    return (
        <div {...getRootProps()} style={isDragActive ? {...dzStyle, ...dzActive} : dzStyle}>
            <input {...getInputProps()} />
            <Icon name={'upload'} size={'big'}/>
            <Header content={'Kéo thả hoặc ấn vào đây để chọn file'}/>
        </div>
    );
}

export default observer(FileWidgetDropzone);
