import { executeScript } from './index.js';

import * as schedule from 'node-schedule';

schedule.scheduleJob('23 0 * * *', () => {
    executeScript();
});
