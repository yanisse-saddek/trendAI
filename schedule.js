import { executeScript } from './index.js';

import * as schedule from 'node-schedule';

schedule.scheduleJob('25 18 * * *', () => {
    executeScript();
});


