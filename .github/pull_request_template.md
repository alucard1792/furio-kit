## Summary

<!-- Describe what this PR does and why. -->

## Changes

<!-- List the main changes. -->

## Checklist

- [ ] FSD layer rules respected — imports only flow downward (`app → views → widgets → features → entities → shared`)
- [ ] No cross-slice imports at the same layer
- [ ] `@org/ui-kit` is not imported directly outside `src/shared/ui/`
- [ ] Every new slice has an `index.ts` public API barrel
- [ ] API responses are parsed through a Zod schema before use
- [ ] Auth tokens are only set in `HttpOnly` cookies server-side — never `localStorage`
- [ ] Server secrets are not prefixed `NEXT_PUBLIC_`
- [ ] New features have tests; bug fixes have a regression test
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm test` passes
