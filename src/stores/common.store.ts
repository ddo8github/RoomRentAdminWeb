import {makeAutoObservable, runInAction} from 'mobx';
import {appHistory} from '../index';
import {FileModel} from '../models/models';
import {v4 as uuid} from 'uuid';
import {S3} from 'aws-sdk';
import {store} from './stores';

export class CommonStore {
    public appLoaded: boolean = false;
    public appLoadedContent: string = 'App Loading...';
    public uploadInProgress: boolean = false;
    public fileUploadCount: number = 0;
    public filesPhotoRooms: FileModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    sleep = (delay: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    };

    setAppLoaded = (value: boolean, content: string) => {
        this.appLoaded = value;
        this.appLoadedContent = content;
    };

    setFilesPhotoRooms = (files: FileModel[]) => {
        runInAction(() => {
            this.filesPhotoRooms = files;
        });
    }

    goToPage = (url: string) => {
        appHistory.push(url);
    };

    uploadFile = async (file: FileModel, totalFile: number) => {
        if (store.userStore.user) {
            file.S3FileName = uuid() + '.' + file.Ext.toLocaleLowerCase();
            const bucket = new S3(
                {
                    accessKeyId: store.userStore.user.S3UserAccessKey,
                    secretAccessKey: store.userStore.user.S3UserScretkey,
                    region: store.userStore.user.AWSRegion,
                    s3ForcePathStyle: true,
                }
            );
            const params = {
                Bucket: store.userStore.user.Bucketname,
                Key: file.S3FileName,
                Body: file.File,
                ACL: store.userStore.user.Acl
            };
            bucket.upload(params).on('httpUploadProgress', function (progress) {
                file.Percentage = Math.floor(((progress.loaded * 100) / progress.total));
            }).send(function (err: any, data: any) {
                if (err != null) {
                    file.Error = 'Lỗi upload file: ' + err.message;
                } else {
                    // const s3File: S3FileModel = data;
                    file = {...data, ...file};
                    runInAction(() => {
                        store.commonStore.filesPhotoRooms.push(file);
                    });
                }
                store.commonStore.checkFileUploadCount(totalFile);
            });
        }
    }

    public setUploadPhotoStatus = (state: boolean) => {
        this.uploadInProgress = state;
    }

    public checkFileUploadCount = (totalFiles: number) => {
        this.fileUploadCount++;
        if (this.fileUploadCount === totalFiles) {
            this.setUploadPhotoStatus(false);
            this.fileUploadCount = 0;
        } else {
            this.setUploadPhotoStatus(true);
        }
    }
}
