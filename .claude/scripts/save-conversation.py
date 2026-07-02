#!/usr/bin/env python3
"""
Save the current Claude Code conversation as a raw, readable transcript.

Invoked by the Stop and SessionEnd hooks (see .claude/settings.json). Reads the
hook JSON on stdin, parses the session transcript it points at, and (re)writes a
markdown file under conversations/ in the project. Runs every time Claude stops,
so the file always reflects the full conversation so far.

Design notes:
- User/assistant TEXT is kept verbatim ("raw"). Tool calls and their outputs are
  truncated (they're reconstructable and bloat the log). Internal "thinking"
  blocks are skipped.
- One file per session, named <date>_<session-id>.md, regenerated in place.
- Never throws: any failure exits 0 silently so it can't disrupt the session.
"""
import sys, os, json, datetime

TOOL_RESULT_MAX = 1200
TOOL_INPUT_MAX = 300


def load_hook_input():
    try:
        return json.loads(sys.stdin.read() or "{}")
    except Exception:
        return {}


def first_field(inp, obj, *keys):
    for k in keys:
        v = obj.get(k)
        if v:
            return v
    return None


def ts_of(o):
    return o.get("timestamp") or ""


def short(s, n):
    s = s.strip()
    return s if len(s) <= n else s[:n].rstrip() + f"\n… [truncated, {len(s)} chars total]"


def tool_input_preview(name, inp):
    if not isinstance(inp, dict):
        return short(str(inp), TOOL_INPUT_MAX)
    for k in ("command", "file_path", "path", "url", "pattern", "query", "prompt", "description"):
        if inp.get(k):
            return f"{k}: {short(str(inp[k]), TOOL_INPUT_MAX)}"
    try:
        return short(json.dumps(inp, ensure_ascii=False), TOOL_INPUT_MAX)
    except Exception:
        return ""


def result_text(content):
    # tool_result content is a string or a list of {type:text,text:...} blocks
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        out = []
        for b in content:
            if isinstance(b, dict) and b.get("type") == "text":
                out.append(b.get("text", ""))
            elif isinstance(b, str):
                out.append(b)
        return "\n".join(out)
    return ""


def render(entries):
    lines = []
    for o in entries:
        etype = o.get("type")
        if etype not in ("user", "assistant"):
            continue
        if o.get("isSidechain"):
            continue
        msg = o.get("message")
        if not isinstance(msg, dict):
            continue
        content = msg.get("content")
        stamp = ts_of(o)

        # Plain string content => a real message.
        if isinstance(content, str):
            if content.strip():
                who = "🧑 User" if etype == "user" else "🤖 Claude"
                lines.append(f"\n## {who}  \n<sub>{stamp}</sub>\n\n{content.strip()}\n")
            continue

        if not isinstance(content, list):
            continue

        texts, tool_uses, tool_results = [], [], []
        for b in content:
            if not isinstance(b, dict):
                continue
            bt = b.get("type")
            if bt == "text" and b.get("text", "").strip():
                texts.append(b["text"].strip())
            elif bt == "tool_use":
                tool_uses.append(b)
            elif bt == "tool_result":
                tool_results.append(b)
            # "thinking" and everything else: skipped

        # Tool results arrive inside a user-role message — render them as results,
        # not as a human turn.
        for r in tool_results:
            body = short(result_text(r.get("content")), TOOL_RESULT_MAX)
            if body.strip():
                lines.append(f"\n> ↩️ **tool result**\n>\n```\n{body}\n```\n")

        if etype == "user" and texts:
            lines.append(f"\n## 🧑 User  \n<sub>{stamp}</sub>\n\n" + "\n\n".join(texts) + "\n")
        elif etype == "assistant":
            if texts:
                lines.append(f"\n## 🤖 Claude  \n<sub>{stamp}</sub>\n\n" + "\n\n".join(texts) + "\n")
            for t in tool_uses:
                name = t.get("name", "?")
                lines.append(f"\n> 🔧 **{name}** — {tool_input_preview(name, t.get('input'))}\n")
    return "\n".join(lines)


def main():
    inp = load_hook_input()
    tpath = inp.get("transcript_path")
    if not tpath or not os.path.isfile(tpath):
        return
    cwd = inp.get("cwd") or os.environ.get("CLAUDE_PROJECT_DIR") or "."
    session_id = inp.get("session_id") or os.path.splitext(os.path.basename(tpath))[0]

    entries = []
    try:
        with open(tpath, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    entries.append(json.loads(line))
                except Exception:
                    continue
    except Exception:
        return
    if not entries:
        return

    first_ts = next((ts_of(o) for o in entries if ts_of(o)), "")
    date = first_ts[:10] or datetime.date.today().isoformat()

    n_user = sum(
        1 for o in entries
        if o.get("type") == "user" and not o.get("isSidechain")
        and (isinstance((o.get("message") or {}).get("content"), str)
             or any(isinstance(b, dict) and b.get("type") == "text"
                    for b in ((o.get("message") or {}).get("content") or [])
                    if isinstance((o.get("message") or {}).get("content"), list)))
    )

    body = render(entries)
    if not body.strip():
        return  # nothing conversational to save (e.g. a tool-only micro-session)
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    header = (
        f"# Conversation — {date}\n\n"
        f"- **Session:** `{session_id}`\n"
        f"- **Project:** {cwd}\n"
        f"- **Started:** {first_ts or 'n/a'}\n"
        f"- **Updated:** {now}\n"
        f"- **User messages:** {n_user}\n\n"
        f"---\n"
    )

    out_dir = os.path.join(cwd, "conversations")
    try:
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, f"{date}_{session_id}.md")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(header + body + "\n")
    except Exception:
        return


if __name__ == "__main__":
    try:
        main()
    except Exception:
        pass
