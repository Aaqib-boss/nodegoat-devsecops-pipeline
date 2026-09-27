# STRIDE Threat Model — NodeGoat

| # | STRIDE Category | Threat (application-specific) | Likelihood | Impact | Justification | Mitigating Control | Location in Codebase/Pipeline |
|---|---|---|---|---|---|---|---|
| 1 | Tampering / Injection | NoSQL injection via unsanitized input in profile/allocation query fields, allowing an attacker to manipulate query logic and retrieve or alter unauthorized data | High | High | NodeGoat deliberately leaves these query paths unsanitized; exploitation requires no special tooling, just crafted input in a standard form field | Parameterized queries and input validation before any value is passed into a MongoDB query | `app/routes/*.js`, `app/data/*.js` |
| 2 | Spoofing | Weak session management (predictable/static session secret, no session regeneration on login) allows session fixation or hijacking | Medium | High | Requires the attacker to obtain or predict a session identifier, which is harder than the injection case, but a successful hijack grants full account access | Strong random `SESSION_SECRET` sourced from environment/secrets store, `httpOnly`/`secure` cookie flags, session ID regenerated on successful login | `app/routes/session.js`, `server.js` |
| 3 | Tampering (Stored XSS) | Unescaped user-supplied input (e.g. profile or contribution fields) is rendered back to other users, allowing stored script execution | High | Medium | Easy to trigger (just submit a script tag in a form), impact limited to client-side actions in the victim's session rather than direct server compromise | Output encoding via auto-escaping template syntax, and a Content-Security-Policy header restricting inline script execution | `app/views/*.ejs` |
| 4 | Elevation of Privilege / Insecure Direct Object Reference | A user can access or modify another user's allocation/contribution record by changing an ID in the URL or request body, without any server-side ownership check | Medium | High | Requires the attacker to know or guess another user's record ID, but once found, the exploit is trivial and grants unauthorized read/write access to another user's data | Server-side authorization check verifying the requested record belongs to the authenticated session user before returning or mutating it | `app/routes/contributions.js`, `app/routes/allocations.js` |

**Risk matrix reference (3x3):**

| | Low Impact | Medium Impact | High Impact |
|---|---|---|---|
| **High Likelihood** | — | Threat 3 | Threat 1 |
| **Medium Likelihood** | — | — | Threats 2, 4 |
| **Low Likelihood** | — | — | — |