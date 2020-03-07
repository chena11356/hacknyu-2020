import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
export async function set(key, value) {
    await Storage.set({
        key,
        value
    });
}
export async function get(key) {
    const item = await Storage.get({ key });
    return item.value;
}
export async function remove(key) {
    await Storage.remove({ key });
}
