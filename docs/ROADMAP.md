# Reports Roadmap

This roadmap is workflow-led. Each phase should add a small set of files, then run a manual GitHub Actions instrument before extending the repository further.

## Phase 1: Evidence and Save As scaffold

Goal: prove the public contract before building complex report engines.

Deliverables:

- evidence schema
- report DNA schema
- journey schema
- synthetic evidence example
- browser Save As contract
- static report studio prototype
- manual validation workflows

Acceptance checks:

- schemas validate
- example pack builds
- report DNA references generated outputs
- Save As contract contains primary and fallback paths
- no confidential content appears in examples

## Phase 2: Browser report studio

Goal: demonstrate CSV, TXT, JSON and HTML export from the same evidence object.

Deliverables:

- `studio/index.html`
- `studio/report-save.js`
- `studio/report-evidence.js`
- example HTML report

Acceptance checks:

- Chrome/Edge path supports File System Access API
- Firefox/Safari path falls back to Blob download
- object URLs are revoked
- outputs include disclaimer and source badge

## Phase 3: Journey reports

Goal: let a user collect a trail across GlobalGrid2050 tools without a server.

Deliverables:

- journey JSON contract
- browser session model
- IndexedDB design note
- import/export example

Acceptance checks:

- journey validates
- journey can be exported as JSON
- evidence items retain provenance

## Phase 4: DuckDB-Wasm and Parquet export contract

Goal: prepare for future Parquet and DuckDB-Wasm export without adding heavy data in this repo.

Deliverables:

- DuckDB-Wasm export contract
- Parquet export pseudocode
- browser storage quota guidance

Acceptance checks:

- contract states `COPY ... TO` pattern
- OPFS, IndexedDB and Blob roles are documented
- localStorage is not used for data blobs

## Phase 5: Registry and Spider integration

Goal: make reports visible in the GlobalGrid2050 operating system.

Deliverables:

- registry integration guide
- report node manifest shape
- spider visualisation integration notes

Acceptance checks:

- report manifests can be consumed by future registry scans
- report nodes have typed edges to evidence, datasets and apps

## Phase 6: Template packs and report marketplace

Goal: third parties can add report families without changing core.

Deliverables:

- template pack manifest schema
- first-party template examples
- community pack trust model

Acceptance checks:

- pack has id, version, licence, renderer compatibility and hashes
- unreviewed packs cannot be labelled certified
