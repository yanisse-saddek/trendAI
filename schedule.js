import { executeScript } from './index.js';

import * as schedule from 'node-schedule';

schedule.scheduleJob('43 0 * * *', () => {
    executeScript();
});
