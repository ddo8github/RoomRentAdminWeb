import * as Yup from 'yup';
import {Constants} from '../config/constant';

const newRoomInfoValidationSchema = Yup.object({
    roomType: Yup.string().required(Constants.VALIDATION_MESSAGE.MANDATORY('Loại phòng')),
    price: Yup.number()
        .typeError(Constants.VALIDATION_MESSAGE.DATA_TYPE)
        .min(0, Constants.VALIDATION_MESSAGE.MIN('Giá phòng', 0))
        .required(Constants.VALIDATION_MESSAGE.MANDATORY('Giá phòng')),
    square: Yup.number()
        .typeError(Constants.VALIDATION_MESSAGE.DATA_TYPE)
        .min(0, Constants.VALIDATION_MESSAGE.MIN('Diện tích phòng', 0))
        .required(Constants.VALIDATION_MESSAGE.MANDATORY('Diện tích phòng')),
    province: Yup.object().required(Constants.VALIDATION_MESSAGE.MANDATORY('Tỉnh thành')),
    district: Yup.object().required(Constants.VALIDATION_MESSAGE.MANDATORY('Quận huyện')),
    ward: Yup.object().required(Constants.VALIDATION_MESSAGE.MANDATORY('Phường xã')),
    address: Yup.string().required(Constants.VALIDATION_MESSAGE.MANDATORY('Số nhà và tên đường')),
});

export const Validations = {
    newRoomInfoValidationSchema
};
