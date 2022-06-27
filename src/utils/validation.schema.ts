import * as Yup from 'yup';

const newRoomInfoValidationSchema = Yup.object({
    roomType: Yup.string().required('Thiếu thông tin loại phòng'),
    price: Yup.number().required('Thiếu thông tin giá phòng'),
    square: Yup.number().required('Thiếu thông diện tích phòng'),
    // province: Yup.string().required('Thiếu thông tin tỉnh thành'),
    // district: Yup.string().required('Thiếu thông tin quận huyện'),
    // address: Yup.string().required('Thiếu thông số nhà & tên đường'),
});

export const Validations = {
    newRoomInfoValidationSchema
};
