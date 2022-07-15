import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Divider, Grid, Header, Icon, Segment} from 'semantic-ui-react';
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
import TextAreaCustom from '../../../../layout/custom/text.area.custom';
import {useParams} from 'react-router-dom';
import {runInAction} from 'mobx';

interface Props {
    nextStep: () => void
}

function RoomFirstStepComponent({nextStep}: Props) {
    const {
        roomStore,
        commonStore: {getListProvinces, getListDistrictByProvince, getListWardByDistrict, isDataLoading, setAppLoaded}
    } = useStore();
    const [roomInfo, setRoomInfo] = useState<RoomInfo>({
        Type: '',
        Price: '0',
        Utilities: [],
        Street: '',
        City: '',
        CityCode: '',
        Ward: '',
        WardCode: '',
        District: '',
        DistrictCode: '',
        Square: '0',
        Aircon: 0,
        Balcony: 0,
        Desc: '',
        Display: 1,
        Roomnumber: '',
        roomComImgViewModels: [],
        Freetime: 0,
        Fridge: 0,
        Id: null,
        Garden: 0,
        Kitchen: 0,
        Nearmarket: 0,
        Parking: 0,
        Tv: 0,
        Personalwc: 0,
        Washingmachine: 0,
        Wifi: 0,
        Phone: ''
    });
    const [provinces, setProvinces] = useState<Option[]>([]);
    const [districts, setDistricts] = useState<Option[]>([]);
    const [wards, setWards] = useState<Option[]>([]);
    const [target, setTarget] = useState('');
    const [provinceCode, setProvinceCode] = useState('');
    const [{cityText, districtText, wardText}, setProDisWardText] = useState({
        cityText: roomStore.roomInfo?.City ?? '',
        districtText: roomStore.roomInfo?.District ?? '',
        wardText: roomStore.roomInfo?.Ward ?? ''
    });
    const {id} = useParams<{ id: string }>();
    const [loadingExistedRoom, setLoadingExistedRoom] = useState<boolean>(false);
    const [preparingData, setPreparingData] = useState<boolean>(false);
    const [checkAll, setCheckAll] = useState<number>(0);

    useEffect(() => {
        setTarget('provinceLoad');
        (async () => {
            setPreparingData(true);
            setProvinces(await getListProvinces());

            // Edit Case
            if (id && roomStore.reloadForEdit) {
                setLoadingExistedRoom(true);
                const res = await roomStore.getRoomCompanyDetail(id);
                roomStore.setRoomInfoExisted(res!);
                setRoomInfo(res!);
                setLoadingExistedRoom(false);
                setProDisWardText({cityText: res!.City, districtText: res!.District, wardText: res!.Ward});
            }
            if (roomStore.roomInfo && roomStore.roomInfo.CityCode && roomStore.roomInfo.DistrictCode) {
                setDistricts(await getListDistrictByProvince(roomStore.roomInfo.CityCode));
                if (roomStore.roomInfo.WardCode) {
                    setWards(await getListWardByDistrict(roomStore.roomInfo.CityCode, roomStore.roomInfo.DistrictCode));
                }
            }
            setPreparingData(false);
        })();
    }, [setProvinces]);

    async function getDistrictByProvince(data: any) {
        try {
            setDistricts([]);
            setWards([]);
            const provinceCode = data.value;
            if (provinceCode) {
                const res = data.options.find((f: any) => f.value === provinceCode);
                if (res) {
                    setProDisWardText({cityText: res.text, districtText: '', wardText: ''});
                }
                setProvinceCode(provinceCode);
                setTarget('districtLoad');
                setDistricts(await getListDistrictByProvince(provinceCode));
            }
        } catch (e) {
            toast.error(Constants.ADMIN_CONTACT_MESSAGE);
        }
    }

    async function getWardByDistrict(data: any) {
        try {
            setTarget('wardLoad');
            const districtCode = data.value;
            if (districtCode && provinceCode) {
                const res = data.options.find((f: any) => f.value === districtCode);
                if (res) {
                    setProDisWardText({cityText: cityText, districtText: res.text, wardText: ''});
                }
                setWards(await getListWardByDistrict(provinceCode, districtCode));
            } else {
                setWards([]);
            }
        } catch (e) {
            toast.error(Constants.ADMIN_CONTACT_MESSAGE);
        }
    }

    function getWardName(data: any) {
        const wardCode = data.value;
        const res = data.options.find((f: any) => f.value === wardCode);
        if (res) {
            setProDisWardText({cityText: cityText, districtText: districtText, wardText: res.text});
        }
    }

    return (
        <Segment clearing>
            {loadingExistedRoom || preparingData ? <LoadingPlaceholder/> :
                <Formik validationSchema={Validations.newRoomInfoValidationSchema}
                        enableReinitialize
                        initialValues={roomStore.roomInfo ?? roomInfo}
                        validateOnMount
                        onSubmit={(value) => console.log(value)}>
                    {({values, isValid}) => {
                        // console.log(values);
                        return (
                            <Form className={'ui form'} autoComplete={'off'}>
                                <Grid relaxed columns={2}>
                                    <Grid.Column>
                                        <SelectInputCustom options={Constants.ROOM_TYPE_OPTIONS}
                                                           placeholder={'Chọn loại phòng'}
                                                           label={'Loại phòng'} name={'Type'}
                                                           isLoading={false}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <NumericTextbox key={'txtPrice'} placeholder={'Giá phòng (VND)'} name={'Price'}
                                                        labelabove={'Giá phòng (VND)'}
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <NumericTextbox key={'txtSquare'} placeholder={'Diện tích'} name={'Square'}
                                                        labelabove={'Diện tích (m<sup>2</sup>)'}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <TextInputCustom key={'txtRoomNumber'} placeholder={'Tên/Số Phòng'}
                                                         name={'Roomnumber'} labelabove={'Tên/Số Phòng'}/>
                                    </Grid.Column>
                                </Grid>
                                <div>
                                    {
                                        isDataLoading ? <LoadingPlaceholder/> :
                                            <Grid relaxed columns={2}>
                                                <Grid.Column>
                                                    <SelectInputCustom options={provinces}
                                                                       placeholder={'Chọn tỉnh thành'}
                                                                       label={'Tỉnh/TP'} name={'CityCode'}
                                                                       isLoading={target === ('provinceLoad') && isDataLoading}
                                                                       onChange={(data: any) => getDistrictByProvince(data)}/>
                                                </Grid.Column>
                                                {values.CityCode &&
                                                <Grid.Column>
                                                    <SelectInputCustom options={districts}
                                                                       placeholder={'Chọn quận huyện'}
                                                                       label={'Quận/Huyện'} name={'DistrictCode'}
                                                                       isLoading={target === ('districtLoad') && isDataLoading}
                                                                       onChange={(data: any) => getWardByDistrict(data)}/>
                                                </Grid.Column>}
                                                {values.CityCode && values.DistrictCode &&
                                                <Grid.Column>
                                                    <SelectInputCustom options={wards} placeholder={'Chọn phường xã'}
                                                                       label={'Phường/Xã'} name={'WardCode'}
                                                                       isLoading={target === ('wardLoad') && isDataLoading}
                                                                       onChange={(data: any) => getWardName(data)}/>
                                                </Grid.Column>}
                                                {values.CityCode && values.DistrictCode && values.WardCode &&
                                                <Grid.Column>
                                                    <TextInputCustom key={'txtAddress'}
                                                                     placeholder={'Số nhà & tên đường'}
                                                                     name={'Street'}
                                                                     labelabove={'Số nhà và tên đường'}/>
                                                </Grid.Column>}
                                            </Grid>
                                    }
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <TextInputCustom key={'txtPhone'} placeholder={'Số điện thoại'}
                                                     name={'Phone'} labelabove={'Số điện thoại'}/>
                                </div>
                                <div style={{marginTop: '10px', display: 'flex'}}>
                                    <Header size={'tiny'} content={'Tiện ích'}/>
                                    <Checkbox style={{marginLeft: '10px'}} type={'checkbox'} checked={checkAll === 1}
                                              value={checkAll}
                                              onChange={(e) => {
                                                  if (checkAll === 0) {
                                                      values.Utilities = Constants.ROOM_UTILITIES.map((m) => m.nameField);
                                                  } else {
                                                      values.Utilities = [];
                                                  }
                                                  setCheckAll(checkAll === 0 ? 1 : 0);
                                              }}/>
                                </div>
                                <Grid columns={4}>
                                    {
                                        Constants.ROOM_UTILITIES.map((m, index) => {
                                            return (
                                                <Grid.Column key={`rowUtilities${index}`}>
                                                    <div key={`divUtilities${index}`} className={'ui checkbox'}>
                                                        <Field type={'checkbox'} name={'Utilities'}
                                                               value={m.nameField}/>
                                                        <label><Icon color={'blue'}
                                                                     name={m.icon}/><strong>{m.text}</strong></label>
                                                    </div>
                                                </Grid.Column>
                                            );
                                        })
                                    }
                                </Grid>
                                <div style={{marginTop: '10px'}}>
                                    <TextAreaCustom placeholder={'Ghi chú'} name={'Desc'} rows={3} label={'Ghi chú'}/>
                                </div>
                                <Divider/>
                                <div style={{textAlign: 'right'}}>
                                    {isValid && <Button primary onClick={() => {
                                        runInAction(() => {
                                            values.City = cityText;
                                            values.District = districtText;
                                            values.Ward = wardText;
                                        });
                                        roomStore.setRoomInfoInit(values);
                                        roomStore.setReloadForEdit(false);
                                        nextStep();
                                    }} icon labelPosition='right' type={'button'}
                                                        disabled={!isValid}>
                                        Tiếp tục <Icon name='arrow right'/>
                                    </Button>}
                                </div>
                            </Form>
                        );
                    }}
                </Formik>}
        </Segment>
    );
}

export default observer(RoomFirstStepComponent);
