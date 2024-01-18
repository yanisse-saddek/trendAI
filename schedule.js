import { executeScript } from './index.js';

import * as schedule from 'node-schedule';

schedule.scheduleJob('19 18 * * *', () => {
    executeScript();
});


