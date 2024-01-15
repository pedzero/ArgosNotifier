import { checkStoreUpdates } from './api/checkStoreUpdates.js';
import { getChannelDetails } from './api/getChannelDetails.js';
import { buildEmail } from './email/buildEmail.js';
import { sendEmail } from './email/notify.js';
import cron from 'node-cron';
import fs from 'fs/promises';

let config;

try {
    const configFile = await fs.readFile('./config.json', 'utf-8');
    config = JSON.parse(configFile);
} catch (error) {
    console.error('Error reading config file:', error.message);
    process.exit(1);
}

cron.schedule(config.updateIntervalMinutes, async () => {
    try {
        console.log('Running store update check...');
        for (const channel of config.watchedChannels) {
            const newItems = await checkStoreUpdates(channel);
            const channelDetails = await getChannelDetails(channel);

            if (newItems.length > 0) {
                const emailMessage = buildEmail(channelDetails, newItems);
                for (const recipient of config.emailRecipients) {
                    console.log("notifying: ", recipient);
                    await sendEmail(`New items in the ${channelDetails.displayName} Twitch store!`, emailMessage, recipient);
                }
            }
        }
    } catch (error) {
        console.error('Error during store update check:', error.message);
    }
});