import chalk from "chalk";
import { getCliArgs } from "./getCliArgs.js";
import { userConfig } from "./userConfig.js";
import { styles } from "./styles.js";

const TELEMETRY_ENABLED = 'telemetry.enabled';
const { log } = console;

/**
 * Handles the telemetry subcommand.
 */
export const handleTelemetrySubcommand = () => {
  const telemetryEnabled = userConfig.get(TELEMETRY_ENABLED);
  const args = getCliArgs();
  const subcommand = args[1];

  switch(subcommand) {
    case 'enable': {
      userConfig.set(TELEMETRY_ENABLED, true);
      log(styles.success('Done!'));
      printTelemetryStatus();
      printThankYouMessage();
      break;
    }

    case 'disable': {
      telemetryEnabled
        ? log(styles.success(`Your preference has been saved to ${userConfig.path}`))
        : log(styles.warn(`Faust.js' telemetry collection is already disabled.`));

      userConfig.set(TELEMETRY_ENABLED, false);
      printTelemetryStatus();
      log("You have opted-out of Faust.js' anonymous telemetry program.");
      log("No data will be collected from your machine.");
      log('Learn more: https://faustjs.org/docs/telemetry');
      break;
    }

    case 'status': {
      log(styles.brand('Faust.js Telemetry'));
      printTelemetryStatus();
      printThankYouMessage();
      break;
    }

    default: {
      log(`"${subcommand}" is not a valid telemetry subcommand`);
      break;
    }
  }
};

const printTelemetryStatus = () => {
  const statusSetting = userConfig.get(TELEMETRY_ENABLED);
  const status = statusSetting
    ? chalk.green('Enabled')
    : chalk.red('Disabled');

  log();
  log(`Status: ${status}`);
  log();
}

const printThankYouMessage = () => {
  log('Faust.js telemetry is completely anonymous. Thank you for participating!');
  log('Learn more: https://faustjs.org/docs/telemetry');
}
