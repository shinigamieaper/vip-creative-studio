---
trigger: model_decision
description: accesibilty standards 
---

    Interactive elements MUST use semantic HTML. Use `<button>` for actions that trigger a change on the current page. Use `<a>` with a valid `href` attribute for navigation to another URL. The use of `onClick` handlers on non-interactive elements like `<div>`, `<span>`, or `<p>` is strictly forbidden.

      All instances of the `next/image` component or a standard `<img>` tag MUST include a descriptive, non-empty `alt` attribute that conveys the content and function of the image. For images that are purely decorative and provide no information, use an empty alt attribute (`alt=""`).

   All form controls (`<input>`, `<textarea>`, `<select>`) MUST be associated with a visible `<label>` element. The connection must be made using the `htmlFor` attribute on the `<label>`, which corresponds to the `id` of the form control.

   All interactive elements (links, buttons, form inputs) MUST have a clearly visible focus indicator. Use Tailwind's `focus-visible` utility to style these states, ensuring they meet WCAG contrast requirements. Do not use `outline: none` or `ring-0` without providing an alternative, visible focus style.
