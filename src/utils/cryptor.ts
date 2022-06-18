import {AES, enc, mode, pad} from 'crypto-js';
// npm install crypto-js @types/crypto-js

const deResponseData = <T>(encryptedText: string): T => {
    try {
        const key = enc.Utf8.parse(process.env.REACT_APP_RESPONSE_DE_KEY!);
        const iv = enc.Utf8.parse(process.env.REACT_APP_RESPONSE_DE_KEY!);
        const decrypted = AES.decrypt(encryptedText, key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: mode.CBC,
                padding: pad.Pkcs7
            });
        const deStr = decrypted.toString(enc.Utf8);
        return JSON.parse(deStr);
    } catch (e) {
        throw e;
    }
};

const enRequestData = <T>(plainText: string): string => {
    try {
        const key = enc.Utf8.parse(process.env.REACT_APP_REQUEST_EN_KEY!);
        const iv = enc.Utf8.parse(process.env.REACT_APP_REQUEST_EN_KEY!);
        const encrypted = AES.encrypt(enc.Utf8.parse(plainText), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: mode.CBC,
                padding: pad.Pkcs7
            });
        return encrypted.toString();
    } catch (e) {
        throw e;
    }
};

const localStorage = {
    dData: <T>(eStr: string): T | null => {
        try {
            if (eStr === null) {
                return null;
            }
            const deStr = AES.decrypt(eStr, process.env.REACT_APP_KFE!).toString(enc.Utf8);
            return JSON.parse(deStr);
        } catch (e) {
            throw e;
        }
    },
    eData: <T>(obj: T): string => {
        try {
            const oStr = JSON.stringify(obj);
            return AES.encrypt(oStr, process.env.REACT_APP_KFE!).toString();
        } catch (err) {
            throw err;
        }
    }
};

const setDataToLocalStorage = <T>(key: string, data: T): boolean => {
    try {
        const eStr = localStorage.eData<T>(data);
        window.localStorage.setItem(key, eStr);
        return true;
    } catch (e) {
        throw e;
    }
};


const getDataFromLocalStorage = <T>(key: string): T | null => {
    try {
        const eStr = window.localStorage.getItem(key);
        return localStorage.dData<T>(eStr!);
    } catch (e) {
        throw e;
    }
};

const cryptor = {
    deResponseData,
    enRequestData,
    setDataToLocalStorage,
    getDataFromLocalStorage
};

export default cryptor;
