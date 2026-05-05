# audit-runbook — Marsalforn Home Phase 6 (v1.18)

8-step sequence per skill ref 38.

1. Environment + scope.
2. `pnpm validate:seed` + `pnpm tsx scripts/validate-seed.ts`.
3. Stage A: `audit-static.ts ../..` + `audit-secrets.sh` + `audit-route-integrity.sh` + `audit-brand-assets.sh`.
4. Analytics: `audit-analytics/run.ts` (15) + `audit-analytics/runtime.test.ts` (38).
5. Stage B (60s warm-up): `audit.ts $URL` + `audit-headers.sh`.
6. Visual walkthrough — 10-step including `/cart` (EU CRD disclosures), `/sale` (Omnibus prior price), `/p/lt02` (made-to-order pill), `/account/save-list` (email-the-list flow).
7. Privacy review: processors itemised, retention stated, DSAR reachable.
8. Triage + gate. 0 P0 → PASS.
