#!/usr/bin/env node

import os from 'os';
import Configstore from 'configstore';
import { spawn } from 'child_process';
import prompt from 'prompt';
import { v4 as uuid } from 'uuid';

const GA_TRACKING_ENDPOINT = 'http://www.google-analytics.com/debug/collect';
const GA_TRACKING_ID = 'GA-xxxx';
const CONFIG_STORE_NAME = 'faustnx';

export interface TelemetryPayload {
  cpuCount: number;
  platform: string;
  arch: string;
}

/**
 * Used to fire Google Analytics requests
 *
 * @param category GA Category
 * @param action GA Action
 * @param label GA Label
 * @param payload The data being sent to GA
 * @param anonymousId The anonymous ID of the machine we captured during init
 */
const sendTelemetryData = (
  category: string,
  action: string,
  label: string,
  payload: TelemetryPayload,
  anonymousId: string,
) => {
  const data = {
    // API Version.
    v: '1',
    // Tracking ID / Property ID.
    tid: GA_TRACKING_ID,
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid: anonymousId,
    // Event hit type.
    t: 'event',
    // Event category.
    ec: category,
    // Event action.
    ea: action,
    // Event label.
    el: label,
    // Event value.
    ev: payload,
  };

  return fetch(GA_TRACKING_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

(async () => {
  prompt.start();
  const nextCliArgs = process.argv.filter((arg, index) => index > 1);
  const config = new Configstore(CONFIG_STORE_NAME);

  /**
   * If there is no config (or a non-valid config), prompt the user for their
   * permission to collect anonymous telemetry information and save their
   * preferences on their machine.
   */
  if (
    !config.all?.telemetry ||
    config.all?.telemetry?.enabled === undefined ||
    !config.all?.telemetry?.anonymousId
  ) {
    const { isTelemetryEnabled } = await prompt.get({
      properties: {
        isTelemetryEnabled: {
          description:
            'Would you like to enable telemetry in FaustNX? This helps us make more informed feature decisions. true/false',
          required: true,
          type: 'boolean',
        },
      },
    });

    config.set('telemetry', {
      notifiedAt: new Date().getTime(),
      anonymousId: uuid(),
      enabled: isTelemetryEnabled,
    });
  }

  if (nextCliArgs[0] === 'faustnx-telemetry') {
    const { isTelemetryEnabled } = await prompt.get({
      properties: {
        isTelemetryEnabled: {
          description:
            'Would you like to enable telemetry in FaustNX? This helps us make more informed feature decisions. true/false',
          required: true,
          type: 'boolean',
        },
      },
    });

    config.set('telemetry.enabled', isTelemetryEnabled);

    process.exit(0);
  }

  // The telemetry data to collect
  const telemetryData = {
    cpuCount: os.cpus().length,
    platform: os.platform(),
    arch: os.arch(),
  };

  /**
   * If the script being ran is "faustnx build", telemetry is enabled, and the
   * anonymousId exists, send the telemetry data.
   */
  if (
    nextCliArgs[0] === 'build' &&
    config.get('telemetry.enabled') === true &&
    config.get('telemetry.anonymousId')
  ) {
    try {
      console.log('Sending Telemetry event', telemetryData);
      sendTelemetryData(
        'ga-category',
        'ga-action',
        'ga-label',
        telemetryData,
        config.get('telemetry.anonymousId'),
      );
    } catch (err) {
      // Fail silently
    }
  }

  /**
   * Spawn a child process using the args captured in argv and continue the
   * standard i/o for the Next.js CLI.
   */
  const nextCommand = spawn('next', nextCliArgs, { stdio: 'inherit' });
})();
