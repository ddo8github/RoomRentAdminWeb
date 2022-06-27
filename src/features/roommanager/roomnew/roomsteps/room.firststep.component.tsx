import React, {useRef, useState} from 'react';
import {Button, Divider, Grid, Header, Icon, Segment} from 'semantic-ui-react';
import {Field, Form, Formik} from 'formik';
import {Validations} from '../../../../utils/validation.schema';
import {RoomInfo} from '../../../../models/models';
import SelectInputCustom from '../../../../layout/custom/selectinput.custom';
import {Constants} from '../../../../config/constant';
import TextInputCustom from '../../../../layout/custom/textinput.custom';
import {useStore} from '../../../../stores/stores';
import {observer} from 'mobx-react-lite';

interface Props {
    nextStep: () => void
}

function RoomFirstStepComponent({nextStep}: Props) {
    const {roomStore} = useStore();
    const [roomInfo, setRoomInfo] = useState<RoomInfo>({
        roomType: '', price: 0, utilities: [], province: '', address: '', district: '', square: 0
    });
    return (
        <Segment clearing>
            <Formik validationSchema={Validations.newRoomInfoValidationSchema}
                    enableReinitialize
                    initialValues={roomStore.roomInfo === null ? roomInfo : roomStore.roomInfo}
                    validateOnMount
                    onSubmit={(value) => console.log(value)}>
                {({values, dirty, isValid}) => {
                    return (
                        <Form className={'ui form'} autoComplete={'off'}>
                            <SelectInputCustom options={Constants.ROOM_TYPE_OPTIONS} placeholder={'Chọn loại phòng'}
                                               label={'Loại phòng'} name={'roomType'}/>
                            <TextInputCustom placeholder={'Giá phòng (VND)'} name={'price'} isnumber={0}
                                             labelabove={'Giá phòng (VND)'}/>
                            <TextInputCustom placeholder={'Diện tích'} name={'square'} isnumber={0}
                                             labelabove={'Diện tích (m<sup>2</sup>)'}/>
                            <Header size={'tiny'} content={'Tiện ích'}/>
                            <Grid columns={4}>
                                {
                                    Constants.ROOM_UTILITIES.map((m, index) => {
                                        return (
                                            <Grid.Column key={`rowUtilities${index}`}>
                                                <div key={`divUtilities${index}`} className={'ui checkbox'}>
                                                    <Field type={'checkbox'} name={'utilities'} value={m.value}/>
                                                    <label>{m.text}</label>
                                                </div>
                                            </Grid.Column>
                                        );
                                    })
                                }
                            </Grid>
                            <Divider/>
                            <div style={{textAlign: 'right'}}>
                                {<Button primary onClick={() => {
                                    roomStore.setRoomInfo(values);
                                    console.log(roomStore.roomInfo);
                                    nextStep();
                                }} icon labelPosition='right' type={'button'}
                                         disabled={!isValid}>
                                    Tiếp tục
                                    <Icon name='arrow right'/>
                                </Button>}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Segment>
    );
}

export default observer(RoomFirstStepComponent);
