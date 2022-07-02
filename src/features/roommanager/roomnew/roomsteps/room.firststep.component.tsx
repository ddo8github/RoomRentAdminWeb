import React, {useEffect, useState} from 'react';
import {Button, Divider, Grid, Header, Icon, Segment} from 'semantic-ui-react';
import {Field, Form, Formik} from 'formik';
import {Validations} from '../../../../utils/validation.schema';
import {District, Option, Province, RoomInfo, Ward} from '../../../../models/models';
import SelectInputCustom from '../../../../layout/custom/selectinput.custom';
import {Constants} from '../../../../config/constant';
import TextInputCustom from '../../../../layout/custom/textinput.custom';
import {useStore} from '../../../../stores/stores';
import {observer} from 'mobx-react-lite';
import {toast} from 'react-toastify';

interface Props {
    nextStep: () => void
}

function RoomFirstStepComponent({nextStep}: Props) {
    const {
        roomStore,
        commonStore: {getListProvinces, getListDistrictByProvince, getListWardByDistrict, isDataLoading, setAppLoaded}
    } = useStore();
    const [roomInfo] = useState<RoomInfo>({
        roomType: '', price: 0, utilities: [], province: null, ward: null, address: '', district: null, square: 0
    });
    const [provinces, setProvinces] = useState<Option<Province>[]>([]);
    const [districts, setDistricts] = useState<Option<District>[]>([]);
    const [wards, setWards] = useState<Option<Ward>[] | undefined>([]);
    const [target, setTarget] = useState('');
    const [provinceCode, setProvinceCode] = useState('');
    useEffect(() => {
        setTarget('provinceLoad');
        setTarget('districtLoad');
        (async () => {
            setProvinces(await getListProvinces());
            if (roomStore.roomInfo?.province && roomStore.roomInfo?.district) {
                setDistricts(await getListDistrictByProvince(roomStore.roomInfo?.province.code.toString()));
                if (roomStore.roomInfo?.ward) {
                    setWards(await getListWardByDistrict(roomStore.roomInfo?.province.code.toString(), roomStore.roomInfo?.district.code.toString()));
                }
            }
            console.clear();
        })();
    }, [setProvinces]);

    async function getDistrictByProvince(province: Province) {
        try {
            console.clear();
            if (province.code) {
                setProvinceCode(province.code.toString());
                setTarget('districtLoad');
                setTarget('wardLoad');
                setDistricts(await getListDistrictByProvince(province.code.toString()));
            } else {
                setDistricts([]);
                setWards([]);
            }
            console.clear();
        } catch (e) {
            toast.error(Constants.ADMIN_CONTACT_MESSAGE);
        }
    }

    async function getWardByDistrict(district: District) {
        try {
            console.clear();
            setTarget('wardLoad');
            if (district.code && provinceCode) {
                setWards(await getListWardByDistrict(provinceCode, district.code.toString()));
            } else {
                setWards([]);
            }
        } catch (e) {
            toast.error(Constants.ADMIN_CONTACT_MESSAGE);
        }
    }

    return (
        <Segment clearing>
            <Formik validationSchema={Validations.newRoomInfoValidationSchema}
                    enableReinitialize
                    initialValues={roomStore.roomInfo === null ? roomInfo : roomStore.roomInfo}
                    validateOnMount
                    onSubmit={(value) => console.log(value)}>
                {({values, isValid}) => {
                    return (
                        <Form className={'ui form'} autoComplete={'off'}>
                            <SelectInputCustom options={Constants.ROOM_TYPE_OPTIONS}
                                               placeholder={'Chọn loại phòng'}
                                               label={'Loại phòng'} name={'roomType'} isLoading={false}/>
                            <TextInputCustom key={'txtPrice'} placeholder={'Giá phòng (VND)'} name={'price'}
                                             isnumber={0}
                                             labelabove={'Giá phòng (VND)'}/>
                            <TextInputCustom key={'txtSquare'} placeholder={'Diện tích'} name={'square'} isnumber={0}
                                             labelabove={'Diện tích (m<sup>2</sup>)'}/>
                            <SelectInputCustom options={provinces} placeholder={'Chọn tỉnh thành'}
                                               label={'Tỉnh/TP'} name={'province'}
                                               isLoading={target === ('provinceLoad') && isDataLoading}
                                               onChange={(data: any) => getDistrictByProvince(data.value)}/>
                            {values.province && <SelectInputCustom options={districts} placeholder={'Chọn quận huyện'}
                                                                   label={'Quận/Huyện'} name={'district'}
                                                                   isLoading={target === ('districtLoad') && isDataLoading}
                                                                   onChange={(data: any) => getWardByDistrict(data.value)}/>}
                            {values.province && values.district &&
                            <SelectInputCustom options={wards} placeholder={'Chọn phường xã'}
                                               label={'Phường/Xã'} name={'ward'}
                                               isLoading={target === ('wardLoad') && isDataLoading}/>}
                            {values.province && values.district && values.ward &&
                            <TextInputCustom key={'txtAddress'} placeholder={'Số nhà & tên đường'} name={'address'}
                                             isnumber={0}
                                             labelabove={'Số nhà và tên đường'}/>}
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
                                {isValid && <Button primary onClick={() => {
                                    roomStore.setRoomInfo(values);
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
