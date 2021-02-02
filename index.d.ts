export type loginMethod = () => Promise<LoginCaptcha>;

export interface LoginCaptcha {
    requireCaptcha: boolean;
    id?: string;
}

export interface SolveResult {
    id: string;
    solved: boolean;
}

export declare const solveCaptcha: (
    challengeId: string,
    login: loginMethod,
    maxAttempts?: number
) => Promise<SolveResult>;
