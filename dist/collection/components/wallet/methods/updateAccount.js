import { omit as loOmit, map as loMap } from 'lodash-es';
import { handleError } from '@services/error';
export default async function updateAccount(runtime) {
    try {
        this.error = null;
        this.loading = Object.assign(Object.assign({}, this.loading), { update: true });
        if (!runtime) {
            await this.server
                .accounts()
                .accountId(this.account.publicKey)
                .call()
                .then((account) => {
                account.balances = loMap(account.balances, (balance) => loOmit(balance, [
                    'limit',
                    'buying_liabilities',
                    'selling_liabilities',
                    'is_authorized',
                    'last_modified_ledger',
                    balance.asset_type !== 'native' ? 'asset_type' : null
                ]));
                this.account = Object.assign(Object.assign({}, this.account), { state: loOmit(account, [
                        'id',
                        '_links',
                        'sequence',
                        'subentry_count',
                        'last_modified_ledger',
                        'flags',
                        'thresholds',
                        'account_id',
                        'signers',
                        'paging_token',
                        'data_attr'
                    ]) });
            })
                .finally(() => this.loading = Object.assign(Object.assign({}, this.loading), { update: false }));
        }
        else {
            await this.server
                .accounts()
                .accountId(this.account.publicKey)
                .call()
                .then((account) => {
                account.balances = loMap(account.balances, (balance) => loOmit(balance, [
                    'limit',
                    'buying_liabilities',
                    'selling_liabilities',
                    'is_authorized',
                    'last_modified_ledger',
                    balance.asset_type !== 'native' ? 'asset_type' : null
                ]));
                this.account = Object.assign(Object.assign({}, this.account), { state: loOmit(account, [
                        'id',
                        '_links',
                        'sequence',
                        'subentry_count',
                        'last_modified_ledger',
                        'flags',
                        'thresholds',
                        'account_id',
                        'signers',
                        'paging_token',
                        'data_attr'
                    ]) });
            })
                .finally(() => this.loading = Object.assign(Object.assign({}, this.loading), { update: false }), alert("Account has been updated!"));
        }
    }
    catch (err) {
        this.error = handleError(err);
    }
}
