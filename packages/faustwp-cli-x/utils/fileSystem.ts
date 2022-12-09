import { fileURLToPath } from "node:url";

export const filePath = fileURLToPath(new URL('../../', import.meta.url));
