import React from 'react';
import logo from '../../logo.png';
import './navbar.component.css';
import {NavLink} from 'react-router-dom';
import {Button, Icon, Menu} from 'semantic-ui-react';
import {useStore} from '../../stores/stores';
import {observer} from 'mobx-react-lite';
import {Constants} from '../../config/constant';

function NavbarComponent() {
    const {userStore: {user, logout}} = useStore();
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
                <Menu.Item name={Constants.ROOM_COMPANY} as={NavLink} to={Constants.NAV_ROOM_COMPANY}
                           activeClassName='active-nav-link'>
                    <i aria-hidden='true' className='home icon middle-nav-icon'>
                    </i>
                </Menu.Item>
                <Menu.Item name='profile' as={NavLink} to='/profile' activeClassName='active-nav-link'>
                    <i aria-hidden='true' className='user circle icon middle-nav-icon'>
                    </i>
                </Menu.Item>
                <Menu.Item name={Constants.PARTNER} as={NavLink} to={Constants.NAV_PARTNER} activeClassName='active-nav-link'>
                    <i aria-hidden='true' className='group icon middle-nav-icon'>
                    </i>
                </Menu.Item>
                <Menu.Item name='video' as={NavLink} to='/video' activeClassName='active-nav-link'>
                    <i aria-hidden='true' className='video play icon middle-nav-icon'>
                    </i>
                </Menu.Item>
            </div>
            <Menu.Item position='right'>
                <Icon circular name='user' size={'large'} style={{color: '#1E88E5'}}/>
                <strong style={{marginLeft: '10px'}}>Hello {user?.Username}</strong>
            </Menu.Item>
            <Menu.Item as={Button} onClick={() => logout()}>
                <Icon name={'sign-out'} size={'big'} style={{color: '#1E88E5'}}/>
            </Menu.Item>
        </Menu>
    );
}

export default observer(NavbarComponent);
