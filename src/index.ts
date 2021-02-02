import {
    CAPTCHA_MAX_ATTEMPTS,
    CAPTCHA_SOLVE_MAX_ATTEMPTS,
    loginMethod,
    SolveResult,
} from "./lib/globals";
import { getResources } from "./lib/getResources";
import { sendAnswer } from "./lib/sendAnswer";
import { getConfig } from "./lib/getConfig";

let captchaAttempt = 0;

export const solveCaptcha = async (
    challengeId: string,
    login: loginMethod,
    maxAttempts = CAPTCHA_MAX_ATTEMPTS
): Promise<SolveResult> => {
    const config = await getConfig(challengeId);
    if (config.id !== challengeId) challengeId = config.id;

    const resourcesLoaded = await getResources(challengeId, config.lastUpdated);
    if (!resourcesLoaded) return { id: challengeId, solved: false };

    let solved = false;
    for (let solveAttempt = 0; solveAttempt < CAPTCHA_SOLVE_MAX_ATTEMPTS; solveAttempt++) {
        try {
            const answer = Math.floor(Math.random() * 4);
            const result = await sendAnswer(challengeId, answer);

            if (result.status === "solved") {
                solved = true;
                break;
            }
        } catch (e) {
            break;
        }
    }

    if (solved) {
        captchaAttempt = 0;
        return { id: challengeId, solved: solved };
    } else if (!solved && captchaAttempt < maxAttempts) {
        const result = await login();

        if (result.requireCaptcha && result.id) challengeId = result.id;
        return solveCaptcha(challengeId, login, maxAttempts);
    } else {
        captchaAttempt = 0;
        return { id: challengeId, solved: false };
    }
};

export { loginMethod, LoginCaptcha, SolveResult } from "./lib/globals";
