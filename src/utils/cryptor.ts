import {AES, enc, mode, pad} from 'crypto-js';
// npm install crypto-js @types/crypto-js

const deResponseData = <T>(encryptedText: string): T => {
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
    const res = JSON.parse(deStr);
    return res;
};

const enRequestData = <T>(plainText: string): string => {
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
};

const cryptor = {
    deResponseData,
    enRequestData
};

export default cryptor;
