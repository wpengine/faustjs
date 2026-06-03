---
"@faustwp/wordpress-plugin": patch
---

Remove the `Update URI: false` header from `faustwp.php` so WordPress checks wordpress.org for plugin updates. This restores wordpress.org as the canonical update channel for new installs. The 1.8.8 security fix (GHSA-q6pm-r77q-qcv3) — include the IV in the token envelope HMAC to prevent authentication bypass — was reported by ParkHyunWoo (@hwpark6804-gif) via Patchstack.
