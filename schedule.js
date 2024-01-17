import { executeScript } from './index.js';

import * as schedule from 'node-schedule';

schedule.scheduleJob('0 20 * * *', () => {
    executeScript();
});
