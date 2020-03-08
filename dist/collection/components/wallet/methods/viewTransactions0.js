import { Transaction, Networks, Server } from 'stellar-sdk';
import { each as loEach } from 'lodash-es';
import { handleError } from '@services/error';
export default async function makePayment(destination, asset, issuer) {
    try {
        var cur_account = this.account.publicKey;
        // const account = 'GBZWOEGPINOUOYYNWP5RX7RSKN2ICX32IP5CLMLKGAVG4IDP62Q56KRG'
        const server = new Server('https://horizon-testnet.stellar.org');
        var transaction_type = "";
        var transaction_source = "";
        var transaction_issuer = "";
        var transaction_destination = "";
        var transaction_starting_balance = "";
        var transaction_asset_code = "";
        var transaction_amount = "";
        server.transactions()
            .forAccount(cur_account)
            .call()
            .then(({ records }) => {
            loEach(records, (record) => {
                const transaction = new Transaction(record.envelope_xdr, Networks.TESTNET);
                for (let i = 0; i < transaction.operations.length; i++) {
                    transaction_type = transaction.operations[i]['type'];
                    if (transaction_type == "createAccount") {
                        transaction_source = transaction.operations[i]['source'];
                        transaction_destination = transaction.operations[i]['destination'];
                        transaction_starting_balance = transaction.operations[i]['startingBalance'];
                        console.log("Account created with " + transaction_starting_balance + " at destination " + transaction_destination.slice(0, 4) + " from source " + transaction_source.slice(0, 4) + ".");
                    }
                    else if (transaction_type == "changeTrust") {
                        transaction_asset_code = transaction.operations[i]['line']['code'];
                        transaction_issuer = transaction.operations[i]['line']['issuer'];
                        console.log("Account is trusted by " + transaction_issuer.slice(0, 4) + " to pay " + transaction_asset_code + " currency.");
                    }
                    else if (transaction_type == "payment") {
                        transaction_destination = transaction.operations[i]['destination'];
                        transaction_asset_code = transaction.operations[i]['asset']['code'];
                        transaction_issuer = transaction.operations[i]['asset']['issuer'];
                        transaction_amount = transaction.operations[i]['amount'];
                        if (cur_account == transaction_destination) {
                            // Current account was paid
                            console.log("Account has been paid " + transaction_amount + " " + transaction_asset_code + " by " + transaction_issuer.slice(0, 4) + ".");
                        }
                        else {
                            // Current account was paying
                            console.log("Account paid " + transaction_amount + " " + transaction_asset_code + " to " + transaction_destination.slice(0, 4) + ".");
                        }
                    }
                    else {
                        console.error("Unknown transaction type");
                    }
                }
            });
        })
            .catch((err) => console.error(err));
    }
    catch (err) {
        this.error = handleError(err);
    }
}
