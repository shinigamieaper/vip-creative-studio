---
trigger: model_decision
description: when working with sanity 
---

      All data fetching from the Sanity.io Content Lake MUST be performed using GROQ queries via the configured Sanity client. The Sanity GraphQL API is not to be used in this project.

      All GROQ queries must be defined as exported constants within the `src/lib/queries.ts` file. Each query string must be wrapped in the `defineQuery` function imported from `next-sanity` to enable static type generation and editor syntax highlighting.

