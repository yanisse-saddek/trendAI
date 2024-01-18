import { executeScript } from './index.js';

import * as schedule from 'node-schedule';

schedule.scheduleJob('30 18 * * *', () => {
    executeScript();
});


