import {StepProps} from 'semantic-ui-react/dist/commonjs/elements/Step/Step';
import {SemanticICONS} from 'semantic-ui-react';
import {Constants} from '../config/constant';

interface UserLogin {
    username: string;
    password: string;
}

interface TokenModel {
    AccessToken: string;
    IdToken: string;
    ExpiresIn: number;
    RefreshToken: string;
    TokenType: string;
    Username: string;
    Role: string;
    S3UserAccessKey: string;
    S3UserScretkey: string;
    AWSRegion: string;
    Bucketname: string;
    Acl: string;
}

interface RefreshTokenModel {
    RefreshToken: string;
}

interface FileModel {
    Size: number;
    Percentage: number;
    S3FileName: string;
    File: File;
    Ext: string;
    PreviewImage: string | undefined;
    Bucket: string;
    Location: string;
    Error: string | undefined;
    Desc: string;
    Mainphoto: number;
}

interface StepperModel extends StepProps {

}

interface SignoutModel {
    Username: string | undefined;
}

interface RoomInfo {
    [key: string]: any;

    Id: number | null;
    Utilities: string[];
    Roomnumber: string;
    Desc: string;
    Display: number;
    Wifi: number;
    Personalwc: number;
    Parking: number;
    Freetime: number;
    Kitchen: number;
    Aircon: number;
    Fridge: number;
    Washingmachine: number;
    Type: string;
    Tv: number;
    Garden: number;
    Balcony: number;
    Nearmarket: number;
    Price: string;
    Square: string;
    Street: string;
    District: string;
    DistrictCode: string;
    City: string;
    CityCode: string;
    Ward: string;
    WardCode: string;
    roomComImgViewModels: RoomComImgViewModel[];
}

interface RoomComViewModel {
    Roomnumber: string;
    Street: string;
    Ward: string;
    District: string;
    City: string;
    Desc: string;
    Display: number;
    Wifi: number;
    Personalwc: number;
    Parking: number;
    Freetime: number;
    Kitchen: number;
    Aircon: number;
    Fridge: number;
    Washingmachine: number;
    Type: string;
    Tv: number;
    Garden: number;
    Balcony: number;
    Nearmarket: number;
    Price: number;
    Square: number;
    roomComImgViewModels: RoomComImgViewModel[];
}

interface RoomComImgViewModel {
    Roomdocurl: string;
    Doctype: string;
    Desc: string;
    Mainphoto: number;
}

interface RoomCompanySumary {
    Id: number;
    Roomnumber: string;
    Street: string;
    Ward: string;
    District: string;
    City: string;
    Desc: string;
    Price: number;
    Square: number;
    roomComImgViewModels: RoomComImgViewModel[];
}

interface PaginationHeader {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

interface RoomUtility {
    text: string;
    value: string;
    icon: SemanticICONS;
    nameField: string;
}

export class PagedList<T> {
    Pagination: PaginationHeader;
    Items: T;

    constructor(items: T, pagination: PaginationHeader) {
        this.Pagination = pagination;
        this.Items = items;
    }
}

export class PagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = Constants.PAGE_SIZE) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}

interface DataResultModel<T> {
    Data: T | undefined;
    InnerEx: string;
    Name: string;
    Message: string;
    Success: boolean;
    Errors: string[];
    ErrorNumber: number | undefined;
}

interface Province {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code: number;
}

interface Ward {
    name: string;
    code: number;
    codename: string;
    division_type: string;
    short_codename: string;
}

interface District {
    name: string;
    code: number;
    codename: string;
    division_type: string;
    short_codename: string;
}

interface Option {
    text: string;
    value: string;
}

export type {
    UserLogin, SignoutModel, TokenModel, DataResultModel, RefreshTokenModel,
    FileModel, StepperModel, RoomInfo, Province, Ward, District,
    Option, RoomUtility, RoomComViewModel, RoomComImgViewModel, RoomCompanySumary, PaginationHeader
};
