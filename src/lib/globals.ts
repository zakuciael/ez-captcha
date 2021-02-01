export const CAPTCHA_USER_AGENT =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36";
export const CAPTCHA_BASE_URL = "https://image-drop-challenge.gameforge.com/challenge";
export const CAPTCHA_LOCALE = "en-US";

export const CAPTCHA_SOLVE_MAX_ATTEMPTS = 3;
export const CAPTCHA_MAX_ATTEMPTS = 5;

export type CaptchaStatus = "presented" | "solved";
export type loginMethod = () => Promise<LoginCaptcha>;

export interface CaptchaConfig {
    id: string;
    lastUpdated: number;
    status: CaptchaStatus;
}

export interface LoginCaptcha {
    requireCaptcha: boolean;
    id?: string;
}
