import { checkStoreUpdates } from './api/checkStoreUpdates.js';
import { sendEmail } from './email/notify.js';
import cron from 'node-cron';

const twitchChannelId = '5cc799026e852d26fcf16717';

cron.schedule('*/15 * * * * *', async () => {
    try {
        console.log('Running store update check...');
        let updatedItems = await checkStoreUpdates(twitchChannelId);

        await sendEmail('New items in Twitch store!', `New items: ${JSON.stringify(updatedItems)}`, 'example@gmail.com');
    } catch (error) {
        console.error('Error during store update check:', error.message);
    }
});