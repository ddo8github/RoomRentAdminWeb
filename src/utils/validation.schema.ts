import * as Yup from 'yup';
import {Constants} from '../config/constant';

const newRoomInfoValidationSchema = Yup.object({
    Type: Yup.string().required(Constants.VALIDATION_MESSAGE.MANDATORY('Loại phòng')),
    Price: Yup.string()
        .typeError(Constants.VALIDATION_MESSAGE.DATA_TYPE)
        .min(0, Constants.VALIDATION_MESSAGE.MIN('Giá phòng', 0))
        .required(Constants.VALIDATION_MESSAGE.MANDATORY('Giá phòng')),
    Square: Yup.string()
        .typeError(Constants.VALIDATION_MESSAGE.DATA_TYPE)
        .min(0, Constants.VALIDATION_MESSAGE.MIN('Diện tích phòng', 0))
        .required(Constants.VALIDATION_MESSAGE.MANDATORY('Diện tích phòng')),
    CityCode: Yup.string().required(Constants.VALIDATION_MESSAGE.MANDATORY('Tỉnh thành')),
    DistrictCode: Yup.string().required(Constants.VALIDATION_MESSAGE.MANDATORY('Quận huyện')),
    WardCode: Yup.string().required(Constants.VALIDATION_MESSAGE.MANDATORY('Phường xã')),
    Street: Yup.string().required(Constants.VALIDATION_MESSAGE.MANDATORY('Số nhà và tên đường')),
    Phone: Yup.string().required(Constants.VALIDATION_MESSAGE.MANDATORY('Số điện thoại')),
});

export const Validations = {
    newRoomInfoValidationSchema
};
