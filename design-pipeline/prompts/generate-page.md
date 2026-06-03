# Task: Generate production-grade frontend code from mapped IR

You must generate code from `design-artifacts/ir/mapped-ir.json`.

## Requirements
1. Use TypeScript.
2. Prefer existing project components according to `design-pipeline/rules/component-map.json`.
3. Prefer theme tokens over hard-coded values.
4. Keep the code modular and readable.
5. Create reusable local generated components when repeated structures are detected.
6. Use semantic HTML whenever applicable.
7. Avoid excessive absolute positioning.
8. Output must pass lint, typecheck, and build.
9. Add or update visual regression tests if needed.

## Deliverables
- page file
- generated components
- necessary styles
- validation artifacts
- mapping and generation summary

## If uncertainty exists
When a mapping or responsive behavior is uncertain:
- choose the most maintainable interpretation
- document uncertainty in the report
- do not block generation
