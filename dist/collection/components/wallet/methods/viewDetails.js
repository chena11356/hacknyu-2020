import { remove } from '@services/storage';
import { handleError } from '@services/error';
export default async function viewDetails() {
    try {
        const confirmNuke = await this.setPrompt({
            message: 'Are you sure? This will nuke your account',
            alert: true
        });
        if (!confirm
            || !/nuke/gi.test(confirmNuke))
            throw 'Cannot sign out';
        this.error = null;
        await remove('WALLET[keystore]');
        location.reload();
    }
    catch (err) {
        this.error = handleError(err);
    }
}
