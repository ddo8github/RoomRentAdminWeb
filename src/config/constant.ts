import {RoomUtility, StepperModel} from '../models/models';
import {SemanticWIDTHS} from 'semantic-ui-react';

const NAV_ROOM_COMPANY = '/roomcom';
const NAV_PARTNER = '/partner';
const NAV_ROM_NEW = '/roomnew';
const NAV_ROM_EDIT = '/edit/:id';
const NAV_ROM_EDIT_PARAM = (id: string) => `/edit/${id}`;
const ROOM_COMPANY = 'roomcom';
const PARTNER = 'partner';
const ROM_NEW = 'roomnew';
const TIME_OUT_SECOND = 300;
const CARD_PER_ROWS: SemanticWIDTHS = 2;
const PAGE_SIZE: number = 2;
const S3_ROOT_URL = 'https://ddo-myvideos.s3.ap-southeast-1.amazonaws.com';

const API_LIST_PROVINCES = 'https://provinces.open-api.vn/api/p';

const MSG_LOADING_APP = 'Signing out...';
const ROOM_TYPE_OPTIONS = [
    {text: 'Phòng', value: 'Phòng'},
    {text: 'Căn hộ', value: 'Căn hộ'},
    {text: 'Căn hộ mini', value: 'Căn hộ mini'},
    {text: 'Nguyên căn', value: 'Nguyên căn'}
];

const ROOM_UTILITIES: RoomUtility[] = [
    {text: 'Wifi', value: 'Wifi', icon: 'wifi', nameField: 'Wifi'},
    {text: 'WC riêng', value: 'WC riêng', icon: 'bath', nameField: 'Personalwc'},
    {text: 'Chỗ giữ xe', value: 'Giữ xe', icon: 'motorcycle', nameField: 'Parking'},
    {text: 'Giờ giấc tự do', value: 'Tự do', icon: 'history', nameField: 'Freetime'},
    {text: 'Bếp', value: 'Bếp', icon: 'food', nameField: 'Kitchen'},
    {text: 'Điều hòa', value: 'Điều hòa', icon: 'snowflake', nameField: 'Aircon'},
    {text: 'Tủ lạnh', value: 'Tủ lạnh', icon: 'calendar', nameField: 'Fridge'},
    {text: 'Máy giặt', value: 'Máy giặt', icon: 'calendar outline', nameField: 'Washingmachine'},
    {text: 'TV', value: 'TV', icon: 'tv', nameField: 'Tv'},
    {text: 'Sân vườn', value: 'Sân vườn', icon: 'tree', nameField: 'Garden'},
    {text: 'Ban công', value: 'Ban công', icon: 'sun outline', nameField: 'Balcony'},
    {text: 'Gần chợ', value: 'Gần chợ', icon: 'shopping cart', nameField: 'Nearmarket'},
];

const ROOM_STEPPERS: StepperModel[] = [
    {
        key: 1,
        icon: 'info',
        title: 'Thông tin',
        description: 'Nhập thông tin phòng',
        active: true
    },
    {
        key: 2,
        icon: 'images',
        title: 'Hình ảnh & Video',
        description: 'Upload hình ảnh và video',
        active: false
    },
    {
        key: 3,
        icon: 'signup',
        title: 'Xác nhận',
        description: 'Xem lại và xác nhận',
        active: false
    }
];

const ADMIN_CONTACT_MESSAGE = 'Đã có sự cố xảy ra. Vui lòng liên hệ Admin';
const CANNOT_GET_DATA = (feature: string) => `Đã có sự cố xảy ra. Chức năng ${feature} không thực hiện được. Vui lòng liên hệ Admin`;
const SELECT_AT_LEAST = (minAmount: number) => `Chọn ít nhất ${minAmount} files`;

const VALIDATION_MESSAGE = {
    MANDATORY: (field: string) => `Thiếu thông tin ${field}`,
    MIN: (field: string, min: number) => `${field} chỉ nhận giá trị nhỏ nhất là ${min}`,
    DATA_TYPE: 'Dữ liệu không phù hợp'
};


export const Constants = {
    NAV_ROOM_COMPANY, NAV_PARTNER, NAV_ROM_NEW, NAV_ROM_EDIT, NAV_ROM_EDIT_PARAM, MSG_LOADING_APP,
    ROOM_COMPANY, PARTNER, ROM_NEW, TIME_OUT_SECOND,
    ROOM_TYPE_OPTIONS, ROOM_UTILITIES, API_LIST_PROVINCES,
    ADMIN_CONTACT_MESSAGE, VALIDATION_MESSAGE, CANNOT_GET_DATA, SELECT_AT_LEAST,
    S3_ROOT_URL, CARD_PER_ROWS, PAGE_SIZE, ROOM_STEPPERS
};
