import { makeAPIRequest } from './apiRequest.js';

const streamelementsAPIUrl = 'https://api.streamelements.com/kappa/v2/channels';

export async function getChannelDetails(channelId) {
    const channelUrl = `${streamelementsAPIUrl}/${channelId}`;

    try {
        const channelDetails = await makeAPIRequest(channelUrl);
        return channelDetails;
    } catch (error) {
        console.error(`Error getting details of channel ${channelId}:`, error.message);
        return [];
    }
}