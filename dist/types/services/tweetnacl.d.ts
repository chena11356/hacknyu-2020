import { Keypair } from 'stellar-sdk';
export declare function encrypt(message: Uint8Array, nonce: Uint8Array, key: Uint8Array): {
    cipher: string;
    nonce: string;
};
export declare function decrypt(cipher: string, nonce: string, keyArr: Uint8Array): Keypair;
