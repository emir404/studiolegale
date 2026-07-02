#!/usr/bin/env bash
# Copy-authenticity gate for the built site — catch AI copy-tells before handoff.
# Usage: authenticity-lint.sh [dir ...]     (default: app components)
#
# FAILS (exit 1) on em/en dashes (—/–) in .tsx/.jsx — an AI punctuation tell that
#   should be rewritten with commas/periods (or real client copy).
# WARNS (never fails) on AI-tell marketing phrases, with file:line to fix.
# Scans only client-facing component source. Internal WIKI.md / FEEL.md are not
# site copy and are deliberately never scanned. Prints actionable lines; the run
# only fails on dash hits, so /create must resolve them.
set -u

dirs=("$@")
[ ${#dirs[@]} -gt 0 ] || dirs=(app components)

# collect .tsx/.jsx under the given dirs, skipping build/vendor output
files=()
while IFS= read -r -d '' f; do files+=("$f"); done < <(
  find "${dirs[@]}" \( -name node_modules -o -name .next -o -name dist -o -name build \) -prune -o \
    \( -name '*.tsx' -o -name '*.jsx' \) -type f -print0 2>/dev/null
)

if [ ${#files[@]} -eq 0 ]; then
  echo "[skip] no .tsx/.jsx files under: ${dirs[*]} (nothing to lint yet)"
  exit 0
fi
echo "[info] linting ${#files[@]} file(s) under: ${dirs[*]}"

# --- 1. em/en dashes: hard fail (literal bytes — portable to BSD/macOS grep).
#        Comment-only lines are excluded: the rule is "no dashes in client copy",
#        and code comments (incl. vendored blocks) are not copy. ---
dash_hits=$(grep -nHF -e '—' -e '–' "${files[@]}" 2>/dev/null \
  | grep -vE ':[0-9]+:[[:space:]]*(//|\*|/\*|\{/\*)' || true)
dash_n=0
if [ -n "$dash_hits" ]; then
  dash_n=$(printf '%s\n' "$dash_hits" | grep -c .)
  while IFS= read -r line; do
    echo "[fail] em/en dash (rewrite it): $line"
  done <<< "$dash_hits"
fi

# --- 2. AI-tell phrases: warn only. Patterns dodge apostrophes (straight/curly
#        encode differently) by matching around them. `.` spans hyphen-or-space. ---
phrases='whether you|look no further|in today|elevate your|seamless|unlock|nestled|boasts|in the heart of|testament to|cutting.edge|state.of.the.art|pride ourselves|trusted partner|peace of mind|bustling|dive into|game.chang|treasure trove|when it comes to'
phrase_hits=$(grep -nHiE "$phrases" "${files[@]}" 2>/dev/null || true)
phrase_n=0
if [ -n "$phrase_hits" ]; then
  phrase_n=$(printf '%s\n' "$phrase_hits" | grep -c .)
  while IFS= read -r line; do
    echo "[warn] ai-tell phrase: $line"
  done <<< "$phrase_hits"
fi

echo "[done] $dash_n em/en-dash failure(s), $phrase_n AI-tell warning(s)"
if [ "$dash_n" -gt 0 ]; then
  echo "[fail] resolve the em/en dashes above before shipping."
  exit 1
fi
echo "[ok] no em/en dashes. Review any warnings above."
exit 0
