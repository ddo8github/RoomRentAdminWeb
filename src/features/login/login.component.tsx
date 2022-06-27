import {ErrorMessage, Field, Form, Formik} from 'formik';
import React from 'react';
import {Button, Header, Icon, Image, Label, Segment, Transition} from 'semantic-ui-react';
import './login.component.css';
import {useHistory} from 'react-router-dom';
import logo from '../../logo.png';
import {useStore} from '../../stores/stores';
import {observer} from 'mobx-react-lite';
import FooterComponent from '../../layout/footer/footer.component';

function LoginComponent() {
    const history = useHistory();
    const {userStore} = useStore();
    return (
        <div>
            <div className={'parent-login-form'}>
                <Segment size={'massive'} color={'orange'} clearing raised className='in-center-login'>
                    <Formik initialValues={{username: '', password: '', error: null}}
                            onSubmit={(values, {setErrors}) => userStore.login(values)
                                .catch((e) => setErrors({error: e.message}))}>
                        {({handleSubmit, isSubmitting, errors}) => (
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
                                <Field placeholder='Username' name='username'
                                       style={{marginBottom: '10px !important'}}/>
                                <Field placeholder='Password' name='password' style={{marginBottom: '10px !important'}}
                                       type='password'/>
                                <ErrorMessage name={'error'} render={() => (
                                    <Label style={{marginBottom: '1.5em'}} basic color={'red'} content={errors.error}/>
                                )}/>
                                <Button loading={isSubmitting} disabled={isSubmitting} primary icon
                                        labelPosition={'right'} type={'submit'}
                                        floated={'right'}>
                                    Đăng Nhập
                                    <Icon name={'arrow right'}/>
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Segment>
            </div>
            <FooterComponent/>
        </div>
    );
}

export default observer(LoginComponent);
