## Scroll-To-Top Button Rules

### Purpose and Scope

- **Primary goal**: provide a consistent, accessible pattern for implementing a “scroll to top” button in any web project.
- **Scope**: applies to all pages with content long enough that scrolling back to the top manually may be inconvenient.
- **Non-goals**: this document does not prescribe concrete colors, exact sizes, or iconography – those must follow the host product’s design system.

### When to Show the Button

- **Trigger by scroll depth**, not by specific section IDs, unless the product has a very rigid layout.
- **Recommended threshold**:
  - Show the button when the user scrolls down roughly **1.5–2 viewport heights** from the top.
  - Hide it again when the user scrolls back near the top (e.g. above ~0.5 viewport height).
- **Rationale**:
  - Avoid visual noise when the user is still near the top of the page.
  - Ensure the button is available once scrolling becomes effortful.
- **Implementation options**:
  - Simple approach: listen to `scroll` and compare `window.scrollY` to `window.innerHeight`.
  - Advanced approach: use `IntersectionObserver` on a “sentinel” element near the top or bottom of core content to decide visibility.

### Positioning and Layout

- **Fixed placement**:
  - Use a fixed position in the **bottom right corner** by default.
  - Example layout guidelines:
    - Mobile: `right` and `bottom` offsets around a small spacing unit (e.g. `1rem`).
    - Tablet/Desktop: slightly larger offsets (e.g. `2rem`) to reduce overlap with other UI.
- **Safe areas**:
  - Consider OS safe areas (`env(safe-area-inset-*)`) on mobile devices so the button does not overlap system UI.
  - Avoid overlapping critical UI such as chat widgets, cookie banners or FABs; if present, adjust offsets or z-index accordingly.
- **Stacking context**:
  - Ensure a **sufficiently high z-index** so the button is not hidden by main content, but do not exceed modal/dialog z-index.

### Visual Design Principles

- **Shape**:
  - Prefer a **circular or pill-shaped** button to clearly communicate a single, focused action.
- **Color and theming**:
  - Use existing **design tokens** / brand colors:
    - Background color should provide clear contrast against typical page content.
    - Icon or text color should contrast with the button background.
  - Support light and dark themes by:
    - Using semantic color tokens (e.g. “foreground/background” or theme-aware variables).
    - Avoid hard-coded colors that only look good in one theme.
- **Iconography**:
  - Use a simple **upward arrow** (↑) or chevron as the primary visual hint.
  - Icon should be vector-based (SVG) with `currentColor` to inherit from text color.
- **Size**:
  - Button hit area should respect minimum **44x44px** (or equivalent) guidelines for touch targets.
  - On larger screens, slightly increase size for visual balance while keeping the hit area at least at the minimum.

### Interaction and Animations

- **Visibility transitions**:
  - Animate **opacity** and/or small **vertical translation** (e.g. fade + slide up) when showing/hiding.
  - Avoid jarring or long animations; aim for 150–300ms with an ease-out/ease-in-out curve.
  - Ensure the button does not cause layout shifts (no reflow of main content).
- **Click behavior**:
  - On activation, scroll to the top of the scroll container (usually `window`).
  - Respect the user’s motion preferences:
    - If `prefers-reduced-motion: reduce` is set, use immediate scroll (no smooth animation).
    - Otherwise, use smooth scrolling.
- **Hover/active feedback**:
  - Provide clear, but subtle, feedback on hover/focus/active states (e.g. slight color change, shadow change).

### Accessibility Requirements

- **Keyboard accessibility**:
  - The button must be **focusable** and reachable via standard tab navigation.
  - Provide a visible focus outline that works in all supported themes.
- **Screen readers**:
  - Use an appropriate **aria-label**, such as “Back to top” (localised via i18n system).
  - Do not rely only on the icon to convey meaning.
- **Motion sensitivity**:
  - Respect `prefers-reduced-motion` when choosing scroll behavior and animations.
- **Contrast and legibility**:
  - Ensure WCAG-compliant color contrast between button background and icon/text.

### Implementation Guidelines

- **Component structure**:
  - Implement as a **reusable client-side component** that:
    - Listens to scroll (or an equivalent visibility signal).
    - Renders a fixed-position button when visible.
    - Emits a scroll-to-top action on click.
- **Configuration options**:
  - Allow projects to override:
    - Scroll threshold (in pixels or in multiples of viewport height).
    - Position (corners, offsets).
    - Optional container selector (if scrolling a specific element instead of `window`).
- **Performance considerations**:
  - Use passive `scroll` listeners and minimise work inside handlers.
  - Consider throttling or debouncing state updates to avoid excessive re-renders.
  - Avoid expensive layout calculations on every scroll event.

### Integration and Usage

- **Where to mount**:
  - Prefer mounting once at a **layout/root level** so it is available across all long pages in a section of the app.
- **Internationalization**:
  - Source the label from the app’s i18n system using a shared key (e.g. `common.backToTop`).
- **Testing checklist**:
  - Verify:
    - The button appears only after the user scrolls past the chosen threshold.
    - It hides again near the top.
    - It works correctly on mobile, tablet and desktop viewports.
    - It behaves respectfully with `prefers-reduced-motion`.
    - It does not overlap or conflict with other floating UI elements.

