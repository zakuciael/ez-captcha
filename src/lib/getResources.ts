import { CAPTCHA_BASE_URL, CAPTCHA_LOCALE, CAPTCHA_USER_AGENT } from "./globals";
import fetch from "node-fetch";

const getText = (challengeId: string, rnd: number): Promise<boolean> => {
    return fetch(`${CAPTCHA_BASE_URL}/${challengeId}/${CAPTCHA_LOCALE}/text?${rnd}`, {
        method: "GET",
        headers: {
            "User-Agent": CAPTCHA_USER_AGENT,
        },
    }).then((res) => res.ok);
};

const getDragIcons = (challengeId: string, rnd: number): Promise<boolean> => {
    return fetch(`${CAPTCHA_BASE_URL}/${challengeId}/${CAPTCHA_LOCALE}/drag-icons?${rnd}`, {
        method: "GET",
        headers: {
            "User-Agent": CAPTCHA_USER_AGENT,
        },
    }).then((res) => res.ok);
};

const getDropTarget = (challengeId: string, rnd: number): Promise<boolean> => {
    return fetch(`${CAPTCHA_BASE_URL}/${challengeId}/${CAPTCHA_LOCALE}/drop-target?${rnd}`, {
        method: "GET",
        headers: {
            "User-Agent": CAPTCHA_USER_AGENT,
        },
    }).then((res) => res.ok);
};

export const getResources = async (challengeId: string, rnd: number): Promise<boolean> => {
    return (
        (await getText(challengeId, rnd)) &&
        (await getDragIcons(challengeId, rnd)) &&
        (await getDropTarget(challengeId, rnd))
    );
};
