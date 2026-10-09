---
'@faustwp/blocks': major
---

Fixed builds failing on WordPress 7.0 and later with `Cannot query field "textAlign" on type "CoreButtonAttributes"` (or `"CoreHeadingAttributes"`). WordPress 7.0 moved text alignment on these blocks from a block attribute to a block support, so `textAlign` is no longer in the `CoreButton` and `CoreHeading` fragments or types.

Rendered alignment is unchanged: the `has-text-align-*` class still comes through `cssClassName` on headings and `linkClassName` on buttons. If your own code read `attributes.textAlign`, read that class instead.
