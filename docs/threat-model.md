# STRIDE Threat Model: NodeGoat

| # | STRIDE | Threat (application-specific) | Likelihood | Impact | Justification | Mitigating control | Location |
|---|---|---|---|---|---|---|---|
| 1 | Tampering | NoSQL/JavaScript injection: the `threshold` query parameter of `/allocations/:userId` is interpolated into a MongoDB `$where` string (CWE-943) | High | High | Any logged-in user controls the parameter and no tooling is needed; injected JavaScript runs inside MongoDB and can read other users' data | Validate `threshold` as an integer and replace `$where` with a standard query using `$gt` | `app/data/allocations-dao.js` (lines 73, 78) |
| 2 | Tampering / Elevation of Privilege | Server-side code injection: `preTax`, `afterTax` and `roth` are passed to `eval()` (CWE-95) | High | High | Signup is open, so any visitor can reach the form; eval gives arbitrary JavaScript execution in the Node process, including access to its environment variables | Replace `eval()` with `parseInt()` and a range check on each field | `app/routes/contributions.js` (lines 32-34) |
| 3 | Spoofing | Session fixation: login does not regenerate the session ID, so a pre-login session ID stays valid afterwards (CWE-384); distinct username/password errors allow user enumeration | Medium | High | The attacker must plant a session ID in the victim's browser, which is harder than injection, but success gives full account takeover | Call `req.session.regenerate()` on login, return one generic error message, and load the cookie secret from an environment variable | `app/routes/session.js`, `config/env/all.js` |
| 4 | Tampering (Stored XSS) | swig autoescape is disabled, so user-supplied content is rendered as raw HTML to other users (CWE-79) | High | Medium | Any user can store a script payload; impact is limited to the victim's browser session, not the server | Set `autoescape: true` and add a Content-Security-Policy via helmet | `server.js` (lines 135-137), `app/views/*.html` |
| 5 | Information Disclosure | IDOR: `/allocations/:userId` trusts the ID in the URL instead of the logged-in user (CWE-639) | High | Medium | User IDs appear to be sequential integers, so guessing is trivial; exposure is limited to other users' allocation data | Take `userId` from `req.session` and ignore the URL parameter | `app/routes/allocations.js` |

## Risk matrix (3x3)

| | Low impact | Medium impact | High impact |
|---|---|---|---|
| **High likelihood** | | Threats 4, 5 | Threats 1, 2 |
| **Medium likelihood** | | | Threat 3 |
| **Low likelihood** | | | |