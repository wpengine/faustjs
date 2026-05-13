---
"@faustwp/wordpress-plugin": patch
---

fix[faustwp]: use home_url() in handle_generate_endpoint so Bedrock-style installs (where WordPress core lives under /wp/) match against the public REQUEST_URI
