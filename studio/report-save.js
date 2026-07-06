async function saveReportBlob(blob, suggestedName) {
  if ('showSaveFilePicker' in window) {
    const handle = await window.showSaveFilePicker({ suggestedName });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return { method: 'file-system-access-api', filename: suggestedName };
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = suggestedName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return { method: 'blob-download-fallback', filename: suggestedName };
}

function textBlob(text, type) {
  return new Blob([text], { type: type || 'text/plain;charset=utf-8' });
}

window.GlobalGrid2050Save = { saveReportBlob, textBlob };
