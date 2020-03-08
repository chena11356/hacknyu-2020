import { handleError } from '@services/error';
// Truncate decimal strings
function tdr(str) {
    for (var i = 0; i < str.length; i++) {
        if (str[i] == '.') {
            return str.slice(0, i + 3);
        }
    }
}
export default async function viewBalances(destination, asset, issuer) {
    try {
        var balances_json = JSON.stringify(this.account.state, null, 2);
        var cur_balance = "";
        var cur_asset_code = "";
        var cur_asset_issuer = "";
        var text = "";
        console.log(this.account.state.balances);
        for (var i = 0; i < this.account.state.balances.length; i++) {
            console.log(this.account.state.balances[i]);
            console.log(this.account.state.balances[i]['asset_type'] == null);
            if (this.account.state.balances[i]['asset_type'] == null) {
                // Balance from certain issuer
                cur_balance = this.account.state.balances[i]['balance'];
                cur_asset_code = this.account.state.balances[i]['asset_code'];
                cur_asset_issuer = this.account.state.balances[i]['asset_issuer'];
                text = "Current balance of " + cur_asset_code + " from " + cur_asset_issuer.slice(0, 4) + " is " + tdr(cur_balance) + ".\n" + text;
            }
            else {
                // Balance from initial beginning, native
                cur_balance = this.account.state.balances[i]['balance'];
                text = "Current balance of native starting currency is " + tdr(cur_balance) + ".\n" + text;
            }
        }
        alert(text);
        // console.log(document.getElementById('account-state-text'));
        // var element: HTMLElement = document.getElementById('account-state-text') as HTMLElement
        // element.innerHTML = 'Hello World'
        // console.log(element);
        // console.log("WTF");
    }
    catch (err) {
        this.error = handleError(err);
    }
}
