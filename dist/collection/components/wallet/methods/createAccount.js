import axios from 'axios';
import { Keypair } from 'stellar-sdk';
import { set } from '@services/storage';
import { handleError } from '@services/error';
import { stretchPincode } from '@services/argon2';
import { encrypt } from '@services/tweetnacl';
export default async function createAccount() {
    try {
        var account_type = await this.setPrompt({
            message: 'Are you creating a fund or a school?',
            type: 'text'
        });
        // https://www.w3schools.com/html/html_form_input_types.asp
        if (!(account_type == "FUND" || account_type == "SCHOOL"))
            throw 'Invalid account type';
        const pincode_1 = await this.setPrompt({
            message: 'Enter an account pincode',
            type: 'password'
        });
        const pincode_2 = await this.setPrompt({
            message: 'Enter account pincode again',
            type: 'password'
        });
        if (!pincode_1
            || !pincode_2
            || pincode_1 !== pincode_2)
            throw 'Invalid pincode';
        this.error = null;
        this.loading = Object.assign(Object.assign({}, this.loading), { fund: true });
        const keypair = Keypair.random();
        const pincode_stretched = await stretchPincode(pincode_1, keypair.publicKey());
        const { cipher, nonce } = encrypt(keypair.rawSecretKey(), keypair.rawPublicKey(), pincode_stretched);
        await axios(`https://friendbot.stellar.org?addr=${keypair.publicKey()}`)
            .finally(() => this.loading = Object.assign(Object.assign({}, this.loading), { fund: false }));
        var account_type_title;
        var account_type_message;
        if (account_type == "FUND") {
            account_type_title = "Fund Dashboard";
            account_type_message = "Through this dashboard, you may manage your blockchain fund and analyze how schools are using your assets.";
        }
        else {
            account_type_title = "School Dashboard";
            account_type_message = "Through this dashboard, you may manage your school funds and appropriate them accordingly.";
        }
        this.account = {
            accountType: account_type,
            accountTitle: account_type_title,
            accountMessage: account_type_message,
            publicKey: keypair.publicKey(),
            cipher,
            nonce
        };
        set('WALLET[keystore]', btoa(JSON.stringify(this.account)));
        this.updateAccount();
    }
    catch (err) {
        this.error = handleError(err);
    }
}
