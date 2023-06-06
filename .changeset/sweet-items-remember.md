---
'@faustwp/core': minor
---

**BREAKING** - Fixed seed query failing when attempting to view an unpublished WordPress post with a draft status.

Previously the seed query would only receive `data.node`. These changes update the seed query to now recieve both `data.contentNode` & `data.nodeByUri`. Note that projects hooking into Faust's `seedQueryDocumentNode` filter will need to refactor in order to use the new nodeByUri/contentNode syntax.
