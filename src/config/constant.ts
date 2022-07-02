const NAV_ROOM_COMPANY = '/roomcom';
const NAV_PARTNER = '/partner';
const NAV_ROM_NEW = '/roomnew';
const ROOM_COMPANY = 'roomcom';
const PARTNER = 'partner';
const ROM_NEW = 'roomnew';
const TIME_OUT_SECOND = 300;

const API_LIST_PROVINCES = 'https://provinces.open-api.vn/api/p';

const MSG_LOADING_APP = 'Signing out...';
const ROOM_TYPE_OPTIONS = [
    {text: 'Phòng', value: 'Phòng'},
    {text: 'Căn hộ', value: 'Căn hộ'},
    {text: 'Căn hộ mini', value: 'Căn hộ mini'},
    {text: 'Nguyên căn', value: 'Nguyên căn'}
];

const ROOM_UTILITIES = [
    {text: 'Wifi', value: 'Wifi'},
    {text: 'WC riêng', value: 'WC riêng'},
    {text: 'Giữ xe', value: 'Giữ xe'},
    {text: 'Tự do', value: 'Tự do'},
    {text: 'Bếp', value: 'Bếp'},
    {text: 'Điều hòa', value: 'Điều hòa'},
    {text: 'Tủ lạnh', value: 'Tủ lạnh'},
    {text: 'Máy giặt', value: 'Máy giặt'},
];

const ADMIN_CONTACT_MESSAGE = 'Đã có sự cố xảy ra. Vui lòng liên hệ Admin';

const VALIDATION_MESSAGE = {
    MANDATORY: (field: string) => `Thiếu thông tin ${field}`,
    MIN: (field: string, min: number) => `${field} chỉ nhận giá trị nhỏ nhất là ${min}`,
    DATA_TYPE: 'Dữ liệu không phù hợp'
};


export const Constants = {
    NAV_ROOM_COMPANY, NAV_PARTNER, NAV_ROM_NEW, MSG_LOADING_APP,
    ROOM_COMPANY, PARTNER, ROM_NEW, TIME_OUT_SECOND,
    ROOM_TYPE_OPTIONS, ROOM_UTILITIES, API_LIST_PROVINCES,
    ADMIN_CONTACT_MESSAGE, VALIDATION_MESSAGE
};
