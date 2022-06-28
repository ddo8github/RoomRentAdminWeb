import React, {useEffect, useState} from 'react';
import {Card, Image, Input, Label, Progress} from 'semantic-ui-react';
import {FileModel} from '../../models/models';
import {observer} from 'mobx-react-lite';

interface Props {
    files: FileModel[];
}

function FileWidgetListPreview({files}: Props) {
    const [updateCount, setUpdateCount] = useState<number>(0);
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
                                    <Image key={`imgMain${index.toString()}`} src={f.PreviewImage}
                                           style={{width: '100%', height: 'auto'}}/>
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
                                                       onChange={(e) => f.Desc = e.target.value}/>
                                            </Card.Description>
                                            <Card.Content extra style={{width: '90%'}}
                                                          key={`cardContentExtra${index.toString()}`}>
                                                <Progress key={`progress${index.toString()}`} percent={f.Percentage}
                                                          progress={'percent'} success autoSuccess={true}
                                                          color={'green'}/>
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
