import { executeScript } from './index.js';

import * as schedule from 'node-schedule';

schedule.scheduleJob('20 7 * * *', () => {
    executeScript();
});
