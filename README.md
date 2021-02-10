# EZ Captcha

A non-AI powered node.js library for solving GameFail's captcha.

## Installation

```bash
yarn add @zakku/ez-captcha
# or
npm i @zakku/ez-captcha
```

# Usage

To use this package you need two things:

1. Captcha challenge id - Which you can retrieve by logging into the GameFail account and looking for `gf-challenge-id`
   header.
2. A login method - An asynchronous function that returns: `{ requireCaptcha: boolean, id?: string }` object.

> Note: The `id` field needs to be present when `requireCaptcha` is equal to `true`

```typescript
import {LoginCaptcha, SolveResult, solveCaptcha} from "@banzar-team/ez-captcha";

const login = (): Promise<LoginCaptcha> => {
    return fetch("https://spark.gameforge.com/api/v1/auth/sessions", {
        method: "POST",
        headers: {
            "TNT-Installation-Id": "<INSTALLATION_ID>",
        },
        body: JSON.stringify({
            email: "<EMAIL>",
            locale: "<LOCALE>",
            password: "<PASSWORD>",
        }),
    }).then((res) => {
        if (res.status === 409) {
            const challengeId = res.headers.get("gf-challenge-id");

            return {
                requireCaptcha: true,
                id: challengeId !== null ? challengeId.split(";")[0] : undefined,
            };
        } else return {requireCaptcha: false};
    });
};

(async () => {
    const result: SolveResult = await solveCaptcha("<CHALLENGE_ID>", login);
    console.log(result) // { id: "<DIFFRENT_OR_THE_SAME_CHALLENGE_ID>", solved: <TRUE/FALSE> }
})();
```