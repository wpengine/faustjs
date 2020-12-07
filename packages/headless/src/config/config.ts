import { WPEHeadlessConfig } from "../types";
import { normalizeConfig } from "../utils";

let wpeConfig: WPEHeadlessConfig = {};

export function wpeHeadlessConfig(config?: WPEHeadlessConfig): WPEHeadlessConfig {
    if (!!config) {
        wpeConfig = normalizeConfig(config);
    }

    return wpeConfig;
}
