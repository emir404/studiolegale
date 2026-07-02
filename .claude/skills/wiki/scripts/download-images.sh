#!/usr/bin/env bash
# Extract and download the most valuable content images referenced by saved HTML.
# Usage: download-images.sh <out-dir> <base-url> <html-file> [more.html ...]
# Sources: <img> src/srcset (any URL — proxies like /_next/image have no
# extension), og:image/twitter:image, plus any *.jpg/png/webp/avif URL.
# Ranking (the point): candidates are scored — og/twitter images, hero/team/
# office keywords, and larger declared dimensions (WxH or w=… hints) rank up;
# thumb/icon/avatar/stock/logo rank down; favicon/sprite/pixel/placeholder are
# dropped. The highest-scoring survive, so a run keeps signature photos, not the
# first 20 in DOM order. Caps: 20 files, 2MB each; non-images and tiny rasters
# (<5KB) / tiny SVGs (<200B) are dropped, extensions corrected from content type.
# Always exits 0.
set -u

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

outdir="${1:?usage: download-images.sh <out-dir> <base-url> <html...>}"
base="${2:?usage: download-images.sh <out-dir> <base-url> <html...>}"
shift 2
[ $# -ge 1 ] || { echo "[skip] no html files given"; exit 0; }

base="${base%/}"
mkdir -p "$outdir"
tmp=$(mktemp); ranked=$(mktemp)
trap 'rm -f "$tmp" "$ranked"' EXIT

# --- collect "KIND<tab>url" candidates (awk adds the tab; BSD sed can't emit \t) ---
for f in "$@"; do
  [ -s "$f" ] || continue
  grep -oiE '<meta[^>]+(og:image|twitter:image)(:src)?"[^>]*>' "$f" 2>/dev/null | \
    grep -oE 'content="[^"]+"' | sed -E 's/^content="//; s/"$//' | awk '{print "OG\t" $0}'
  grep -oE '<img[^>]+>' "$f" 2>/dev/null | grep -oE ' src="[^"]+"' | \
    sed -E 's/^ src="//; s/"$//' | awk '{print "IMG\t" $0}'
  grep -oE '<img[^>]+>' "$f" 2>/dev/null | grep -oE 'srcset="[^"]+"' | \
    sed -E 's/^srcset="//; s/"$//' | awk -F, '{print $NF}' | awk '{print $1}' | awk 'NF{print "IMG\t" $0}'
  grep -oE '(src|content|href)="[^"]+"' "$f" 2>/dev/null | sed -E 's/^[a-z]+="//; s/"$//' | \
    grep -iE '\.(jpe?g|png|webp|avif)([?&#]|$)' | awk '{print "URL\t" $0}'
done > "$tmp"

# --- score + dedupe, then sort by score desc (nawk-safe: match()/RSTART/substr) ---
awk -F'\t' '
{
  kind=$1; u=$2
  if (u=="") next
  gsub(/&amp;/, "\\&", u)
  low=tolower(u)
  if (low ~ /^data:|^blob:/) next
  if (low ~ /favicon|sprite|pixel|emoji|gravatar|apple-touch|1x1|spacer|placeholder|\/badge/) next
  if (low !~ /[a-z]/ && low !~ /\//) next   # pure numbers/junk (e.g. og:image:width content)
  if (u in seen) next
  seen[u]=1
  s = 0
  if (kind == "OG") s += 100
  if (low ~ /hero|banner|cover|team|about|office|staff|people|portrait|founder|studio|workshop|gallery|project/) s += 40
  if (low ~ /thumbnail|[-_]thumb|[-_]icon|\/icon|icon\.|-mock|sample|stock|avatar|default|\/logo|logo\./) s -= 50
  dimw = 0   # largest declared width across the formats sites actually use
  if (match(low, /[0-9][0-9][0-9][0-9]?x[0-9][0-9][0-9][0-9]?/)) {      # 1920x1080
    dim = substr(low, RSTART, RLENGTH); split(dim, wh, "x"); if (wh[1] + 0 > dimw) dimw = wh[1] + 0
  }
  if (match(low, /[?&](w|width|imwidth)=[0-9]+/)) {                     # ?w=1600 (next/image, CDNs)
    q = substr(low, RSTART, RLENGTH); sub(/^.*=/, "", q); if (q + 0 > dimw) dimw = q + 0
  }
  if (match(low, /[0-9][0-9][0-9][0-9]?px/)) {                          # 1280px- (mediawiki, some CMSs)
    q = substr(low, RSTART, RLENGTH); sub(/px.*/, "", q); if (q + 0 > dimw) dimw = q + 0
  }
  s += (dimw > 1200 ? 40 : (dimw > 800 ? 25 : (dimw > 400 ? 10 : 0)))
  printf "%d\t%s\n", s, u
}
' "$tmp" | sort -t"$(printf '\t')" -k1,1 -rn | cut -f2 > "$ranked"

count=0
while IFS= read -r u; do
  [ "$count" -ge 20 ] && break
  case "$u" in
    data:*|blob:*) continue ;;
    //*) u="https:${u}" ;;
    http://*|https://*) ;;
    /*) u="${base}${u}" ;;
    *) u="${base}/${u}" ;;
  esac

  # filename: decode %2F so proxy URLs (e.g. /_next/image?url=...) stay unique
  name=$(printf '%s' "$u" | sed -E 's/%2[Ff]/-/g; s/#.*$//' | awk -F/ '{print $NF}' | tr -cd 'A-Za-z0-9._-' | tail -c 80)
  [ -n "$name" ] || continue
  [ -e "$outdir/$name" ] && continue

  curl -sL --compressed -A "$UA" --connect-timeout 8 --max-time 25 \
    --max-filesize 2097152 -o "$outdir/$name" "$u" 2>/dev/null
  [ -s "$outdir/$name" ] || { rm -f "$outdir/$name"; continue; }

  size=$(wc -c < "$outdir/$name" | tr -d ' ')
  ctype=$(file -b --mime-type "$outdir/$name" 2>/dev/null || echo unknown)
  min=5120
  case "$ctype" in
    image/jpeg) ext=jpg ;;
    image/png) ext=png ;;
    image/webp) ext=webp ;;
    image/avif) ext=avif ;;
    image/gif) ext=gif ;;
    image/svg+xml) ext=svg; min=200 ;;
    text/xml|text/html)
      # SVGs sometimes sniff as xml/html — trust them only with a .svg name
      low=$(printf '%s' "$u" | tr 'A-Z' 'a-z')
      case "$low" in *.svg*) ext=svg; min=200 ;; *) rm -f "$outdir/$name"; continue ;; esac
      ;;
    *) rm -f "$outdir/$name"; continue ;;
  esac
  if [ "$size" -lt "$min" ]; then rm -f "$outdir/$name"; continue; fi

  case "$name" in
    *."$ext") ;;
    *)
      newname="${name%.*}.$ext"
      [ -e "$outdir/$newname" ] && newname="${name%.*}-$count.$ext"
      mv "$outdir/$name" "$outdir/$newname" && name="$newname"
      ;;
  esac

  count=$((count + 1))
  echo "[ok] $name ($size bytes) <- $u"
done < "$ranked"

echo "[done] $count image(s), value-ranked -> $outdir"
