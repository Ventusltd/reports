# Browser Save As Contract

This contract defines the first public export pattern for GlobalGrid2050 Reports.

## Primary path

Use the File System Access API when available.

```js
async function saveAsPrimary(blob, suggestedName) {
  const handle = await window.showSaveFilePicker({ suggestedName });
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
  return handle;
}
```

Rules:

- call `showSaveFilePicker` from a user gesture
- get the file handle before heavy export work
- store handles in IndexedDB only after explicit user action
- request permission again after reload when needed
- use HTTPS origins

## Fallback path

Use Blob download when File System Access API is unavailable.

```js
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
```

Rules:

- always call `URL.revokeObjectURL`
- treat fallback as download only, not true overwrite
- do not claim Firefox or Safari support true disk picker save

## Storage doctrine

Do not use `localStorage` for datasets, reports or large exports.

Use:

- in memory for small transient evidence
- IndexedDB for journey and handles
- OPFS for future browser-local working files
- user-selected Save As for owned outputs

The often-quoted 10 MiB limit applies to Web Storage, not IndexedDB or OPFS.

## Required export formats

The first report studio must support:

- JSON evidence pack
- CSV evidence export
- TXT plain note
- HTML report

Future formats:

- Markdown
- PDF via browser print stylesheet
- Parquet via DuckDB-Wasm
- DOCX as later derived output
