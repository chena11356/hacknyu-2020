import { Account, TransactionBuilder, BASE_FEE, Networks, Operation, Asset } from 'stellar-sdk';
import { has as loHas } from 'lodash-es';
import { handleError } from '@services/error';
import { stretchPincode } from '@services/argon2';
import { decrypt } from '@services/tweetnacl';
export default async function makePayment(destination, asset, issuer) {
    try {
        let instructions;
        if (destination
            && asset) {
            instructions = await this.setPrompt({ message: `How much ${asset} to pay?` });
            instructions = [instructions, asset, destination, issuer];
        }
        else {
            if (this.account.accountType == "FUND") {
                instructions = await this.setPrompt({ message: '{Amount} {Asset} {Destination of assets (school)}' });
            }
            else {
                instructions = await this.setPrompt({ message: '{Amount} {Asset} {Destination of assets (teacher salaries, facilities, etc.)}' });
            }
            instructions = instructions.split(' ');
            if (this.account.accountType == "FUND") {
                if (!/xlm/gi.test(instructions[1]))
                    instructions[3] = await this.setPrompt({
                        message: `Which fund issues the ${instructions[1]} asset?`,
                        placeholder: 'Enter ME to refer to the current fund'
                    });
            }
            else {
                if (!/xlm/gi.test(instructions[1]))
                    instructions[3] = await this.setPrompt({
                        message: `Which school issues the ${instructions[1]} asset?`,
                        placeholder: 'Enter ME to refer to the current school'
                    });
            }
        }
        const pincode = await this.setPrompt({
            message: 'Enter your account pincode',
            type: 'password'
        });
        const pincode_stretched = await stretchPincode(pincode, this.account.publicKey);
        const keypair = decrypt(this.account.cipher, this.account.nonce, pincode_stretched);
        if (/me/gi.test(instructions[3]))
            instructions[3] = keypair.publicKey();
        this.error = null;
        this.loading = Object.assign(Object.assign({}, this.loading), { pay: true });
        await this.server
            .accounts()
            .accountId(keypair.publicKey())
            .call()
            .then(({ sequence }) => {
            const account = new Account(keypair.publicKey(), sequence);
            const transaction = new TransactionBuilder(account, {
                fee: BASE_FEE,
                networkPassphrase: Networks.TESTNET
            })
                .addOperation(Operation.payment({
                destination: instructions[2],
                asset: instructions[3] ? new Asset(instructions[1], instructions[3]) : Asset.native(),
                amount: instructions[0]
            }))
                .setTimeout(0)
                .build();
            transaction.sign(keypair);
            return this.server.submitTransaction(transaction)
                .catch((err) => {
                if ( // Paying an account which doesn't exist, create it instead
                loHas(err, 'response.data.extras.result_codes.operations')
                    && err.response.data.status === 400
                    && err.response.data.extras.result_codes.operations.indexOf('op_no_destination') !== -1
                    && !instructions[3]) {
                    const transaction = new TransactionBuilder(account, {
                        fee: BASE_FEE,
                        networkPassphrase: Networks.TESTNET
                    })
                        .addOperation(Operation.createAccount({
                        destination: instructions[2],
                        startingBalance: instructions[0]
                    }))
                        .setTimeout(0)
                        .build();
                    transaction.sign(keypair);
                    return this.server.submitTransaction(transaction);
                }
                else
                    throw err;
            });
        })
            .then((res) => console.log(res))
            .finally(() => {
            this.loading = Object.assign(Object.assign({}, this.loading), { pay: false });
            this.updateAccount();
        });
    }
    catch (err) {
        this.error = handleError(err);
    }
}
