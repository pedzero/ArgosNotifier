import { makeAPIRequest } from './apiRequest.js';
import fs from 'fs/promises';

const streamelementsAPIUrl = 'https://api.streamelements.com/kappa/v2';

let channelHistories = {};

export async function checkStoreUpdates(channelId, onlyEnabledItems = true) {
    const storeUrl = `${streamelementsAPIUrl}/store/${channelId}/items`;

    readHistoryFromFile(channelId);

    try {
        const storeData = await makeAPIRequest(storeUrl);
        const filteredItems = onlyEnabledItems ? storeData.filter(item => item.enabled && item.quantity.current > 0) : storeData;
        const newItems = getNewItems(filteredItems, channelHistories[channelId]);

        channelHistories[channelId] = filteredItems;

        await saveHistoryToFile(channelId);

        return newItems;
    } catch (error) {
        console.error(`Error checking store updates for channel ${channelId}:`, error.message);
        return [];
    }
}

async function readHistoryFromFile(channelId) {
    try {
        const historyFile = await fs.readFile(`./src/storeHistory/history_${channelId}.json`, 'utf-8');
        channelHistories[channelId] = JSON.parse(historyFile);
    } catch (error) {
        console.error(`Error reading history file for channel ${channelId}:`, error.message);
        channelHistories[channelId] = [];
    }
}

async function saveHistoryToFile(channelId) {
    try {
        await fs.writeFile(`./src/storeHistory/history_${channelId}.json`, JSON.stringify(channelHistories[channelId], null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error saving history to file for channel ${channelId}:`, error.message);
    }
}

function getNewItems(currentItems, previousHistory) {
    return currentItems.filter((currentItem) => {
        return (
            !previousHistory.find(
                (previousItem) =>
                    previousItem._id === currentItem._id &&
                    (
                        (previousItem.quantity.current === currentItem.quantity.current && previousItem.updatedAt === currentItem.updatedAt) ||
                        (previousItem.quantity.current > currentItem.quantity.current)
                    )
            )
        );
    });
}
