import { Account, TransactionBuilder, BASE_FEE, Networks, Operation, Asset } from 'stellar-sdk';
import { handleError } from '@services/error';
import { stretchPincode } from '@services/argon2';
import { decrypt } from '@services/tweetnacl';
export default async function trustAsset(asset, issuer, pincode_stretched) {
    try {
        let instructions;
        if (asset
            && issuer)
            instructions = [asset, issuer];
        else {
            if (this.account.accountType == "FUND") {
                instructions = await this.setPrompt({ message: '{Asset} {Key of source of assets (federal grants, taxes, etc.)}' });
            }
            else {
                instructions = await this.setPrompt({ message: '{Asset} {Key of fund}' });
            }
            instructions = instructions.split(' ');
        }
        if (!pincode_stretched) {
            const pincode = await this.setPrompt({
                message: 'Enter your account pincode',
                type: 'password'
            });
            pincode_stretched = await stretchPincode(pincode, this.account.publicKey);
        }
        const keypair = decrypt(this.account.cipher, this.account.nonce, pincode_stretched);
        this.error = null;
        this.loading = Object.assign(Object.assign({}, this.loading), { trust: true });
        await this.server.accounts()
            .accountId(keypair.publicKey())
            .call()
            .then(({ sequence }) => {
            const account = new Account(keypair.publicKey(), sequence);
            const transaction = new TransactionBuilder(account, {
                fee: BASE_FEE,
                networkPassphrase: Networks.TESTNET
            })
                .addOperation(Operation.changeTrust({
                asset: new Asset(instructions[0], instructions[1])
            }))
                .setTimeout(0)
                .build();
            transaction.sign(keypair);
            return this.server.submitTransaction(transaction);
        })
            .then((res) => console.log(res))
            .finally(() => {
            this.loading = Object.assign(Object.assign({}, this.loading), { trust: false });
            this.updateAccount();
        });
    }
    catch (err) {
        this.error = handleError(err);
        throw err;
    }
}
