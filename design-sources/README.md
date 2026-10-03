# Design sources

HTML sources for the recreated product screens and boards used in the case studies.
Each folder renders one app; pass `?s=<screen-id>` to show a screen
(for example `screens/certa-app/index.html?s=dashboard`).

| Folder | Case | Screens |
|---|---|---|
| certa-app | Certa Admin | dashboard, applications, detail, templates, visits, roles, platform, client, supervisor, login, states |
| relay-app | Relay | manage, status, detail, company, system, training |
| meralis-app | Meralis | dashboard, requests, deposit, esign, roles, payroll |
| spark-app | Spark | teacher, explore, messages, opps, trials, onboard |
| haven-app | Haven | agent, member, listing, onboard, admin, brand |
| ds-app | Foundry | themes, tokens, scales, contrast, rules, process |
| ds1-app | Design System 1.0 | colors, type, buttons, forms, feedback, nav, data |
| brand-app | Brand & visual work | identity, system |

`tools/` has the Puppeteer scripts that capture the screens at 2x as WebP
(`npm install puppeteer-core`, uses the local Chrome). Paths inside them point to
the original working folder and may need adjusting.

This folder is excluded from the Vercel deploy via `.vercelignore`.
