import { makeAPIRequest } from './apiRequest.js';

const streamelementsAPIUrl = 'https://api.streamelements.com/kappa/v2';

export async function checkStoreUpdates(channelId, onlyEnabledItems = true) {
    const storeUrl = `${streamelementsAPIUrl}/store/${channelId}/items`;

    try {
        const storeData = await makeAPIRequest(storeUrl);

        const filteredItems = onlyEnabledItems ? storeData.filter(item => item.enabled) : storeData;

        return filteredItems;
    } catch (error) {
        console.log(error)
    }
}