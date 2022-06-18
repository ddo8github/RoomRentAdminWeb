import React from 'react';
import logo from '../../logo.png';
import './navbar.component.css';
import {NavLink} from 'react-router-dom';
import {Button, Icon, Menu} from 'semantic-ui-react';
import {NAV_PARTNER, NAV_ROOM_COMPANY} from '../../config/constant';
import {useStore} from '../../stores/stores';
import {observer} from 'mobx-react-lite';

function NavbarComponent() {
    const {commonStore, userStore} = useStore();
    return (
        <Menu>
            <Menu.Item><img className='ui image logo' src={logo} alt={''}/></Menu.Item>
            <Menu.Item>
                <div className='ui icon input icon'>
                    <input type='text' placeholder='Tìm kiếm phòng' style={{borderRadius: '24px'}}/>
                    <i aria-hidden='true' className='search icon'></i>
                </div>
            </Menu.Item>
            <div className='group-middle-nav-btn'>
                <Menu.Item name={NAV_ROOM_COMPANY} as={NavLink} to={'/' + NAV_ROOM_COMPANY}
                           activeClassName='active-nav-link'>
                    <i aria-hidden='true' className='home icon middle-nav-icon'>
                    </i>
                </Menu.Item>
                <Menu.Item name='profile' as={NavLink} to='/profile' activeClassName='active-nav-link'>
                    <i aria-hidden='true' className='user circle icon middle-nav-icon'>
                    </i>
                </Menu.Item>
                <Menu.Item name={NAV_PARTNER} as={NavLink} to={'/' + NAV_PARTNER} activeClassName='active-nav-link'>
                    <i aria-hidden='true' className='group icon middle-nav-icon'>
                    </i>
                </Menu.Item>
                <Menu.Item name='video' as={NavLink} to='/video' activeClassName='active-nav-link'>
                    <i aria-hidden='true' className='video play icon middle-nav-icon'>
                    </i>
                </Menu.Item>
            </div>
            <Menu.Item position='right'>
                <Icon circular name='user' size={'large'}/>
                <span style={{marginLeft: '10px'}}>Hello {commonStore.user?.Username}</span>
            </Menu.Item>
            <Menu.Item as={Button} onClick={() => userStore.logout()}>
                <Icon name={'sign-out'}/>
            </Menu.Item>
        </Menu>
    );
}

export default observer(NavbarComponent);
