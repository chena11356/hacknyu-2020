import nacl from 'tweetnacl';
import { Keypair } from 'stellar-sdk';
import { encode as encodeBase64, decode as decodeBase64 } from '@stablelib/base64';
export function encrypt(message, nonce, key) {
    const encrypted = nacl.secretbox(message, nonce.slice(0, 24), key);
    if (!encrypted)
        throw 'Pincode encryption failed';
    return {
        cipher: encodeBase64(encrypted),
        nonce: encodeBase64(nonce.slice(0, 24))
    };
}
export function decrypt(cipher, nonce, keyArr) {
    const encryptedArr = decodeBase64(cipher);
    const nonceArr = decodeBase64(nonce);
    const decrypted = nacl.secretbox.open(encryptedArr, nonceArr, keyArr);
    if (!decrypted)
        throw 'Pincode decryption failed';
    return Keypair.fromRawEd25519Seed(decrypted);
}
