import { checkStoreUpdates } from './api/checkStoreUpdates.js';

const twitchChannelId = '5cc799026e852d26fcf16717';

console.log(await checkStoreUpdates(twitchChannelId));
