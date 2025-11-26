---
trigger: model_decision
description: best practices for next.js
---

    Any component that imports and uses React hooks (`useState`, `useEffect`, `useContext`, etc.) or accesses browser-only APIs (`window`, `document`, `localStorage`) MUST include the `'use client'` directive as the very first line of the file.

      For data fetching within Server Components (any component in the `app` directory not marked with `'use client'`), you MUST use native `async/await` with the `fetch` API. Do not use client-side data fetching libraries like SWR or TanStack Query in Server Components.

When using the `.map()` method on an array to render a list of JSX elements, the root element returned within the map callback MUST have a unique `key` prop. The value of the `key` must be a stable and unique identifier from the data (e.g., `item.id` or `item._id`), not the array index.
