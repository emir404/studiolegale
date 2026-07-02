#!/usr/bin/env bash
# Fetch one page's raw HTML (follows redirects, browser UA + Accept headers, size-capped).
# Usage: fetch-page.sh <url> <out.html>
# On success prints HTTP_CODE / FINAL_URL / BYTES lines and saves headers to <out>.headers.
# On failure prints a [skip] line and removes the file. Always exits 0 (usage errors aside).
set -u

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

url="${1:?usage: fetch-page.sh <url> <out.html>}"
out="${2:?usage: fetch-page.sh <url> <out.html>}"

mkdir -p "$(dirname "$out")"

meta=$(curl -sL --compressed \
  -A "$UA" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-US,en;q=0.9" \
  --connect-timeout 10 --max-time 40 --retry 1 \
  --max-filesize 3145728 \
  -D "${out}.headers" \
  -o "$out" \
  -w '%{http_code} %{url_effective}' \
  "$url" 2>/dev/null)
rc=$?

code="${meta%% *}"
final="${meta#* }"

if [ $rc -ne 0 ] || [ ! -s "$out" ]; then
  echo "[skip] fetch failed (curl exit $rc, http ${code:-n/a}): $url"
  rm -f "$out" "${out}.headers"
  exit 0
fi

case "$code" in
  2*) ;;
  *)
    echo "[skip] http $code: $url"
    rm -f "$out"
    exit 0
    ;;
esac

bytes=$(wc -c < "$out" | tr -d ' ')
echo "HTTP_CODE $code"
echo "FINAL_URL $final"
echo "BYTES $bytes"
echo "[ok] $url -> $out"
