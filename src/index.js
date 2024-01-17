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

console.log('Notifier is running!');

cron.schedule(config.updateInterval, async () => {
    try {
        let newItensFound = false;
        console.log('Running store update check...');
        for (const channel of config.watchedChannels) {
            const newItems = await checkStoreUpdates(channel);
            const channelDetails = await getChannelDetails(channel);

            if (newItems.length > 0) {
                newItensFound = true;

                const channelName = channelDetails.displayName;
                const emailMessage = buildEmail(channelDetails, newItems);

                console.log(`New items found in ${channelName}'s channel.`);
                for (const recipient of config.emailRecipients) {
                    console.log(`Notifying ${recipient}.`);
                    await sendEmail(`New items in ${channelName}'s Twitch store!`, emailMessage, recipient);
                }
                console.log('Finishing...');
            }
        }
        if (!newItensFound) {
            console.log('Nothing new was found.');
        }
    } catch (error) {
        console.error('Error during store update check:', error.message);
    }
});