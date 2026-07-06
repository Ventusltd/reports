# DuckDB-Wasm Export Contract

This is a future contract. It documents the intended data path without adding heavy datasets to this repository.

## Principle

DuckDB-Wasm may later become the browser-local query layer for large CSV and Parquet data.

The Save As layer remains separate.

DuckDB produces bytes.

Save As writes bytes.

## Expected export pattern

```js
const conn = await db.connect();
await conn.send(`COPY (SELECT * FROM evidence_view) TO 'evidence.csv' (FORMAT csv)`);
const bytes = await db.copyFileToBuffer('evidence.csv');
const blob = new Blob([bytes], { type: 'text/csv' });
await saveReportBlob(blob, 'evidence.csv');
await conn.close();
```

For Parquet:

```js
await conn.send(`COPY (SELECT * FROM evidence_view) TO 'evidence.parquet' (FORMAT parquet)`);
const bytes = await db.copyFileToBuffer('evidence.parquet');
const blob = new Blob([bytes], { type: 'application/octet-stream' });
await saveReportBlob(blob, 'evidence.parquet');
```

## OPFS role

OPFS is future local working storage.

It is not the user's visible filesystem.

A user-visible export still needs Save As or Blob fallback.

## Constraints

- avoid giant in-memory blobs for large exports
- use chunked writes where possible
- monitor storage with `navigator.storage.estimate()`
- request persistence with `navigator.storage.persist()` only when justified
- expect GitHub Pages to be single-threaded for DuckDB-Wasm unless cross-origin isolation is solved elsewhere

## Phase status

Contract only.

No heavy Parquet data.

No browser dependency installed yet.
