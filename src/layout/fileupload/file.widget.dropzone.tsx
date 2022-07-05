import React, {useCallback} from 'react';
import {Header, Icon} from 'semantic-ui-react';
import {Accept, useDropzone} from 'react-dropzone';
import {FileModel} from '../../models/models';
import {observer} from 'mobx-react-lite';
import {toast} from 'react-toastify';
import {Constants} from '../../config/constant';

interface Props {
    acceptFileType: Accept;
    setFiles: (files: FileModel[]) => void;
}

function FileWidgetDropzone({setFiles, acceptFileType}: Props) {
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
                PreviewImage: URL.createObjectURL(file),
                File: file,
                Ext: file.name.split('.').pop()!,
                Size: file.size,
                S3FileName: '',
                Percentage: 0,
                Location: '',
                Bucket: '',
                Error: undefined,
                Desc: ''
            };
            return fileModel;
        });
        if (res.length < 3) {
            setFiles([]);
            toast.error(Constants.SELECT_AT_LEAST(3));
        } else {
            removeRedundancyVideo(res);
            setFiles(res);
        }
    }, [setFiles]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: acceptFileType,
        maxSize: 10485760,
        maxFiles: 10
    });

    function removeRedundancyVideo(files: FileModel[]) {
        const videos = files.filter((f) => f.Ext.toLowerCase() === 'mp4');
        if (videos.length > 1) {
            const index = files.indexOf(videos[1], 0);
            if (index > -1) {
                files.splice(index, 1);
            }
        }
    }

    return (
        <div {...getRootProps()} style={isDragActive ? {...dzStyle, ...dzActive} : dzStyle}>
            <input {...getInputProps()} />
            <Icon name={'upload'} size={'big'}/>
            <Header content={'Kéo thả hoặc ấn vào đây để chọn file'}/>
        </div>
    );
}

export default observer(FileWidgetDropzone);
