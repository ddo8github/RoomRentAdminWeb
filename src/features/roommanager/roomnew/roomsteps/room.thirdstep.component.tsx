import React from 'react';
import {Button, Card, Divider, Icon, Image, Rating} from 'semantic-ui-react';
import {useStore} from '../../../../stores/stores';
import {observer} from 'mobx-react-lite';
import {Constants} from '../../../../config/constant';
import {RoomInfo} from '../../../../models/models';

interface Props {
    finishStep: () => void,
    prevStep: () => void
}

function RoomThirdStepComponent({prevStep, finishStep}: Props) {
    const {roomStore: {roomInfo}} = useStore();

    function getMainPhotoURL(): string {
        if (roomInfo && roomInfo.roomComImgViewModels) {
            const res = roomInfo.roomComImgViewModels.find((f) => f.Mainphoto === 1);
            return res ? res.Roomdocurl : '';
        } else {
            return '';
        }
    }

    function parseDesc(room: RoomInfo) {
        const res = Constants.ROOM_UTILITIES.map((m) => room.Utilities.indexOf(m.nameField) > -1 ? m.text : '');
        return (res.length > 0 ? `${room.Type} đẹp. Có: ` + res.filter((f) => f !== '').join(', ') + '.' : '');
    }

    return (
        roomInfo && roomInfo.roomComImgViewModels && <div>
            <Card style={{'marginBottom': '25px'}}>
                <Image
                    src={`${Constants.S3_ROOT_URL}/${getMainPhotoURL()}`}
                    wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>{roomInfo.Roomnumber}</Card.Header>
                    <Card.Description style={{fontWeight: 'bold', fontSize: '12px'}}>
                        <p style={{'textAlign': 'justify'}}>{parseDesc(roomInfo)}</p>
                        {roomInfo.Desc.trim() !== '' && <p>{roomInfo.Desc}</p>}
                        <p><Icon name={'home'} size={'large'}
                                 color={'blue'}/><span>{`${roomInfo.Street}, ${roomInfo.Ward}, ${roomInfo.District}, ${roomInfo.City}`}</span>
                        </p>
                        <p>
                            <Icon name={'phone volume'} size={'large'}
                                  color={'blue'}/><span>{roomInfo.Phone}</span>
                        </p>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <p>
                                <Icon name={'money bill alternate outline'} size={'large'}
                                      color={'blue'}/><span>{roomInfo.Price}<sup>đ</sup>/tháng</span>
                            </p>
                            <p>
                                <Icon name={'square outline'} size={'large'}
                                      color={'blue'}/><span>{roomInfo.Square}m<sup>2</sup></span>
                            </p>
                        </div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Rating icon='star' defaultRating={3} maxRating={5}/>
                </Card.Content>
            </Card>
            <Divider/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {<Button primary onClick={() => {
                    prevStep();
                }} icon labelPosition='left'>
                    Quay lại
                    <Icon name='arrow left'/>
                </Button>}
                {<Button primary onClick={() => {
                    finishStep();
                }} icon labelPosition='right'>
                    Lưu
                    <Icon name='save'/>
                </Button>}
            </div>
        </div>
    );
}

export default observer(RoomThirdStepComponent);
