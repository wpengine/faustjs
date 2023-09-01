---
'@faustwp/core': patch
---

Improved keyboard navigation within Toolbar menus.


Note that the `ToolbarItem` component no longer uses the prop `handleClick`, instead relying on pass-through props in order to separate the click event from the the key event.

```jsx
<ToolbarItem onKeyDown={handleKeyDown} onClick={handleClick}>
    Log Out
</ToolbarItem>
```
