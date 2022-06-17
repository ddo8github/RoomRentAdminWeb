import './roomcom.component.css';
import React from 'react';
import {Card, Header, Icon, Image, Popup, Rating} from 'semantic-ui-react';
import p1 from '../../images/p1.jpg';

function RoomcomComponent() {
    return (
        <div>
            <Header as={'h2'}>Danh sách phòng của AZ Building</Header>
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

