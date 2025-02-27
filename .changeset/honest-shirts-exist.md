---
"@faustwp/wordpress-plugin": major
---

chore: Updated FaustWP to create a preview link for all draft post types.

Removed actions `rest_prepare_post` and `rest_prepare_page` from the callback functions.
Added a new action for `rest_api_init` to add `rest_prepare_{$post_type}` action for all publicably queryable post types including custom post types.
