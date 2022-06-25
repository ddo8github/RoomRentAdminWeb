import React from 'react';
import {Card, Image, Input, Label, Progress} from 'semantic-ui-react';
import {FileModel} from '../../models/models';

interface Props {
    files: FileModel[];
}

function FileWidgetListPreview({files}: Props) {
    return (
        <>
            <div>
                <Card.Group itemsPerRow={3}>
                    {
                        files.map((f, index) => {
                            return (
                                <Card raised key={'imgUpload' + index.toString()} color={'orange'}>
                                    <Image src={f.previewImage}
                                           style={{width: '100%', height: 'auto'}}/>
                                    <Card.Content style={{position: 'relative', height: '180px'}}>
                                        <div style={{position: 'absolute', bottom: '0px', width: '100%'}}>
                                            <Card.Header style={{wordBreak: 'break-word', width: '90%'}}>
                                                <strong>{f.File.name}</strong>
                                            </Card.Header>
                                            <Card.Meta><strong>Ngày tạo:</strong>
                                                {new Date(f.File.lastModified)
                                                    .toLocaleDateString('vi', {
                                                        month: 'long',
                                                        day: '2-digit',
                                                        year: 'numeric',
                                                        weekday: 'long'
                                                    })}
                                            </Card.Meta>
                                            <Card.Description>
                                                <Input size={'mini'} key={'txtDesc' + index.toString()}
                                                       style={{width: '90%'}} placeholder={'Ghi chú'}/>
                                            </Card.Description>
                                            <Card.Content extra style={{width: '90%'}}>
                                                <Progress key={'progress' + index.toString()} percent={f.Percentage}
                                                          progress={'percent'} autoSuccess={true} color={'green'}/>
                                                {f.error && <Label color={'red'}>{f.error}</Label>}
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

export default FileWidgetListPreview;
