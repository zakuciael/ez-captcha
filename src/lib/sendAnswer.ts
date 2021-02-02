import { CAPTCHA_BASE_URL, CAPTCHA_LOCALE, CAPTCHA_USER_AGENT, CaptchaConfig } from "./globals";
import fetch from "node-fetch";
import { InvalidResponseError } from "./InvalidResponseError";

export const sendAnswer = async (challengeId: string, answer: number): Promise<CaptchaConfig> => {
    return fetch(`${CAPTCHA_BASE_URL}/${challengeId}/${CAPTCHA_LOCALE}`, {
        method: "POST",
        headers: {
            Origin: "spark://www.gameforge.com",
            "Content-Type": "application/json",
            "User-Agent": CAPTCHA_USER_AGENT,
        },
        body: JSON.stringify({ answer: answer }),
    }).then((res) => {
        if (res.ok) return res.json();
        else throw new InvalidResponseError(res.status, res.statusText);
    }) as Promise<CaptchaConfig>;
};
