import {Field, Form, Formik} from 'formik';
import React, {useState} from 'react';
import {Button, Header, Image, Segment, Transition} from 'semantic-ui-react';
import './login.component.css';
import {useHistory} from 'react-router-dom';
import {NAV_ROOM_COMPANY} from '../../config/constant';
import logo from '../../logo.png';

function LoginComponent() {
    const history = useHistory();
    return (
        <div className={'parent-login-form'}>
            <Segment size={'massive'} color={'orange'} clearing raised className='in-center-login'>
                <Formik initialValues={{username: '', password: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                            if (values['username'] === '1') {
                                history.push('/' + NAV_ROOM_COMPANY);
                            }
                        }}>
                    {({handleSubmit}) => (
                        <Form className={'ui form'} autoComplete='off' onSubmit={handleSubmit}>
                            <Header as={'h2'} color={'orange'}>
                                <Transition animation={'tada'} transitionOnMount={true} visible={true}
                                            duration={2000}>
                                    <Image src={logo} size={'massive'}/>
                                </Transition>
                                <Header.Content>
                                    AZ Building Admin
                                    <Header.Subheader>An cư lạc nghiệp</Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Field placeholder='Username' name='username'/>
                            <Field placeholder='Password' name='password' type='password'/>
                            <Button primary type={'submit'} content={'Đăng Nhập'} floated={'right'}/>
                        </Form>
                    )}
                </Formik>
            </Segment>
        </div>
    );
}

export default LoginComponent;
