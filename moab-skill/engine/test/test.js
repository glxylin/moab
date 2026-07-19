/**
 * MOAB engine — smoke tests (v1.0.0).
 * Run: node engine/test/test.js
 * Expected: 10 passed, 0 failed.
 *
 * Tests cover all 6 exports:
 *   1. scanHedging (en)
 *   2. scanHedging (zh-CN)
 *   3. walkHonestyLadder
 *   4. composeCap — case 1 (cap breaks)
 *   5. composeCap — case 2 (W only, cap holds)
 *   6. composeCap — case 3 (U fills cap)
 *   7. composeCap — case 4 (U + W mixed)
 *   8. generateVerificationCode
 *   9. isRangeEstimate
 *  10. checkFirstUseGloss
 */

'use strict';

const {
  scanHedging,
  walkHonestyLadder,
  composeCap,
  generateVerificationCode,
  isRangeEstimate,
  checkFirstUseGloss,
} = require('../src/index');

let pass = 0;
let fail = 0;

function assert(cond, msg) {
  if (cond) { pass++; console.log('  \u2713', msg); }
  else { fail++; console.log('  \u2717', msg); }
}

console.log('MOAB engine smoke tests (v1.0.0)');
console.log('\u2500'.repeat(60));

// 1. Article 4 hedging scan — English
{
  const text = 'This will probably take around 3 days, maybe more.';
  const hits = scanHedging(text, 'en');
  assert(hits.length >= 2, '1. scanHedging(en) finds multiple hedging terms');
}

// 2. Article 4 hedging scan — zh-CN
{
  const text = '这个功能大概需要3到5天，可能还要更久。';
  const hits = scanHedging(text, 'zh-CN');
  assert(hits.length >= 2 && hits.every(h => h.locale === 'zh-CN'),
    '2. scanHedging(zh-CN) finds Chinese hedging terms');
}

// 3. 6-tier ladder shape
{
  const ladder = walkHonestyLadder('Daily briefing bot');
  assert(ladder.length === 6 && ladder[0].tier === 'T0' && ladder[5].tier === 'T5',
    '3. walkHonestyLadder returns 6 tiers T0\u2013T5');
}

// 4. Cap-composition — case 1: 4U, cap=3 → cap breaks
{
  const items = [
    { priority: 'U', content: 'a' },
    { priority: 'U', content: 'b' },
    { priority: 'U', content: 'c' },
    { priority: 'U', content: 'd' },
  ];
  const result = composeCap(items, 3);
  assert(result.case === 1 && result.capBroken && result.ship.length === 4,
    '4. composeCap case 1: 4U \u2192 cap breaks, all ship');
}

// 5. Cap-composition — case 2: 4W, cap=3 → top 3 ship
{
  const items = [
    { priority: 'W', content: 'a' },
    { priority: 'W', content: 'b' },
    { priority: 'W', content: 'c' },
    { priority: 'W', content: 'd' },
  ];
  const result = composeCap(items, 3);
  assert(result.case === 2 && !result.capBroken && result.ship.length === 3 && result.defer.length === 1,
    '5. composeCap case 2: 4W \u2192 cap holds, 3 ship, 1 deferred');
}

// 6. Cap-composition — case 3: 3U+1W, cap=3 → U fills cap, W deferred
{
  const items = [
    { priority: 'U', content: 'a' },
    { priority: 'U', content: 'b' },
    { priority: 'U', content: 'c' },
    { priority: 'W', content: 'd' },
  ];
  const result = composeCap(items, 3);
  assert(result.case === 3 && result.ship.length === 3 && result.defer.length === 1
    && result.defer[0].priority === 'W',
    '6. composeCap case 3: 3U+1W \u2192 3U ship, W deferred');
}

// 7. Cap-composition — case 4: 1U+3W, cap=3 → 1U+2W ship, 1W deferred
{
  const items = [
    { priority: 'U', content: 'a' },
    { priority: 'W', content: 'b' },
    { priority: 'W', content: 'c' },
    { priority: 'W', content: 'd' },
  ];
  const result = composeCap(items, 3);
  assert(result.case === 4 && result.ship.length === 3 && result.defer.length === 1,
    '7. composeCap case 4: 1U+3W \u2192 1U+2W ship, 1W deferred');
}

// 8. Verification code
{
  const code = generateVerificationCode();
  assert(/^[A-Z2-9]{6}$/.test(code), '8. generateVerificationCode: 6 chars, no I/L/O/0/1');
}

// 9. Article 4a range check
{
  const rangeOK = isRangeEstimate('3-5 days');
  const rangeZh = isRangeEstimate('3至5天');
  const pointBad = isRangeEstimate('5 days');
  assert(rangeOK && rangeZh && !pointBad,
    '9. isRangeEstimate: "3-5 days" ok, "3\u81f35\u5929" ok, "5 days" not a range');
}

// 10. First-use gloss check
{
  const seen = new Set();
  const first = checkFirstUseGloss('Polar Star', seen);
  const second = checkFirstUseGloss('Polar Star', seen);
  const other = checkFirstUseGloss('Constitution', seen);
  assert(first === true && second === false && other === true,
    '10. checkFirstUseGloss: fires once per term per session');
}

console.log('\u2500'.repeat(60));
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
