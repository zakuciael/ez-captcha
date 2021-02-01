export { loginMethod, LoginCaptcha, SolveResult } from "./lib/globals";

import { loginMethod, SolveResult } from "./src";

export declare const solveCaptcha: (
    challengeId: string,
    login: loginMethod,
    maxAttempts?: number
) => Promise<SolveResult>;
