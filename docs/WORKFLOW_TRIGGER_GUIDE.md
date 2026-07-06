# Workflow trigger guide

Run workflows manually from GitHub Actions. Do not extend the repo until the previous workflow output has been reviewed.

## Trigger 1: Validate report schemas

Workflow: `Validate report schemas`

Purpose:

- validates `schemas/evidence.schema.json`
- validates `schemas/report-dna.schema.json`
- validates `schemas/journey.schema.json`
- validates synthetic example JSON files

Expected result:

- workflow passes
- schema validation log shows every example is valid

## Trigger 2: Build example evidence pack

Workflow: `Build example evidence pack`

Purpose:

- builds synthetic JSON, CSV, TXT and HTML outputs
- writes generated files into workflow artifact output
- proves one evidence model can render multiple formats

Expected result:

- artifact contains `evidence-pack.json`, `evidence.csv`, `note.txt`, `report.html`, `report-dna.json`

## Trigger 3: Validate Save As contract

Workflow: `Validate Save As contract`

Purpose:

- checks that browser export documentation includes File System Access API primary path
- checks Blob download fallback is present
- checks object URL revocation is documented
- checks localStorage is not treated as large-data storage

Expected result:

- contract passes text assertions

## Trigger 4: Build browser report studio

Workflow: `Build browser report studio`

Purpose:

- validates static HTML and JavaScript files exist
- packages `studio/` as an artifact for inspection

Expected result:

- artifact contains the static studio prototype

## Trigger 5: Validate journey JSON contract

Workflow: `Validate journey JSON contract`

Purpose:

- validates journey example against journey schema
- confirms journey entries retain evidence references and provenance fields

Expected result:

- journey example validates

## Trigger 6: Audit report DNA outputs

Workflow: `Audit report DNA outputs`

Purpose:

- checks generated outputs are represented in report DNA
- checks disclaimer and screening status exist
- checks source badges exist

Expected result:

- report DNA audit passes

## Operating rule

Trigger, inspect, then extend. This repository should grow by evidence, not by blind code sprawl.
