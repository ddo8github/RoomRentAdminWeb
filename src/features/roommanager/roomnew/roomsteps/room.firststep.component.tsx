import React, {useEffect, useState} from 'react';
import {Button, Divider, Grid, Header, Icon, Segment} from 'semantic-ui-react';
import {Field, Form, Formik} from 'formik';
import {Validations} from '../../../../utils/validation.schema';
import {Option, RoomInfo} from '../../../../models/models';
import SelectInputCustom from '../../../../layout/custom/selectinput.custom';
import {Constants} from '../../../../config/constant';
import TextInputCustom from '../../../../layout/custom/textinput.custom';
import {useStore} from '../../../../stores/stores';
import {observer} from 'mobx-react-lite';
import {toast} from 'react-toastify';
import NumericTextbox from '../../../../layout/custom/numeric.textbox';
import LoadingPlaceholder from '../../../../layout/loadingplaceholder/loading.placeholder';

interface Props {
    nextStep: () => void
}

function RoomFirstStepComponent({nextStep}: Props) {
    const {
        roomStore,
        commonStore: {getListProvinces, getListDistrictByProvince, getListWardByDistrict, isDataLoading}
    } = useStore();
    const [roomInfo] = useState<RoomInfo>({
        roomType: '', price: 0, utilities: [], province: '', ward: '', address: '', district: '', square: 0
    });
    const [provinces, setProvinces] = useState<Option[]>([]);
    const [districts, setDistricts] = useState<Option[]>([]);
    const [wards, setWards] = useState<Option[]>([]);
    const [target, setTarget] = useState('');
    const [provinceCode, setProvinceCode] = useState('');
    useEffect(() => {
        setTarget('provinceLoad');
        (async () => {
            setProvinces(await getListProvinces());
            if (roomStore.roomInfo?.province && roomStore.roomInfo?.district) {
                setDistricts(await getListDistrictByProvince(roomStore.roomInfo?.province));
                if (roomStore.roomInfo?.ward) {
                    setWards(await getListWardByDistrict(roomStore.roomInfo?.province, roomStore.roomInfo?.district));
                }
            }
            console.warn = () => {
                console.clear();
            };
        })();
    }, [setProvinces]);

    async function getDistrictByProvince(provinceCode: string) {
        try {
            setDistricts([]);
            setWards([]);
            if (provinceCode) {
                setProvinceCode(provinceCode);
                setTarget('districtLoad');
                setDistricts(await getListDistrictByProvince(provinceCode));
            }
        } catch (e) {
            toast.error(Constants.ADMIN_CONTACT_MESSAGE);
        }
    }

    async function getWardByDistrict(districtCode: string) {
        try {
            console.warn = () => {
                console.clear();
            };
            setTarget('wardLoad');
            if (districtCode && provinceCode) {
                setWards(await getListWardByDistrict(provinceCode, districtCode));
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
                            <Grid relaxed columns={3}>
                                <Grid.Column>
                                    <SelectInputCustom options={Constants.ROOM_TYPE_OPTIONS}
                                                       placeholder={'Chọn loại phòng'}
                                                       label={'Loại phòng'} name={'roomType'}
                                                       isLoading={false}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <NumericTextbox key={'txtPrice'} placeholder={'Giá phòng (VND)'} name={'price'}
                                                    labelabove={'Giá phòng (VND)'}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <NumericTextbox key={'txtSquare'} placeholder={'Diện tích'} name={'square'}
                                                     labelabove={'Diện tích (m<sup>2</sup>)'}/>
                                </Grid.Column>
                            </Grid>
                            <div>
                                {
                                    isDataLoading ? <LoadingPlaceholder/> :
                                        <Grid relaxed columns={2}>
                                            <Grid.Column>
                                                <SelectInputCustom options={provinces}
                                                                   placeholder={'Chọn tỉnh thành'}
                                                                   label={'Tỉnh/TP'} name={'province'}
                                                                   isLoading={target === ('provinceLoad') && isDataLoading}
                                                                   onChange={(data: any) => getDistrictByProvince(data.value)}/>
                                            </Grid.Column>
                                            {values.province &&
                                            <Grid.Column>
                                                <SelectInputCustom options={districts} placeholder={'Chọn quận huyện'}
                                                                   label={'Quận/Huyện'} name={'district'}
                                                                   isLoading={target === ('districtLoad') && isDataLoading}
                                                                   onChange={(data: any) => getWardByDistrict(data.value)}/>
                                            </Grid.Column>}
                                            {values.province && values.district &&
                                            <Grid.Column>
                                                <SelectInputCustom options={wards} placeholder={'Chọn phường xã'}
                                                                   label={'Phường/Xã'} name={'ward'}
                                                                   isLoading={target === ('wardLoad') && isDataLoading}/>
                                            </Grid.Column>}
                                            {values.province && values.district && values.ward &&
                                            <Grid.Column>
                                                <TextInputCustom key={'txtAddress'} placeholder={'Số nhà & tên đường'}
                                                                 name={'address'} labelabove={'Số nhà và tên đường'}/>
                                            </Grid.Column>}
                                        </Grid>
                                }
                            </div>
                            <Header size={'tiny'} content={'Tiện ích'}/>
                            <Grid columns={4}>
                                {
                                    Constants.ROOM_UTILITIES.map((m, index) => {
                                        return (
                                            <Grid.Column key={`rowUtilities${index}`}>
                                                <div key={`divUtilities${index}`} className={'ui checkbox'}>
                                                    <Field type={'checkbox'} name={'utilities'} value={m.value}/>
                                                    <label><Icon color={'blue'} name={m.icon}/><strong>{m.text}</strong></label>
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
                                    Tiếp tục <Icon name='arrow right'/>
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
