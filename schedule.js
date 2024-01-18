import { executeScript } from './index.js';

import * as schedule from 'node-schedule';

schedule.scheduleJob('50 12 * * *', () => {
    executeScript();
});
