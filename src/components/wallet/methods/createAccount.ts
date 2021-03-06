import axios from 'axios'
import { Keypair } from 'stellar-sdk'

import { set } from '@services/storage'
import { handleError } from '@services/error'
import { stretchPincode } from '@services/argon2'
import { encrypt } from '@services/tweetnacl'

export default async function createAccount() {
  try {
    var account_type = await this.setPrompt({
      message: 'Are you creating a fund or a school?',
      type: 'text'
    })
    // https://www.w3schools.com/html/html_form_input_types.asp

    if (!(account_type == "FUND" || account_type == "SCHOOL")) throw 'Invalid account type'

    const pincode_1 = await this.setPrompt({
      message: 'Enter an account pincode',
      type: 'password'
    })
    const pincode_2 = await this.setPrompt({
      message: 'Enter account pincode again',
      type: 'password'
    })

    if (
      !pincode_1
      || !pincode_2
      || pincode_1 !== pincode_2
    ) throw 'Invalid pincode'

    this.error = null
    this.loading = {...this.loading, fund: true}

    const keypair = Keypair.random()
    const pincode_stretched = await stretchPincode(pincode_1, keypair.publicKey())
    const { cipher, nonce } = encrypt(
      keypair.rawSecretKey(),
      keypair.rawPublicKey(),
      pincode_stretched
    )

    await axios(`https://friendbot.stellar.org?addr=${keypair.publicKey()}`)
    .finally(() => this.loading = {...this.loading, fund: false})

    var account_type_title;
    var account_type_message;
    var account_table_title;
    var pie_chart_url;
    if (account_type == "FUND") {
      account_type_title = "Fund Dashboard";
      account_type_message = "Through this dashboard, you may manage your blockchain fund and analyze how schools are using your assets.";
      account_table_title = "Schools";
      pie_chart_url = "https://i.ibb.co/m8QLLWj/pie-Chart-Example-Fund.png";
    } else {
      account_type_title = "School Dashboard";
      account_type_message = "Through this dashboard, you may manage your school funds and appropriate them accordingly.";
      account_table_title = "Payrolls";
      pie_chart_url = "https://i.ibb.co/LJd5Tqh/pie-Chart-Example.png";
    }

    this.account = {
      accountType: account_type,
      accountTitle: account_type_title,
      accountMessage: account_type_message,
      tableTitle: account_table_title,
      pieChartURL: pie_chart_url,
      publicKey: keypair.publicKey(),
      cipher,
      nonce
    }

    set('WALLET[keystore]', btoa(JSON.stringify(this.account)))

    this.updateAccount(false)
  }

  catch(err) {
    this.error = handleError(err)
  }
}
