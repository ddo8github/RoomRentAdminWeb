import {StepProps} from 'semantic-ui-react/dist/commonjs/elements/Step/Step';
import {SemanticICONS} from 'semantic-ui-react';

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
    Key: string;
    Location: string;
    Error: string | undefined;
    Desc: string;
}

interface StepperModel extends StepProps {

}

interface S3FileModel {
    Bucket: string;
    Key: string;
    Location: string;
}

interface SignoutModel {
    Username: string | undefined;
}

interface RoomInfo {
    roomType: string;
    price: number;
    square: number;
    utilities: string[];
    province: string;
    district: string;
    ward: string;
    address: string;
}

interface RoomUtility{
    text: string;
    value: string;
    icon: SemanticICONS;
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
    FileModel, S3FileModel, StepperModel, RoomInfo, Province, Ward, District,
    Option, RoomUtility
};
