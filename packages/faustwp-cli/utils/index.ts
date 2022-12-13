import { getCliArgs } from './getCliArgs.js';
import { errorLog, infoLog } from './log.js';
import { marshallTelemetryData } from './marshallTelemetryData.js';
import { handleTelemetrySubcommand } from './handleTelemetrySubcommand.js';
import { requestWPTelemetryData } from './requestWPTelemetryData.js';
import { shouldFireTelemetryEvent } from './shouldFireTelemetryEvent.js';
import { sendTelemetryData } from './sendTelemetryData.js';
import type { TelemetryData } from './marshallTelemetryData.js';
import { generatePossibleTypes } from './generatePossibleTypes.js';
import { userConfig } from './userConfig.js';
import { telemetryPrefsExist } from './doTelemetryPrefsExist.js';
import { validateFaustEnvVars } from './validateFaustEnvVars.js';

export {
  errorLog,
  generatePossibleTypes,
  getCliArgs,
  infoLog,
  marshallTelemetryData,
  handleTelemetrySubcommand,
  requestWPTelemetryData,
  shouldFireTelemetryEvent,
  sendTelemetryData,
  TelemetryData,
  telemetryPrefsExist,
  userConfig,
  validateFaustEnvVars,
};
