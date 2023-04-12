import chalk from 'chalk';
import { getCliArgs } from '../utils/index.js';
import { userConfig } from '../userConfig.js';
import { styles } from '../stdout/index.js';

const TELEMETRY_ENABLED = 'telemetry.enabled';

const logTelemetryStatus = () => {
  const statusSetting = userConfig.get(TELEMETRY_ENABLED);
  const status = statusSetting ? chalk.green('Enabled') : chalk.red('Disabled');

  console.log();
  console.log(`Status: ${status}`);
  console.log();
};

const logTelemetryDocsUrl = () => {
  console.log('Learn more: https://faustjs.org/docs/telemetry');
};

const logUserPrefsHaveBeenSaved = () => {
  console.log(
    styles.success(`Your preference has been saved to ${userConfig.path}`),
  );
};

const logTelemetryAlreadyDisabled = () => {
  console.log(
    styles.warn(`Faust.js' telemetry collection is already disabled.`),
  );
};

/**
 * Handles the telemetry subcommand.
 */
export const handleTelemetrySubcommand = () => {
  const telemetryEnabled = userConfig.get(TELEMETRY_ENABLED);
  const args = getCliArgs();
  const subcommand = args[1];

  switch (subcommand) {
    case 'enable': {
      userConfig.set(TELEMETRY_ENABLED, true);
      console.log(styles.success('Done!'));
      logTelemetryStatus();
      console.log(
        'Faust.js telemetry is completely anonymous. Thank you for participating!',
      );
      logTelemetryDocsUrl();
      break;
    }

    case 'disable': {
      telemetryEnabled
        ? logUserPrefsHaveBeenSaved()
        : logTelemetryAlreadyDisabled();

      userConfig.set(TELEMETRY_ENABLED, false);
      logTelemetryStatus();
      console.log(
        "You have opted-out of Faust.js' anonymous telemetry program.",
      );
      console.log('No data will be collected from your machine.');
      logTelemetryDocsUrl();
      break;
    }

    case undefined: // faust telemetry (without subcommand)
    case 'status': {
      console.log(styles.brand('Faust.js Telemetry'));
      logTelemetryStatus();
      console.log('Faust.js telemetry is completely anonymous.');
      logTelemetryDocsUrl();
      break;
    }

    default: {
      console.log(
        styles.error(`"${subcommand}" is not a valid telemetry subcommand`),
      );
      break;
    }
  }
};
