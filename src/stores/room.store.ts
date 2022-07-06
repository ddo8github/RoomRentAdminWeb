import {FileModel, PaginationHeader, PagingParams, RoomComViewModel, RoomInfo, StepperModel} from '../models/models';
import {makeAutoObservable} from 'mobx';
import agent from '../utils/agent';
import {Constants} from '../config/constant';

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
    public roomInfo: RoomInfo | null = null;
    public filesPreparedUpload: FileModel[] = [];
    public pagination: PaginationHeader | null = null;
    public pagingParam: PagingParams = new PagingParams();

    setPagination = (p: PaginationHeader | null) => {
        this.pagination = p;
    }

    setPagingParams = (p: PagingParams) => {
        this.pagingParam = p;
    }

    setRoomInfo = (roomInfo: RoomInfo) => {
        roomInfo.Utilities.forEach((f) => {
            roomInfo[f] = 1;
        });
        this.roomInfo = roomInfo;
    }

    setFilesPreparedUpload = (fileModel: FileModel[]) => {
        this.filesPreparedUpload = fileModel;
    }

    insertNewCompanyRoom = async () => {
        try {
            if (this.roomInfo) {
                const room: RoomComViewModel = {
                    Aircon: this.roomInfo.Aircon,
                    Balcony: this.roomInfo.Balcony,
                    City: this.roomInfo.City,
                    Desc: this.roomInfo.Desc,
                    District: this.roomInfo.District,
                    Display: 1,
                    Freetime: this.roomInfo.Freetime,
                    Fridge: this.roomInfo.Fridge,
                    Garden: this.roomInfo.Garden,
                    Kitchen: this.roomInfo.Kitchen,
                    Nearmarket: this.roomInfo.Nearmarket,
                    Parking: this.roomInfo.Parking,
                    Personalwc: this.roomInfo.Personalwc,
                    Price: parseInt(this.roomInfo.Price.replaceAll(',', ''), 10),
                    roomComImgViewModels: this.roomInfo.roomComImgViewModels,
                    Roomnumber: this.roomInfo.Roomnumber,
                    Square: parseInt(this.roomInfo.Square.replaceAll(',', ''), 10),
                    Tv: this.roomInfo.Tv,
                    Ward: this.roomInfo.Ward,
                    Street: this.roomInfo.Street,
                    Type: this.roomInfo.Type,
                    Washingmachine: this.roomInfo.Washingmachine,
                    Wifi: this.roomInfo.Wifi
                };
                await agent.Room.insertNewRoomCompany(room);
            }
        } catch (e) {
            throw new Error(Constants.CANNOT_GET_DATA('insertNewCompanyRoom'));
        }
    }

    getListRoomCompany = async () => {
        try {
            const res = await agent.Room.getListRoomCompany(this.pagingParam);
            this.setPagination(res.Data ? res.Data.Pagination : null);
            return res.Data ? res.Data.Items : [];
        } catch (e) {
            throw new Error(Constants.CANNOT_GET_DATA('getListRoomCompany'));
        }
    }

    constructor() {
        makeAutoObservable(this);
    }
}
