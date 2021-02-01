export { loginMethod, LoginCaptcha } from "./lib/globals";

import { loginMethod } from "./src";

export declare const solveCaptcha: (
    challengeId: string,
    login: loginMethod,
    maxAttempts?: number
) => Promise<boolean>;
