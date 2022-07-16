import React, {useEffect, useState} from 'react';
import {FileModel, RoomComImgViewModel} from '../../../../models/models';
import {useStore} from '../../../../stores/stores';
import FileUploadMainWidget from '../../../../layout/fileupload/file.upload.main.widget';
import {Button, Card, Divider, Icon, Image} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import {useParams} from 'react-router-dom';
import {Constants} from '../../../../config/constant';
import ReactPlayer from 'react-player';
import {runInAction} from 'mobx';

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
    const {id} = useParams<{ id: string }>();
    const [existedFiles, setExistedFiles] = useState<FileModel[]>(filesPhotoRooms);
    // !!id -> id ? true:false
    const [shouldShowImage, setShouldShowImage] = useState<boolean>(!!id);

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
        setShouldShowImage(false);
    }

    function setRoomComImg() {
        if (filesPhotoRooms.length > 0) {
            const res = filesPhotoRooms.map((m) => {
                const roomImg: RoomComImgViewModel = {
                    Desc: m.Desc,
                    Doctype: m.Ext,
                    Roomdocurl: m.S3FileName,
                    Mainphoto: m.Mainphoto
                };
                return roomImg;
            });
            if (roomInfo) {
                runInAction(() => {
                    roomInfo.roomComImgViewModels = res;
                });
            }
        }
    }

    return (
        <>
            <FileUploadMainWidget
                acceptFileType={{'image/png': ['.png', '.jpg', '.jpeg', '.mp4', '.MP4']}}
                uploadFiles={handlePhotoUpload} loading={uploadInProgress}
                existedFiles={existedFiles} fileJustDropIntoRegion={fileJustDropIntoRegion}/>
            <Divider/>
            {
                id && shouldShowImage && <Card.Group key={'cardGroup'} itemsPerRow={4}>
                    {
                        roomInfo?.roomComImgViewModels.map((m, index) => {
                            return (
                                <Card raised key={`cardImgExistedRoom${index.toString()}`} color={'orange'}>
                                    {
                                        m.Doctype.toLowerCase() !== 'mp4' ? <Image key={`imgExistRoom${index}`}
                                                                                   src={Constants.S3_ROOT_URL + '/' + m.Roomdocurl}/> :
                                            <ReactPlayer key={`'videoExistRoom'${index}`}
                                                         url={Constants.S3_ROOT_URL + '/' + m.Roomdocurl} muted
                                                         controls light={false} width={'100%'}
                                                         config={{file: {attributes: {controlsList: 'nodownload'}}}}
                                                         onContextMenu={(e: any) => e.preventDefault()}/>
                                    }
                                </Card>
                            );
                        })
                    }
                </Card.Group>
            }
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                <Button primary onClick={() => {
                    prevStep();
                }} icon labelPosition='left' type={'button'}>
                    Quay lại
                    <Icon name='arrow left'/>
                </Button>
                {
                    shouldGoNext || shouldShowImage ? <Button primary onClick={() => {
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
