# Task: Repair generated page using visual diff report

You are given:
- reference screenshot from Pencil
- generated screenshot
- diff image
- validation report
- source code

## Goal
Reduce visual difference while preserving maintainability.

## Repair priority
1. layout structure
2. spacing and alignment
3. typography scale and line-height
4. border radius / border / shadow
5. icon/image sizing
6. overflow / truncation / wrapping

## Constraints
- Do not replace reusable components with raw divs unless necessary
- Do not introduce excessive hard-coded styles
- Do not break typecheck or lint
- Keep fixes localized

## Output
- updated code
- repair summary
- remaining known gaps
