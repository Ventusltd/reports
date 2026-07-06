# GlobalGrid2050 Reports

GlobalGrid2050 Reports is the report instrumentation layer for the wider GlobalGrid2050 federation.

The repository starts with a deliberately small, browser-first build pattern:

1. evidence objects
2. CSV and plain text outputs
3. report DNA manifests
4. browser Save As contracts
5. static report studio examples
6. journey JSON
7. registry and spider integration

The atomic unit is not a PDF. The atomic unit is an evidence object carrying provenance.

Reports are projections over evidence. PDFs, DOCX files, HTML pages and teasers are rendered views, not the source of truth.

## Design doctrine

Every GlobalGrid2050 application should be capable of producing evidence, and every piece of evidence should be capable of becoming a report.

CSV must always exist.

Plain text must always exist.

HTML must always exist for browser review.

PDF is an optional rendered output.

Every generated output must carry a manifest, source badge, confidence state and screening disclaimer.

This public repository must not contain confidential project material. Examples are synthetic and generalised.

## Browser-first Save As architecture

GlobalGrid2050 is static-first and GitHub Pages friendly. The report layer is therefore designed for browser-side file creation.

Primary path:

```js
window.showSaveFilePicker()
handle.createWritable()
writable.write(blob)
writable.close()
```

Fallback path:

```js
Blob
URL.createObjectURL(blob)
<a download>
URL.revokeObjectURL(url)
```

This gives Chromium users a true Save As / Save loop and gives Firefox and Safari users a conventional download fallback.

Large future exports should use IndexedDB, OPFS and chunked writes rather than localStorage. The 10 MiB limit applies to Web Storage, not to all browser storage.

## Report families

Initial public report families:

- plain text site note
- CSV evidence export
- HTML screening report
- project teaser
- report DNA manifest
- journey JSON

Future report packs:

- market survey
- private wire opportunity
- solar and BESS screening
- EV charging forecourt screening
- data centre readiness
- inverter and skid comparison
- bankability support pack
- G99 / G100 / SCADA / cyber evidence register
- protection coordination register
- PSS/E and PSCAD model register

All future packs must be template packs over the same evidence model.

## Repository map

```text
.github/workflows/                 Manual workflow instruments
contracts/                         Browser and export design contracts
docs/                              Doctrine, roadmap and trigger guide
examples/                          Synthetic public examples
schemas/                           Evidence, report DNA and journey schemas
studio/                            Static browser report studio prototype
```

## First manual workflow sequence

Run these manually from GitHub Actions in order:

1. Validate report schemas
2. Build example evidence pack
3. Validate Save As contract
4. Build browser report studio
5. Validate journey JSON contract
6. Audit report DNA outputs

See `docs/WORKFLOW_TRIGGER_GUIDE.md`.

## Status

Phase 1 scaffold.

Screening instruments only.

Not formal engineering advice.

Not certification.

Not a substitute for qualified professional design, review, testing or statutory approvals.
