#!/usr/bin/env node
// Sync reference/*.md into each term README, and optionally lint the README format.
//
// Usage (run from repo root):
//   node .claude/skills/write-wiki/scripts/sync-references.mjs                  # all terms
//   node .claude/skills/write-wiki/scripts/sync-references.mjs terms/development/mcp
//   node .claude/skills/write-wiki/scripts/sync-references.mjs --check [paths]  # lint only, no writes
//
// Exit code 1 when --check finds problems.

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, basename, dirname } from "node:path";

const START = "<!-- references:start -->";
const END = "<!-- references:end -->";
const REQUIRED_KEYS = ["title", "category", "status", "updated"];
const REQUIRED_HEADINGS = ["요약", "왜 필요한가", "어떻게 동작하나", "예시", "관련 용어", "참고 자료"];
const STATUSES = ["draft", "reviewed"];
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const args = process.argv.slice(2);
const check = args.includes("--check");
const targets = args.filter((a) => !a.startsWith("--"));

function isDir(p) {
  return existsSync(p) && statSync(p).isDirectory();
}

function findTermDirs() {
  const root = "terms";
  if (!isDir(root)) return [];
  const dirs = [];
  for (const cat of readdirSync(root)) {
    const catPath = join(root, cat);
    if (!isDir(catPath)) continue;
    for (const kw of readdirSync(catPath)) {
      const kwPath = join(catPath, kw);
      if (isDir(kwPath) && existsSync(join(kwPath, "README.md"))) dirs.push(kwPath);
    }
  }
  return dirs;
}

function parseFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
  }
  return { data, body: text.slice(m[0].length) };
}

// "[a/b, c/d]" -> ["a/b", "c/d"]; empty or missing -> []
function parseList(value) {
  const inner = (value || "").replace(/^\[|\]$/g, "").trim();
  return inner ? inner.split(",").map((s) => s.trim()).filter(Boolean) : [];
}

function termId(dir) {
  return `${basename(dirname(dir))}/${basename(dir)}`;
}

// id -> { prev, next } for every registered term
function loadLinkIndex() {
  const index = new Map();
  for (const dir of findTermDirs()) {
    const { data } = parseFrontMatter(readFileSync(join(dir, "README.md"), "utf8"));
    index.set(termId(dir), { prev: parseList(data.prev), next: parseList(data.next) });
  }
  return index;
}

function hasCycle(start, index) {
  const visiting = new Set();
  const visit = (id) => {
    if (id === start && visiting.size) return true;
    if (visiting.has(id) || !index.has(id)) return false;
    visiting.add(id);
    const found = index.get(id).next.some(visit);
    visiting.delete(id);
    return found;
  };
  return visit(start);
}

function lintLinks(dir, data, index) {
  const problems = [];
  const self = termId(dir);
  const links = { prev: parseList(data.prev), next: parseList(data.next) };
  const opposite = { prev: "next", next: "prev" };
  for (const field of ["prev", "next"]) {
    for (const ref of links[field]) {
      if (ref === self) problems.push(`${field} 에 자기 자신(${ref})이 있습니다`);
      else if (!index.has(ref)) problems.push(`${field} '${ref}' 용어가 terms/ 에 없습니다`);
      else if (!index.get(ref)[opposite[field]].includes(self))
        problems.push(`${field} '${ref}' 의 ${opposite[field]} 에 '${self}' 가 없습니다 (양방향 불일치)`);
    }
  }
  if (index.has(self) && hasCycle(self, index)) problems.push("next 방향으로 순환이 있습니다 (선행→후속은 단방향이어야 함)");
  return problems;
}

function describeReference(file) {
  const { data, body } = parseFrontMatter(readFileSync(file, "utf8"));
  const h1 = body.match(/^#\s+(.+)$/m);
  const title = data.title || (h1 && h1[1].trim()) || basename(file, ".md");
  return { title, description: data.description || "" };
}

function buildList(dir) {
  const refDir = join(dir, "reference");
  const files = isDir(refDir)
    ? readdirSync(refDir).filter((f) => f.endsWith(".md")).sort()
    : [];
  if (files.length === 0) return "_아직 등록된 레퍼런스가 없습니다._";
  return files
    .map((f) => {
      const { title, description } = describeReference(join(refDir, f));
      return `- [${title}](reference/${f})${description ? ` — ${description}` : ""}`;
    })
    .join("\n");
}

function sync(dir) {
  const readme = join(dir, "README.md");
  let text = readFileSync(readme, "utf8");
  const block = `${START}\n${buildList(dir)}\n${END}`;
  let next;
  if (text.includes(START) && text.includes(END)) {
    next = text.replace(new RegExp(`${START}[\\s\\S]*?${END}`), () => block);
  } else if (/^## 참고 자료\s*$/m.test(text)) {
    next = text.replace(/^## 참고 자료[ \t]*$/m, () => `## 참고 자료\n\n${block}`);
  } else {
    next = `${text.replace(/\s*$/, "")}\n\n## 참고 자료\n\n${block}\n`;
  }
  if (next !== text) {
    writeFileSync(readme, next);
    return true;
  }
  return false;
}

function lint(dir, index) {
  const problems = [];
  const text = readFileSync(join(dir, "README.md"), "utf8");
  const { data, body } = parseFrontMatter(text);
  const keyword = basename(dir);
  const category = basename(dirname(dir));

  if (!KEBAB.test(keyword)) problems.push(`폴더명 '${keyword}' 은 kebab-case 소문자여야 합니다`);
  for (const k of REQUIRED_KEYS) if (!data[k]) problems.push(`front matter '${k}' 누락`);
  if (data.category && data.category !== category)
    problems.push(`front matter category '${data.category}' 가 폴더 '${category}' 와 다릅니다`);
  if (data.status && !STATUSES.includes(data.status))
    problems.push(`status 는 ${STATUSES.join(" | ")} 중 하나여야 합니다`);
  if (!/^# .+/m.test(body)) problems.push("H1 제목 누락");
  if (!/^> .+/m.test(body)) problems.push("한 줄 정의(> 인용문) 누락");
  const headings = [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  for (const h of REQUIRED_HEADINGS) if (!headings.includes(h)) problems.push(`'## ${h}' 섹션 누락`);
  if (!text.includes(START) || !text.includes(END)) problems.push("references 마커 누락");
  problems.push(...lintLinks(dir, data, index));
  return problems;
}

const dirs = targets.length ? targets.map((t) => t.replace(/\/$/, "")) : findTermDirs();
if (dirs.length === 0) {
  console.log("대상 용어 폴더가 없습니다.");
  process.exit(0);
}

const linkIndex = check ? loadLinkIndex() : null;
let failed = false;
for (const dir of dirs) {
  if (!existsSync(join(dir, "README.md"))) {
    console.log(`SKIP ${dir} (README.md 없음)`);
    failed = true;
    continue;
  }
  if (check) {
    const problems = lint(dir, linkIndex);
    if (problems.length) {
      failed = true;
      console.log(`FAIL ${dir}\n${problems.map((p) => `  - ${p}`).join("\n")}`);
    } else {
      console.log(`OK   ${dir}`);
    }
  } else {
    console.log(`${sync(dir) ? "UPDATED" : "UNCHANGED"} ${dir}`);
  }
}
process.exit(failed ? 1 : 0);
