import {StepperModel} from '../models/models';
import {makeAutoObservable} from 'mobx';

export default class RoomStore {
    public roomSteppers: StepperModel[] = [
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

    constructor() {
        makeAutoObservable(this);
    }
}
