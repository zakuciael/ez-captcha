import { CAPTCHA_BASE_URL, CAPTCHA_LOCALE, CAPTCHA_USER_AGENT, CaptchaConfig } from "./globals";
import fetch from "node-fetch";

export const sendAnswer = async (challengeId: string, answer: number): Promise<CaptchaConfig> => {
    return fetch(`${CAPTCHA_BASE_URL}/${challengeId}/${CAPTCHA_LOCALE}`, {
        method: "POST",
        headers: {
            Origin: "spark://www.gameforge.com",
            "Content-Type": "application/json",
            "User-Agent": CAPTCHA_USER_AGENT,
        },
        body: JSON.stringify({ answer: answer }),
    }).then((res) => res.json() as Promise<CaptchaConfig>);
};
