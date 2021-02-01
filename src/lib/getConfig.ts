import { CAPTCHA_BASE_URL, CAPTCHA_LOCALE, CAPTCHA_USER_AGENT, CaptchaConfig } from "./globals";
import fetch from "node-fetch";

export const getConfig = (challengeId: string): Promise<CaptchaConfig> => {
    return fetch(`${CAPTCHA_BASE_URL}/${challengeId}/${CAPTCHA_LOCALE}/`, {
        method: "GET",
        headers: {
            "User-Agent": CAPTCHA_USER_AGENT,
        },
    }).then((res) => res.json() as Promise<CaptchaConfig>);
};
