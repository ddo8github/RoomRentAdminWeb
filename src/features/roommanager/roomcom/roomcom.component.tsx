import './roomcom.component.css';
import React from 'react';
import {Button, Card, Header, Icon, Image, Popup, Rating} from 'semantic-ui-react';
import p1 from '../../../images/p1.jpg';
import {useStore} from '../../../stores/stores';
import {NAV_ROM_NEW} from '../../../config/constant';

function RoomcomComponent() {
    const {commonStore: {goToPage}} = useStore();
    return (
        <div>
            <div style={{display: 'flex', width: '100%', marginBottom: '20px'}}>
                <Header as={'h2'} style={{width: '90%'}}>Danh sách phòng của AZ Building</Header>
                <Button icon labelPosition='right' style={{width: '180px'}} primary
                        onClick={() => goToPage('/' + NAV_ROM_NEW)}>
                    Thêm Phòng
                    <Icon name='add square'/>
                </Button>
            </div>

            <div>
                <Card.Group>
                    <Card
                        href='#card-example-link-card'
                        color={'blue'}>
                        <Image src={p1} wrapped ui={false}/>
                        <Card.Content>
                            <Card.Header>Phòng 101</Card.Header>
                            <Card.Description style={{fontWeight: 'bold'}}>
                                <p><Icon name={'home'} size={'large'}
                                         color={'blue'}/><span>123 Quang Trung P11 Quận Gò Vấp</span></p>
                                <p><Icon name={'phone volume'} size={'large'} color={'blue'}/><span>0909888666</span>
                                </p>
                                <p><Icon name={'money bill alternate outline'} size={'large'}
                                         color={'blue'}/><span>2,000,000<sup>đ</sup>/tháng</span></p>
                                <p><Icon name={'square outline'} size={'large'}
                                         color={'blue'}/><span>20m<sup>2</sup></span>
                                </p>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div>
                                <Popup trigger={<Icon circular color='blue' name='clock outline'/>}
                                       content={'Giờ giấc tự do'} size={'small'}/>
                                <Popup trigger={<Icon circular color='blue' name='wifi'/>}
                                       content={'Wifi'} size={'small'}/>
                            </div>
                        </Card.Content>
                        <Card.Content extra>
                            <Rating icon='star' defaultRating={3} maxRating={5}/>
                        </Card.Content>
                    </Card>
                    <Card
                        href='#card-example-link-card'
                        color={'blue'}>
                        <Image src={p1} wrapped ui={false}/>
                        <Card.Content>
                            <Card.Header>Phòng 101</Card.Header>
                            <Card.Description style={{fontWeight: 'bold'}}>
                                <p><Icon name={'home'} size={'large'}
                                         color={'blue'}/><span>123 Quang Trung P11 Quận Gò Vấp</span></p>
                                <p><Icon name={'phone volume'} size={'large'} color={'blue'}/><span>0909888666</span>
                                </p>
                                <p><Icon name={'money bill alternate outline'} size={'large'}
                                         color={'blue'}/><span>2,000,000<sup>đ</sup>/tháng</span></p>
                                <p><Icon name={'square outline'} size={'large'}
                                         color={'blue'}/><span>20m<sup>2</sup></span>
                                </p>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div>
                                <Popup trigger={<Icon circular color='blue' name='clock outline'/>}
                                       content={'Giờ giấc tự do'} size={'small'}/>
                                <Popup trigger={<Icon circular color='blue' name='wifi'/>}
                                       content={'Wifi'} size={'small'}/>
                            </div>
                        </Card.Content>
                        <Card.Content extra>
                            <Rating icon='star' defaultRating={3} maxRating={5}/>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </div>
        </div>
    );
}

export default RoomcomComponent;

