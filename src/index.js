import { checkStoreUpdates } from './api/checkStoreUpdates.js';
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

            console.log(newItems);

            /*if (updatedItems.length > 0) {
                for (const recipient of config.emailRecipients) {
                    console.log("notifying: ", recipient);
                    await sendEmail(`New items in Twitch store for channel ${channel}!`, `New items: ${JSON.stringify(updatedItems)}`, recipient);
                }
            }*/
        }
    } catch (error) {
        console.error('Error during store update check:', error.message);
    }
});