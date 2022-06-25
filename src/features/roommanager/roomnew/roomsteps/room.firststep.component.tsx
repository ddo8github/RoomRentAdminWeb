import React, {useState} from 'react';
import {Grid, Header, Segment} from 'semantic-ui-react';
import {Field, Form, Formik} from 'formik';
import {Validations} from '../../../../utils/validation.schema';
import {RoomInfo} from '../../../../models/models';
import SelectInputCustom from '../../../../layout/custom/selectinput.custom';
import {Constants} from '../../../../config/constant';
import TextInputCustom from '../../../../layout/custom/textinput.custom';

function RoomFirstStepComponent() {
    const [roomInfo, setRoomInfo] = useState<RoomInfo>({
        roomType: '', price: 0, utilities: [], province: '', address: '', district: '', square: 0
    });
    return (
        <Segment clearing>
            <Formik validationSchema={Validations.newRoomInfoValidationSchema}
                    enableReinitialize
                    initialValues={roomInfo}
                    onSubmit={(value) => console.log(value)}>
                <Form className={'ui form'} autoComplete={'off'}>
                    <SelectInputCustom options={Constants.ROOM_TYPE_OPTIONS} placeholder={'Chọn loại phòng'}
                                       label={'Loại phòng'} name={'roomType'}/>
                    <TextInputCustom placeholder={'Giá phòng (VND)'} name={'price'} isnumber={1}
                                     label={'Giá phòng (VND)'}/>
                    <TextInputCustom placeholder={'Diện tích'} name={'square'} isnumber={1} label={'Diện tích'}/>
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
                </Form>
            </Formik>
        </Segment>
    );
}

export default RoomFirstStepComponent;
