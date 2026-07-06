# Report Instrumentation Doctrine

Reports is not a PDF generator.

Reports is the evidence, Save As and output layer for GlobalGrid2050.

## Core claim

The atomic unit is evidence.

A report is a view over evidence.

A rendered document is an output projection.

## Evidence first

Every evidence object must carry:

- stable id
- evidence class
- title
- source application
- source dataset or user input reference
- timestamp
- hash or content fingerprint
- confidence state
- verification state
- public publishability flag
- disclaimer strength

## Required output tiers

Every useful instrument should be able to emit at least:

- CSV
- plain text
- JSON
- HTML

PDF and DOCX can come later as derived formats.

## Honesty rules

Use direct states such as:

- screening
- snapshot
- live
- verified
- user supplied
- synthetic
- unread
- not certified

Do not use reassuring language such as certified, approved, bankable or compliant unless a qualified process has actually produced that state.

## Confidentiality rule

This public repository contains open instruments, schemas, synthetic examples and documentation.

It must not contain confidential client reports, private correspondence, real customer personal data, unpublished project details or non-public commercial terms.

## Browser-first rule

The first implementation target is a static browser environment.

The browser is the user-space runtime.

The user's filesystem is the persistence layer.

Git is the long-term memory layer.

## Registry integration rule

Reports should eventually become nodes in the GlobalGrid2050 registry graph.

A report node should link to:

- source apps
- source datasets
- generated files
- report DNA manifest
- template pack
- journey file
- source evidence

The first implementation does this by manifest convention, not by a separate graph database.
