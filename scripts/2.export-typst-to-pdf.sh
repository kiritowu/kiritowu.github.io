#!/bin/bash

set -euo pipefail

DEFAULT_INPUT="typst/out/WongZhaoWu-resume.typ"

usage() {
  echo "Usage: $0 [input.typ]"
  echo
  echo "Compiles a Typst .typ file to PDF."
  echo
  echo "Arguments:"
  echo "  input.typ   Path to input .typ (default: ${DEFAULT_INPUT})"
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

INPUT="${1:-$DEFAULT_INPUT}"

if [[ ! -f "$INPUT" ]]; then
  echo "Error: input file not found: $INPUT" >&2
  exit 1
fi

typst compile "$INPUT"

echo "$(basename "${INPUT%.typ}.pdf") has been generated!"