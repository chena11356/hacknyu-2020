import { get as loGet } from 'lodash-es';
export function handleError(err) {
    return loGet(err, 'response.data', loGet(err, 'message', err));
}
