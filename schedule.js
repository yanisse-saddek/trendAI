import { executeScript } from './index.js';

import * as schedule from 'node-schedule';

schedule.scheduleJob('5 13 * * *', () => {
    executeScript();
});
