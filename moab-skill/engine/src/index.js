/**
 * MOAB engine — Stage 1 helpers.
 *
 * Deterministic support code for the MOAB skill. LLM reasoning drives the
 * conversation; these helpers enforce the Constitution's mechanical checks
 * (Article 2: consistency / deterministic before probabilistic).
 *
 * Exports:
 *   scanHedging(text, locale)     — Article 4 hedging-term scanner (en + zh-CN)
 *   walkHonestyLadder(idea)       — 6-tier ladder prompt driver (T0–T5)
 *   composeCap(items, cap)        — cap-composition algorithm (U/W queue)
 *   generateVerificationCode()    — sign-off 6-char code
 *   isRangeEstimate(value)        — Article 4a point-vs-range check
 *   checkFirstUseGloss(term, seen) — first-use gloss reflex (mechanical)
 *
 * v1.0.0 — 2026-07-18
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// Article 4 — hedging-term scanner (No Silent Vagueness).
// Every hedging term must resolve to an Article 4a range or an open question.
// ─────────────────────────────────────────────────────────────────────────────

const HEDGING_TERMS_EN = [
  'maybe', 'probably', 'likely', 'might', 'possibly',
  'perhaps', 'could', 'should probably', 'seems like',
  'i think', 'i guess', 'kind of', 'sort of', 'more or less',
  'roughly', 'around', 'somewhat', 'fairly',
];

const HEDGING_TERMS_ZH = [
  '可能', '大概', '或许', '也许', '应该', '估计',
  '似乎', '差不多', '大约', '左右', '看情况',
  '说不定', '八成', '多半',
];

/**
 * @param {string} text
 * @param {'en'|'zh-CN'|'both'} locale — default 'both'
 * @returns {Array<{term: string, index: number, context: string, locale: string}>}
 */
function scanHedging(text, locale = 'both') {
  if (typeof text !== 'string') return [];
  const hits = [];

  // English scan
  if (locale === 'en' || locale === 'both') {
    const lower = text.toLowerCase();
    for (const term of HEDGING_TERMS_EN) {
      let idx = 0;
      while ((idx = lower.indexOf(term, idx)) !== -1) {
        const before = idx === 0 ? ' ' : lower[idx - 1];
        const after = idx + term.length >= lower.length ? ' ' : lower[idx + term.length];
        const isBoundary = /\W/.test(before) && /\W/.test(after);
        if (isBoundary) {
          const contextStart = Math.max(0, idx - 30);
          const contextEnd = Math.min(text.length, idx + term.length + 30);
          hits.push({
            term,
            index: idx,
            context: text.slice(contextStart, contextEnd),
            locale: 'en',
          });
        }
        idx += term.length;
      }
    }
  }

  // zh-CN scan (no word-boundary needed — Chinese has no spaces)
  if (locale === 'zh-CN' || locale === 'both') {
    for (const term of HEDGING_TERMS_ZH) {
      let idx = 0;
      while ((idx = text.indexOf(term, idx)) !== -1) {
        const contextStart = Math.max(0, idx - 15);
        const contextEnd = Math.min(text.length, idx + term.length + 15);
        hits.push({
          term,
          index: idx,
          context: text.slice(contextStart, contextEnd),
          locale: 'zh-CN',
        });
        idx += term.length;
      }
    }
  }

  return hits;
}

// ─────────────────────────────────────────────────────────────────────────────
// Honesty ladder — 6-tier check (T0–T5).
// ─────────────────────────────────────────────────────────────────────────────

const HONESTY_LADDER = [
  { tier: 'T0', name: 'human network', prompt: 'Who in your network might already know this?' },
  { tier: 'T1', name: 'existing service', prompt: 'Does a SaaS/tool already solve this?' },
  { tier: 'T2', name: 'one-shot AI', prompt: 'Is this a one-time question, not a workflow?' },
  { tier: 'T3', name: 'non-AI automation', prompt: 'Is the logic deterministic (script/cron/webhook)?' },
  { tier: 'T4', name: 'manual workflow', prompt: 'Is frequency low enough that manual works?' },
  { tier: 'T5', name: 'AI-powered bot', prompt: 'Only if T0–T4 all fail. Justify each rejection.' },
];

