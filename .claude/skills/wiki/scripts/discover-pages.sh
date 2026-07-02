#!/usr/bin/env bash
# Discover candidate pages for a site: validated sitemap.xml + homepage links
# + (only when discovery is thin) probed common paths.
# Usage: discover-pages.sh <base-url> [homepage.html]
# Prints one same-host URL per line, deduped, homepage first, capped at 40.
# Info/diagnostics go to stderr.
set -u

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

base="${1:?usage: discover-pages.sh <base-url> [homepage.html]}"
home_html="${2:-}"
base="${base%/}"
host=$(printf '%s\n' "$base" | sed -E 's#^https?://##; s#/.*$##')

tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT

EXT_RE='\.(png|jpe?g|gif|svg|webp|avif|ico|pdf|zip|mp4|webm|css|js|json|xml|txt|woff2?)$'
UTIL_RE='/(wp-json|wp-admin|cdn-cgi|cart|checkout|login|signin|signup|register|account|privacy|terms|cookies?|legal|imprint)([/?]|$)'
ARCH_RE='/(tag|tags|category|categories|author|page)/'

# normalize, dedupe, drop binaries + utility/legal/archive paths
filtered() {
  sed -E 's#/+$##' "$tmp" | awk 'NF' | awk '!seen[$0]++' | \
    grep -viE "$EXT_RE" | grep -viE "$UTIL_RE" | grep -viE "$ARCH_RE"
}

echo "$base/" >> "$tmp"

# 1) sitemap.xml — must be real XML: many sites soft-404 it to their homepage
sm=$(curl -sL --compressed -A "$UA" --connect-timeout 8 --max-time 20 "$base/sitemap.xml" 2>/dev/null | head -c 300000)
case "$sm" in
  *"<urlset"*|*"<sitemapindex"*)
    if printf '%s' "$sm" | grep -q "<sitemapindex"; then
      # one level of sitemap-index recursion, first 3 child sitemaps
      printf '%s' "$sm" | grep -oE '<loc>[^<]+</loc>' | sed -E 's#</?loc>##g' | head -3 | \
        while IFS= read -r child; do
          curl -sL --compressed -A "$UA" --connect-timeout 8 --max-time 20 "$child" 2>/dev/null | \
            head -c 300000 | grep -oE '<loc>[^<]+</loc>' | sed -E 's#</?loc>##g'
        done >> "$tmp"
    else
      printf '%s' "$sm" | grep -oE '<loc>[^<]+</loc>' | sed -E 's#</?loc>##g' >> "$tmp"
    fi
    ;;
  *)
    echo "[info] no valid sitemap.xml (missing or soft-404)" >&2
    ;;
esac

# 2) homepage links (same host only)
if [ -n "$home_html" ] && [ -s "$home_html" ]; then
  grep -oE 'href="[^"]+"' "$home_html" | sed -E 's/^href="//; s/"$//; s/[#?].*$//' | \
    while IFS= read -r h; do
      case "$h" in
        ''|javascript:*|mailto:*|tel:*) ;;
        //*) ;;
        /*) echo "$base$h" ;;
        https://$host/*|http://$host/*|https://$host|http://$host) echo "$h" ;;
      esac
    done >> "$tmp"
fi

# 3) common paths — probed only when discovery is thin (SPAs, no sitemap)
found=$(filtered | wc -l | tr -d ' ')
if [ "$found" -lt 8 ]; then
  echo "[info] thin discovery ($found urls) — probing common paths" >&2
  for p in about about-us team people company services products solutions pricing work works portfolio case-studies projects contact careers story; do
    code=$(curl -sL -o /dev/null -A "$UA" --connect-timeout 5 --max-time 10 -w '%{http_code}' "$base/$p" 2>/dev/null)
    case "$code" in
      2*) echo "$base/$p" >> "$tmp" ;;
    esac
  done
fi

filtered | head -40
