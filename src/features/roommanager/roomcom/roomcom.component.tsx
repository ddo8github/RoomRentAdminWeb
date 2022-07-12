import './roomcom.component.css';
import React, {useEffect, useState} from 'react';
import {Button, Card, Header, Icon, Image, Rating} from 'semantic-ui-react';
import {useStore} from '../../../stores/stores';
import {Constants} from '../../../config/constant';
import {PagingParams, RoomCompanySumary} from '../../../models/models';
import {observer} from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingRoomsCompany from '../../../layout/loadingplaceholder/loading.roomscompany';

function RoomcomComponent() {
    const {
        commonStore: {goToPage},
        roomStore: {getListRoomCompany, setPagingParams, pagination}
    } = useStore();
    const [rooms, setRooms] = useState<RoomCompanySumary[]>([]);
    const [loadingNext, setLoadingNext] = useState<boolean>(false);
    const [loadFirstTime, setLoadFirstTime] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            if (rooms.length === 0) {
                setLoadFirstTime(true);
                setRooms(await getListRoomCompany());
                setLoadFirstTime(false);
            }
        })();
    }, [setRooms]);

    async function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination?.currentPage! + 1));
        const res = await getListRoomCompany();
        rooms.push(...res);
        setLoadingNext(false);
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px'}}>
                <Header as={'h2'}>Danh sách phòng của AZ Building</Header>
                <Button icon labelPosition='right' style={{width: '180px'}} primary
                        onClick={() => goToPage(Constants.NAV_ROM_NEW)}>
                    Thêm Phòng
                    <Icon name='add square'/>
                </Button>
            </div>
            <div>
                <InfiniteScroll pageStart={0}
                                loadMore={handleGetNext}
                                hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                                initialLoad={false}>
                    {loadFirstTime ? <LoadingRoomsCompany/> :
                        <Card.Group key={'cardRoomGroup'} itemsPerRow={Constants.CARD_PER_ROWS}>
                            {
                                rooms.map((m, index) => {
                                    return (
                                        <Card key={`cardRoom${index}`} href='#card-example-link-card' color={'blue'}
                                              style={{'marginBottom': '25px'}}>
                                            <Image
                                                src={`${Constants.S3_ROOT_URL}/${m.roomComImgViewModels[0].Roomdocurl}`}
                                                wrapped ui={false}/>
                                            <Card.Content>
                                                <Card.Header>{m.Roomnumber}</Card.Header>
                                                <Card.Description style={{fontWeight: 'bold', fontSize: '12px'}}>
                                                    <p><Icon name={'home'} size={'large'}
                                                             color={'blue'}/><span>{`${m.Street}, ${m.Ward}, ${m.District}, ${m.City}`}</span>
                                                    </p>
                                                    <p>
                                                        <Icon name={'phone volume'} size={'large'}
                                                              color={'blue'}/><span>0909888666</span>
                                                    </p>
                                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                        <p>
                                                            <Icon name={'money bill alternate outline'} size={'large'}
                                                                  color={'blue'}/><span>{m.Price.toLocaleString('en')}<sup>đ</sup>/tháng</span>
                                                        </p>
                                                        <p>
                                                            <Icon name={'square outline'} size={'large'}
                                                                  color={'blue'}/><span>{m.Square}m<sup>2</sup></span>
                                                        </p>
                                                    </div>
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <Rating icon='star' defaultRating={3} maxRating={5}/>
                                            </Card.Content>
                                        </Card>
                                    );
                                })
                            }
                        </Card.Group>
                    }
                </InfiniteScroll>
                <div style={{width: '100%', display: 'table', margin: '0 auto'}}>
                    {loadingNext && <LoadingRoomsCompany/>}
                </div>
            </div>
        </div>
    );
}

export default observer(RoomcomComponent);

