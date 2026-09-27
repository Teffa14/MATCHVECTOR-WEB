# MATCHVECTOR-WEB

Public web surface for MATCHVECTOR.

This repository intentionally contains only browser-safe presentation code and deployment configuration. The replay parser, analytics engine, fixtures, evidence contracts, worker code and other backend implementation remain in the private `Teffa14/VALORANT` repository.

The production web flow is:

```text
browser
  -> MATCHVECTOR-WEB static site
  -> MATCHVECTOR Replay API
  -> pinned vrfkit worker
  -> deterministic replay packet + analytics
  -> generated report
```

The upload page accepts one `.vrf` up to 500 MB, sends it to the configured API, polls job status and opens the finished deterministic report.

Runtime API configuration lives in `config.js`.

Current expected API origin:

```text
https://matchvector-api-teffa14-v2.onrender.com
```

The visible Overview, Match Report, Player DNA, Pricing and Economics values are synthetic product-demo data. Real replay data appears only in generated backend reports.

The project is independent and unaffiliated with Riot Games. VALORANT and related trademarks belong to Riot Games, Inc.
