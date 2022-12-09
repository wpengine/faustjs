/**
 * Gets the args from the argv process mines the runtime portion.
 */
export const getCliArgs = () => process.argv.filter((arg, index) => index > 1);
