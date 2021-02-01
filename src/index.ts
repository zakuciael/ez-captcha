import { CAPTCHA_MAX_ATTEMPTS, CAPTCHA_SOLVE_MAX_ATTEMPTS, loginMethod } from "./lib/globals";
import { getResources } from "./lib/getResources";
import { sendAnswer } from "./lib/sendAnswer";
import { getConfig } from "./lib/getConfig";

export const solveCaptcha = async (
    challengeId: string,
    login: loginMethod,
    maxAttempts = CAPTCHA_MAX_ATTEMPTS
): Promise<boolean> => {
    const config = await getConfig(challengeId);
    if (config.id !== challengeId) challengeId = config.id;

    const resourcesLoaded = await getResources(challengeId, config.lastUpdated);
    if (!resourcesLoaded) return false;

    let solved = false;
    for (let captchaAttempt = 0; captchaAttempt < maxAttempts; captchaAttempt++) {
        for (let solveAttempt = 0; solveAttempt < CAPTCHA_SOLVE_MAX_ATTEMPTS; solveAttempt++) {
            const answer = Math.floor(Math.random() * 4);
            const result = await sendAnswer(challengeId, answer);

            if (result.status === "solved") {
                solved = true;
                break;
            }
        }

        if (solved) break;

        const result = await login();
        if (result.requireCaptcha && result.id) challengeId = result.id;
    }

    return solved;
};

export { loginMethod, LoginCaptcha } from "./lib/globals";
