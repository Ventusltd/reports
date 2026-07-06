const evidence = {
  id: 'EV-SYN-001',
  evidence_class: 'synthetic',
  title: 'Synthetic site note',
  summary: 'Public synthetic example used to test report instrumentation.',
  source_application: 'reports/studio',
  source_kind: 'synthetic',
  source_uri: 'studio/index.html',
  created_at: new Date().toISOString(),
  kernel_registry_version: null,
  content_hash: 'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  confidence_state: 'screening',
  verification_state: 'synthetic',
  public_publishable: true,
  disclaimer_strength: 'screening',
  tags: ['synthetic', 'screening', 'example'],
  data: {
    output_tiers: ['json', 'csv', 'txt', 'html']
  }
};

const disclaimer = 'This is a synthetic screening example only. It is not engineering advice, certification, approval, bankability confirmation or a substitute for qualified professional review.';

document.getElementById('evidence').textContent = JSON.stringify(evidence, null, 2);

document.querySelectorAll('button[data-format]').forEach((button) => {
  button.addEventListener('click', async () => {
    const format = button.dataset.format;
    const output = buildOutput(format);
    await window.GlobalGrid2050Save.saveReportBlob(
      window.GlobalGrid2050Save.textBlob(output.content, output.type),
      output.filename
    );
  });
});

function buildOutput(format) {
  if (format === 'json') {
    return {
      filename: 'evidence-pack.json',
      type: 'application/json;charset=utf-8',
      content: JSON.stringify({ evidence: [evidence], disclaimer }, null, 2)
    };
  }

  if (format === 'csv') {
    const header = 'id,evidence_class,title,source_application,confidence_state,verification_state,public_publishable\n';
    const row = [
      evidence.id,
      evidence.evidence_class,
      evidence.title,
      evidence.source_application,
      evidence.confidence_state,
      evidence.verification_state,
      evidence.public_publishable
    ].map(csvCell).join(',') + '\n';
    return { filename: 'evidence.csv', type: 'text/csv;charset=utf-8', content: header + row };
  }

  if (format === 'txt') {
    return {
      filename: 'note.txt',
      type: 'text/plain;charset=utf-8',
      content: `GlobalGrid2050 Reports Note\n\n${evidence.title}\n${evidence.summary}\n\nStatus: ${evidence.confidence_state}\nSource badge: ${evidence.verification_state}\n\n${disclaimer}\n`
    };
  }

  if (format === 'html') {
    return {
      filename: 'report.html',
      type: 'text/html;charset=utf-8',
      content: `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(evidence.title)}</title></head><body><h1>${escapeHtml(evidence.title)}</h1><p>${escapeHtml(evidence.summary)}</p><p><strong>Status:</strong> ${escapeHtml(evidence.confidence_state)}</p><p><strong>Source badge:</strong> ${escapeHtml(evidence.verification_state)}</p><hr><p>${escapeHtml(disclaimer)}</p></body></html>`
    };
  }

  throw new Error(`Unsupported format: ${format}`);
}

function csvCell(value) {
  return '"' + String(value).replaceAll('"', '""') + '"';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
