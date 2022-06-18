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

export interface SignoutModel {
    Username: string | undefined;
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
