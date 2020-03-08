import { Server, } from 'stellar-sdk';
import componentWillLoad from './events/componentWillLoad'; // UPDATE
import render from './events/render'; // UPDATE
import createAccount from './methods/createAccount';
import updateAccount from './methods/updateAccount';
import depositAsset from './methods/depositAsset'; // NEW
import withdrawAsset from './methods/withdrawAsset'; // NEW
import trustAsset from './methods/trustAsset';
import makePayment from './methods/makePayment';
import copyAddress from './methods/copyAddress';
import copySecret from './methods/copySecret';
import signOut from './methods/signOut';
import setPrompt from './methods/setPrompt';
import viewDetails from './methods/viewDetails';
import viewTransactions from './methods/viewTransactions';
import viewBalances from './methods/viewBalances';
export class Wallet {
    constructor() {
        this.prompter = { show: false };
        this.loading = {};
        this.server = new Server('https://horizon-testnet.stellar.org');
        this.homeDomain = 'testanchor.stellar.org';
        // Stellar methods
        this.createAccount = createAccount;
        this.updateAccount = updateAccount;
        this.depositAsset = depositAsset; // NEW
        this.withdrawAsset = withdrawAsset; // NEW
        this.trustAsset = trustAsset;
        this.makePayment = makePayment;
        this.copyAddress = copyAddress;
        this.copySecret = copySecret;
        this.signOut = signOut;
        this.viewDetails = viewDetails;
        this.viewTransactions = viewTransactions;
        this.viewBalances = viewBalances;
        // Misc methods
        this.setPrompt = setPrompt;
    }
    // Component events
    componentWillLoad() { }
    render() { }
    static get is() { return "stellar-wallet"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["wallet.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["wallet.css"]
    }; }
    static get properties() { return {
        "server": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Server",
                "resolved": "Server",
                "references": {
                    "Server": {
                        "location": "import",
                        "path": "stellar-sdk"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "new Server('https://horizon-testnet.stellar.org')"
        },
        "homeDomain": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "String",
                "resolved": "String",
                "references": {
                    "String": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "'testanchor.stellar.org'"
        },
        "toml": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Object",
                "resolved": "Object",
                "references": {
                    "Object": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get states() { return {
        "account": {},
        "prompter": {},
        "loading": {},
        "error": {}
    }; }
}
Wallet.prototype.componentWillLoad = componentWillLoad;
Wallet.prototype.render = render;
