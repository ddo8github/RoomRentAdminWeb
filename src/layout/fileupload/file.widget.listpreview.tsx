import React, {useEffect, useState} from 'react';
import {Card, Image, Input, Label, Progress, Radio} from 'semantic-ui-react';
import {FileModel} from '../../models/models';
import ReactPlayer from 'react-player';
import {observer} from 'mobx-react-lite';

interface Props {
    files: FileModel[];
}

function FileWidgetListPreview({files}: Props) {
    const [updateCount, setUpdateCount] = useState<number>(0);
    const [mainPhoto, setMainPhoto] = useState<string | number | undefined>(() => {
        const imgFile = files.find((f) => f.Ext.toLowerCase() === 'jpg');
        if (imgFile) {
            imgFile.Mainphoto = 1;
            return imgFile.File.name;
        } else {
            return '';
        }
    });
    const timer = setInterval(() => {
        setUpdateCount(updateCount === 0 ? 1 : 0);
    }, 100);

    useEffect(() => {
        // It is component Unmount
        return () => {
            clearInterval(timer);
        };
    });
    return (
        <>
            <div>
                <Card.Group key={'cardGroup'} itemsPerRow={3}>
                    {
                        files.map((f, index) => {
                            return (
                                <Card raised key={`cardImage${index.toString()}`} color={'orange'}>
                                    {f.Ext !== 'mp4' ?
                                        <Image key={`imgMain${index.toString()}`} src={f.PreviewImage}
                                               style={{width: '100%', height: 'auto'}}/> :
                                        <ReactPlayer key={`'videoFileControl'${index}`}
                                                     url={f.PreviewImage} muted controls light={false}
                                                     width={'100%'}
                                                     config={{file: {attributes: {controlsList: 'nodownload'}}}}
                                                     onContextMenu={(e: any) => e.preventDefault()}/>}
                                    <Card.Content key={`cardContent${index.toString()}`}
                                                  style={{position: 'relative', height: '180px'}}>
                                        <div style={{position: 'absolute', bottom: '0px', width: '100%'}}>
                                            <Card.Header key={`cardHeader${index.toString()}`}
                                                         style={{wordBreak: 'break-word', width: '90%'}}>
                                                <strong>{f.File.name}</strong>
                                            </Card.Header>
                                            <Card.Meta key={`cardMeta${index.toString()}`}>
                                                <strong>Ngày tạo:</strong>
                                                {
                                                    new Date(f.File.lastModified)
                                                        .toLocaleDateString('vi', {
                                                            month: 'long',
                                                            day: '2-digit',
                                                            year: 'numeric',
                                                            weekday: 'long'
                                                        })
                                                }
                                            </Card.Meta>
                                            <Card.Description key={`cardDesc${index.toString()}`}>
                                                <Input size={'mini'} key={'txtDesc' + index.toString()}
                                                       style={{width: '90%', marginBottom: '5px'}}
                                                       placeholder={'Ghi chú'} type={'text'}
                                                       name={'Desc'}
                                                       onChange={(e) => f.Desc = e.target.value}/>
                                            </Card.Description>
                                            {f.Ext.toLowerCase() !== 'mp4' && <Card.Description>
                                                <Radio key={`chkMainPhoto${index}`} label={'Hình chính'}
                                                       name={'Mainphoto'} value={f.File.name}
                                                       checked={mainPhoto === f.File.name}
                                                       onChange={(e, data) => {
                                                           for (let i = 0; i < files.length; i++) {
                                                               files[i].Mainphoto = 0;
                                                           }
                                                           f.Mainphoto = (data.value === f.File.name ? 1 : 0);
                                                           setMainPhoto(data.value);
                                                       }}/>
                                            </Card.Description>}
                                            <Card.Content extra style={{width: '90%'}}
                                                          key={`cardContentExtra${index.toString()}`}>
                                                {f.Percentage > 0 &&
                                                <Progress key={`progress${index.toString()}`} percent={f.Percentage}
                                                          progress={'percent'} success autoSuccess={true}
                                                          color={'green'}/>}
                                                {f.Error && <Label key={`progressLabelError${index.toString()}`}
                                                                   color={'red'}>{f.Error}</Label>}
                                            </Card.Content>
                                        </div>
                                    </Card.Content>
                                </Card>
                            );
                        })
                    }
                </Card.Group>
            </div>
        </>
    );
}

export default observer(FileWidgetListPreview);
