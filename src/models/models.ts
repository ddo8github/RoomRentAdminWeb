interface UserLogin {
    username: string;
    password: string;
}

interface TokenModel {
    accessToken: string;
    idToken: string;
    expiresIn: number;
    refreshToken: string;
    tokenType: string;
    username: string;
    role: string;
    s3UserAccessKey: string;
    s3UserScretkey: string;
    aWSRegion: string;
    bucketname: string;
    acl: string;
}

class DataResultModel<T> {
    Data: T | undefined;
    InnerEx: string = '';
    Name: string = '';
    Message: string = '';
    Success: boolean = true;
    Errors: string[] = [];
    ErrorNumber: number | undefined;
}

export type {UserLogin, TokenModel, DataResultModel};
