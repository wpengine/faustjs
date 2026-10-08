---
'@faustwp/blocks': major
---

Removes `textAlign` from the `CoreButton` and `CoreHeading` fragments and types so builds no longer fail on WordPress 7.0 and later, where it moved from a block attribute to a block support. Text alignment still reaches the rendered markup through the `has-text-align-*` class in `cssClassName` and `linkClassName`.
