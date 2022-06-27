import {StepProps} from 'semantic-ui-react/dist/commonjs/elements/Step/Step';

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
    previewImage: string | undefined;
    Bucket: string;
    Key: string;
    Location: string;
    error: string | undefined;
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
    address: string;
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

export type {
    UserLogin, SignoutModel, TokenModel, DataResultModel, RefreshTokenModel,
    FileModel, S3FileModel, StepperModel, RoomInfo,
};
