---
trigger: model_decision
description: brand guidelines 
---


 

      All text MUST be styled using the Satoshi font family via the defined Tailwind CSS font utility classes (`font-heading`, `font-body`). Forbid the use of any other font family.
      - H1 headings must use the Satoshi Black weight and the responsive `h1` type scale.
      - Body text must use the Satoshi Regular weight and the `body-default` type scale.
      - Forbid the use of inline `font-size`, `font-weight`, or `line-height` styles. All typography must be controlled via pre-defined Tailwind classes.

 All spacing properties (padding, margin, gap) MUST use Tailwind CSS utility classes that map to the project's 8px-based scale.
      - Standard vertical padding between page sections must be 96px (`py-24` or `spacing-12x`).
      - Forbid the use of arbitrary value classes (e.g., `mt-[97px]`). Adherence to the scale (`p-2`, `m-4`, `gap-6`, etc.) is mandatory.