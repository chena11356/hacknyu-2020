// Truncate decimal strings
function tdr(str) {
    for (var i = 0; i < str.length; i++) {
        if (str[i] == '.') {
            return str.slice(0, i + 3);
        }
    }
}
export default function parseBalances() {
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
            text = "Current balance of " + cur_asset_code + " from " + cur_asset_issuer.slice(0, 4) + " is " + tdr(cur_balance) + ".\n\n" + text;
        }
        else {
            // Balance from initial beginning, native
            cur_balance = this.account.state.balances[i]['balance'];
            text = "Current balance of native starting currency is " + tdr(cur_balance) + ".\n\n" + text;
        }
    }
    return text;
}
