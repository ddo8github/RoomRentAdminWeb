import React from 'react';
import './footer.component.css';
import {Divider, Icon, Image, List} from 'semantic-ui-react';

function FooterComponent() {
    return (
        <div className='footer-basic'>
            <Divider/>
            <footer>
                <div style={{display: 'table', margin: '0 auto', color: '#1E88E5'}}>
                    <List horizontal relaxed>
                        <List.Item>
                            <Image><Icon name={'facebook square'} size={'big'}/></Image>
                            <List.Content style={{width: 'auto'}}>
                                <List.Header as={'a'} href={'#'}>Facebook</List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <Image><Icon name={'youtube'} size={'big'}/></Image>
                            <List.Content style={{width: 'auto'}}>
                                <List.Header as={'a'} href={'#'}>Youtube Channel</List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <Image><Icon name={'instagram'} size={'big'}/></Image>
                            <List.Content style={{width: 'auto'}}>
                                <List.Header as={'a'} href={'#'}>Instagram</List.Header>
                            </List.Content>
                        </List.Item>
                    </List>
                </div>
                <div style={{display: 'table', margin: '0 auto'}}>
                    <List horizontal size={'large'}>
                        <List.Item href={'#'}>Giới thiệu</List.Item>
                        <List.Item href={'#'}>Liên hệ</List.Item>
                        <List.Item href={'#'}>Hỗ trợ</List.Item>
                    </List>
                </div>
                <p className='copyright'>AZ Building © 2022</p>
            </footer>
        </div>
    );
}

export default FooterComponent;
