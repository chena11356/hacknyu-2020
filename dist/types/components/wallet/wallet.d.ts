import { Server, ServerApi } from 'stellar-sdk';
import createAccount from './methods/createAccount';
import updateAccount from './methods/updateAccount';
import depositAsset from './methods/depositAsset';
import withdrawAsset from './methods/withdrawAsset';
import trustAsset from './methods/trustAsset';
import makePayment from './methods/makePayment';
import copyAddress from './methods/copyAddress';
import copySecret from './methods/copySecret';
import signOut from './methods/signOut';
import setPrompt from './methods/setPrompt';
import viewDetails from './methods/viewDetails';
import viewTransactions from './methods/viewTransactions';
import viewBalances from './methods/viewBalances';
import { Prompter } from '@prompt/prompt';
interface StellarAccount {
    publicKey: string;
    cipher: string;
    nonce: string;
    state?: ServerApi.AccountRecord;
}
interface Loading {
    fund?: boolean;
    pay?: boolean;
    trust?: boolean;
    update?: boolean;
    deposit?: boolean;
    withdraw?: boolean;
}
export declare class Wallet {
    account: StellarAccount;
    prompter: Prompter;
    loading: Loading;
    error: any;
    server: Server;
    homeDomain: String;
    toml: Object;
    componentWillLoad(): void;
    render(): void;
    createAccount: typeof createAccount;
    updateAccount: typeof updateAccount;
    depositAsset: typeof depositAsset;
    withdrawAsset: typeof withdrawAsset;
    trustAsset: typeof trustAsset;
    makePayment: typeof makePayment;
    copyAddress: typeof copyAddress;
    copySecret: typeof copySecret;
    signOut: typeof signOut;
    viewDetails: typeof viewDetails;
    viewTransactions: typeof viewTransactions;
    viewBalances: typeof viewBalances;
    setPrompt: typeof setPrompt;
}
export {};
