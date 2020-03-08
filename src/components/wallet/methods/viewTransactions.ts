import {
  Transaction,
  Networks,
  Server
} from 'stellar-sdk'
import {
  each as loEach
} from 'lodash-es'

import { handleError } from '@services/error'

// Truncate decimal strings
function tdr(str) {
  for (var i = 0; i < str.length; i++) {
    if (str[i] == '.') {
      return str.slice(0, i+3);
    }
  }
}

export default async function viewTransactions(

) {
  try {

    var cur_account = this.account.publicKey;
    // const account = 'GBZWOEGPINOUOYYNWP5RX7RSKN2ICX32IP5CLMLKGAVG4IDP62Q56KRG'
    const server = new Server('https://horizon-testnet.stellar.org')
    var transaction_type = "";
    var transaction_source = "";
    var transaction_issuer = "";
    var transaction_destination = "";
    var transaction_starting_balance = "";
    var transaction_asset_code = "";
    var transaction_amount = "";
    var text = "";

    server.transactions()
    .forAccount(cur_account)
    .call()
    .then(({records}) => {
        loEach(records, (record) => {
            const transaction = new Transaction(record.envelope_xdr, Networks.TESTNET)
            for (let i = 0; i < transaction.operations.length; i++) {

                transaction_type = transaction.operations[i]['type'];
                if (transaction_type == "createAccount") {
                  transaction_source = transaction.operations[i]['source'];
                  transaction_destination = transaction.operations[i]['destination'];
                  transaction_starting_balance = transaction.operations[i]['startingBalance'];
                  text = "Account created with " + tdr(transaction_starting_balance) + " at destination " + transaction_destination.slice(0,4) + " from source " + transaction_source.slice(0,4) + ".\n" + text;
                } else if (transaction_type == "changeTrust") {
                  transaction_asset_code = transaction.operations[i]['line']['code'];
                  transaction_issuer = transaction.operations[i]['line']['issuer'];
                  text = "Account is trusted by " + transaction_issuer.slice(0,4) + " to be paid " + transaction_asset_code + " currency.\n" + text;
                } else if (transaction_type == "payment") {
                  transaction_destination = transaction.operations[i]['destination'];
                  transaction_asset_code = transaction.operations[i]['asset']['code'];
                  transaction_issuer = transaction.operations[i]['asset']['issuer'];
                  transaction_amount = transaction.operations[i]['amount'];
                  if (cur_account == transaction_destination) {
                    // Current account was paid
                    text = "Account has been paid " + tdr(transaction_amount) + " " + transaction_asset_code + " by " + transaction_issuer.slice(0,4) + ".\n" + text;
                  } else {
                    // Current account was paying
                    text = "Account paid " + tdr(transaction_amount) + " " + transaction_asset_code + " to " + transaction_destination.slice(0,4) + ".\n" + text;
                  }
                } else {
                  console.error("Unknown transaction type");
                }
            }
        })
        alert(text);
    })
    .catch((err) => console.error(err))
  }
  catch (err) {
    this.error = handleError(err)
  }
}
