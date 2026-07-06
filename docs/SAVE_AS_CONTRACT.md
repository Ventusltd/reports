# Browser Save As contract

This repository is static-first. The browser must be able to create useful files without a server.

## Primary path

Use the File System Access API where available:

```js
const handle = await window.showSaveFilePicker({ suggestedName: 'report.json' });
const writable = await handle.createWritable();
await writable.write(blob);
await writable.close();
```

Rules:

- call `showSaveFilePicker()` inside a user gesture
- get the handle before expensive generation work
- write Blob, BufferSource or string to the writable stream
- close to commit
- keep the handle in memory for same-session Save
- optionally store handle in IndexedDB for a later Save after permission is re-granted

## Fallback path

For Firefox, Safari and unsupported browsers use Blob download:

```js
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = filename;
a.click();
URL.revokeObjectURL(url);
```

Rules:

- always revoke object URLs
- assume fallback cannot overwrite in place
- assume fallback cannot report save exceptions reliably
- use same-origin `blob:` URLs for generated outputs

## Storage roles

- localStorage: small preferences only
- IndexedDB: journey state, file handles, structured browser state
- OPFS: future large local working files and DuckDB-Wasm persistence
- user filesystem: final exported evidence and reports

## DuckDB-Wasm future contract

Future Parquet and CSV export should follow:

```js
await conn.send(`COPY (SELECT * FROM result) TO 'result.parquet' (FORMAT parquet)`);
const bytes = await db.copyFileToBuffer('result.parquet');
const blob = new Blob([bytes], { type: 'application/octet-stream' });
await saveBlob(blob, 'result.parquet');
```

Do not commit heavy generated data to this repository.
