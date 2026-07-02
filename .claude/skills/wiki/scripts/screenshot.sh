#!/usr/bin/env bash
# Screenshot via Playwright — best-effort, never fails the pipeline.
# Usage: screenshot.sh <url> <out.png> [viewport] [--fold]
#   viewport  WIDTH,HEIGHT (default 1440,900)
#   --fold    above-the-fold only (default is --full-page)
# Installs chromium on first use if missing; prints [skip] if it can't run.
set -u

url="${1:?usage: screenshot.sh <url> <out.png> [viewport] [--fold]}"
out="${2:?usage: screenshot.sh <url> <out.png> [viewport] [--fold]}"
viewport="${3:-1440,900}"
mode="${4:-}"

mkdir -p "$(dirname "$out")"

args="--viewport-size=$viewport --wait-for-timeout=3500"
[ "$mode" = "--fold" ] || args="$args --full-page"

shot() {
  # shellcheck disable=SC2086
  npx -y playwright screenshot $args "$url" "$out" 2>&1
}

log=$(shot)
if [ ! -s "$out" ]; then
  case "$log" in
    *"playwright install"*|*"Executable doesn't exist"*|*"browserType.launch"*)
      echo "[info] installing chromium for playwright (one-time, ~130MB)..."
      npx -y playwright install chromium >/dev/null 2>&1
      log=$(shot)
      ;;
  esac
fi

if [ -s "$out" ]; then
  echo "[ok] $out"
else
  echo "[skip] screenshot failed: $url"
  printf '%s\n' "$log" | tail -4
fi
exit 0
