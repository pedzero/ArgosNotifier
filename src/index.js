import { checkStoreUpdates } from './api/checkStoreUpdates.js';
import cron from 'node-cron';

const twitchChannelId = '5cc799026e852d26fcf16717';

cron.schedule('*/15 * * * * *', async () => {
    try {
        console.log('Running store update check...');
        console.log(await checkStoreUpdates(twitchChannelId));
    } catch (error) {
        console.error('Error during store update check:', error.message);
    }
});