import {FileModel, PaginationHeader, PagingParams, RoomComViewModel, RoomInfo, StepperModel} from '../models/models';
import {makeAutoObservable, runInAction} from 'mobx';
import agent from '../utils/agent';
import {Constants} from '../config/constant';
import {store} from './stores';

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
    public reloadForEdit: boolean = true;

    private parseRoomComViewModel(): RoomComViewModel | null {
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
                Wifi: this.roomInfo.Wifi,
                CityCode: this.roomInfo.CityCode,
                DistrictCode: this.roomInfo.DistrictCode,
                WardCode: this.roomInfo.WardCode,
                Phone: this.roomInfo.Phone,
                Id: this.roomInfo.Id ?? -1
            };
            return room;
        } else {
            return null;
        }
    }

    setReloadForEdit = (status: boolean) => {
        this.reloadForEdit = status;
    }

    setPagination = (p: PaginationHeader | null) => {
        this.pagination = p;
    }

    setPagingParams = (p: PagingParams) => {
        this.pagingParam = p;
    }

    setRoomInfoInit = (roomInfo: RoomInfo) => {
        runInAction(() => {
            roomInfo.Utilities.forEach((f) => {
                roomInfo[f] = 1;
            });
            this.roomInfo = roomInfo;
        });
    }

    setRoomInfoExisted = (roomInfo: RoomInfo) => {
        roomInfo.Utilities = Constants.ROOM_UTILITIES.map((m) => roomInfo[m.nameField] === 1 ? m.nameField : '')
            .filter((f) => f !== '');
        roomInfo.Price = roomInfo.Price.toString();
        roomInfo.Square = roomInfo.Square.toString();
        this.roomInfo = roomInfo;
    }

    resetRoomInfo = () => {
        this.roomInfo = null;
    }

    setFilesPreparedUpload = (fileModel: FileModel[]) => {
        this.filesPreparedUpload = fileModel;
    }

    updateRoomCompany = async () => {
        if (this.roomInfo) {
            const room = this.parseRoomComViewModel();
            await agent.Room.updateRoomCompany(room!);
        }
    }

    insertNewCompanyRoom = async () => {
        try {
            if (this.roomInfo) {
                const room = this.parseRoomComViewModel();
                await agent.Room.insertNewRoomCompany(room!);
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

    getRoomCompanyDetail = async (roomId: string) => {
        try {
            const res = await agent.Room.getRoomCompanyDetail(roomId);
            return res.Data ?? null;
        } catch (e) {
            throw new Error(Constants.CANNOT_GET_DATA('getRoomCompanyDetail'));
        }
    }

    constructor() {
        makeAutoObservable(this);
    }
}