/**
 * @param {string} idea — short description of the user's request
 * @returns {Array<{tier: string, name: string, prompt: string, idea: string}>}
 */
function walkHonestyLadder(idea) {
  return HONESTY_LADDER.map((rung) => ({ ...rung, idea }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Cap-composition algorithm.
// Labels items U (urgent) or W (can wait). Four canonical cases.
// Polar Star / Constitution wins when cap conflicts with Articles.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {Array<{priority: 'U'|'W', content: any}>} items
 * @param {number} cap — default 3
 * @returns {{
 *   ship: Array<{priority: 'U'|'W', content: any}>,
 *   defer: Array<{priority: 'U'|'W', content: any}>,
 *   case: 1|2|3|4,
 *   capBroken: boolean
 * }}
 */
function composeCap(items, cap = 3) {
  if (!Array.isArray(items)) return { ship: [], defer: [], case: 2, capBroken: false };

  const urgent = items.filter(i => i.priority === 'U');
  const waiting = items.filter(i => i.priority === 'W');
  const uCount = urgent.length;
  const wCount = waiting.length;

  // Case 1: more U than cap → cap breaks, all U ship
  if (uCount > cap) {
    return { ship: urgent, defer: waiting, case: 1, capBroken: true };
  }

  // Remaining slots after U claims
  const remaining = cap - uCount;
  const wShip = waiting.slice(0, remaining);
  const wDefer = waiting.slice(remaining);

  // Case 2: no U, all W → cap holds on W
  if (uCount === 0) {
    return { ship: wShip, defer: wDefer, case: 2, capBroken: false };
  }

  // Case 3: U alone fills cap, no room for W
  if (remaining === 0) {
    return { ship: urgent, defer: waiting, case: 3, capBroken: false };
  }

  // Case 4: U claims some, W fills rest
  return { ship: [...urgent, ...wShip], defer: wDefer, case: 4, capBroken: false };
}

// ─────────────────────────────────────────────────────────────────────────────
// Sign-off — 6-character verification code.
// Uppercase alphanumeric, cryptographically random.
// Excludes I/L/O/0/1 for legibility.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @returns {string}
 */
function generateVerificationCode() {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const { randomBytes } = require('crypto');
  const bytes = randomBytes(6);
  let out = '';
  for (let i = 0; i < 6; i++) {
    out += alphabet[bytes[i] % alphabet.length];
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Article 4a — point vs range estimate check.
// Ranges: "3-5 days", "$100-$200", "80%-90%", "3至5天"
// Points: "5 days", "$150", "85%" — violate Article 4a (point-not-range).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {string} value
 * @returns {boolean}
 */
function isRangeEstimate(value) {
  if (typeof value !== 'string') return false;
  const rangePattern = /\d[\d.,]*\s*(?:-|–|—|~|to|至)\s*\d[\d.,]*/i;
  return rangePattern.test(value);
}

// ─────────────────────────────────────────────────────────────────────────────
// First-use gloss — mechanical check (Article 2 compliant, no LLM judgment).
// Maintains a session set; returns whether gloss should fire for this term.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {string} term — canonical term name from dictionary.md (gloss:true entries)
 * @param {Set<string>} seen — mutable set of already-glossed terms this session
 * @returns {boolean} — true = fire gloss (term not yet glossed); false = skip
 */
function checkFirstUseGloss(term, seen) {
  if (!(seen instanceof Set)) return true;
  if (seen.has(term)) return false;
  seen.add(term);
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  scanHedging,
  walkHonestyLadder,
  composeCap,
  generateVerificationCode,
  isRangeEstimate,
  checkFirstUseGloss,
  HEDGING_TERMS_EN,
  HEDGING_TERMS_ZH,
  HONESTY_LADDER,
};
