import { getCliArgs } from './getCliArgs.js';
import { errorLog, noticeLog } from './log.js';
import { marshallTelemetryData } from './marshallTelemetryData.js';
import { promptUserForTelemetryPref } from './promptUserForTelemetryPref.js';
import { requestWPTelemetryData } from './requestWPTelemetryData.js';
import { sendTelemetryData } from './sendTelemetryData.js';
import { validateFaustNXEnvVars } from './validateFaustNXEnvVars.js';
import type {TelemetryData} from './marshallTelemetryData.js'

export {
  getCliArgs,
  errorLog,
  noticeLog,
  marshallTelemetryData,
  promptUserForTelemetryPref,
  sendTelemetryData,
  validateFaustNXEnvVars,
  requestWPTelemetryData,
  TelemetryData
};
