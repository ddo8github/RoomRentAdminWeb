import {StepperModel} from '../models/models';
import {makeAutoObservable} from 'mobx';

export default class RoomStore {
    public steppers: StepperModel[] = [
        {
            key: 'info',
            icon: 'info',
            title: 'Thông tin',
            description: 'Nhập thông tin phòng'
        },
        {
            key: 'images',
            icon: 'images',
            title: 'Hình ảnh & Video',
            description: 'Upload hình ảnh và video'
        },
        {
            key: 'confirm',
            icon: 'signup',
            title: 'Xác nhận',
            description: 'Xem lại và xác nhận'
        }
    ];

    constructor() {
        makeAutoObservable(this);
    }
}
