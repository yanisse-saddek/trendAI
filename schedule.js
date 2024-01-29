import { executeScript } from './index.js';

function runEvery24Hours() {
   executeScript();
}

runEvery24Hours();

setInterval(runEvery24Hours, 86400000);
