// Consistency checks for loftastodir.html against the exported rental-product list.
// Run: node scripts/test_loftastodir.cjs
// Source of truth: uploaded "loftastoðir - copy.xlsx", Item No. and Item Description 2.
// Price tolerances allow rounding to two decimals in the catalogue.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'loftastodir.html'), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'Expected one inline application script');
const data = vm.runInNewContext(scripts[0][1] +
  '\n({ LOFTASTODIR, MOTABITAR, AUKAHLUTIR, calculateRentalCost })',
  {document: {addEventListener() {}}, console});
const products = [...data.LOFTASTODIR, ...data.MOTABITAR, ...data.AUKAHLUTIR];
const expected = [
['01-MÓT-LM51-033','HA601400',9.95,69.6],
['01-MÓT-LM51-021','HA553690',61.9329,433.5503],
['01-MÓT-LM51-689','HA553689',61.9329,433.5503],
['01-MÓT-LM51-954','FA9169154',103.0083,721.0383],
['01-MÓT-LM51-935','FA8169012C',38.71,270.97],
['01-MÓT-LM51-235','97100235',38.7081,270.9665],
['01-MÓT-LM51-080','97100209',58.07,406.45],
['01-MÓT-LM51-095','97100095',15.48,108.38],
['01-MÓT-LM51-092','97100092',29.0335,203.2248],
['01-MÓT-LM51-913','971000913',38.71,270.97],
['01-MÓT-LM51-091','97100091',38.7081,270.9665],
['01-MÓT-LM51-079','97100079',67.7416,474.1912],
['01-MÓT-LM51-048','97100048',27.10,189.67],
['01-MÓT-LM51-042','97100042',61.9329,433.5503],
['01-MÓT-LM51-041','97100041',15.4832,108.3824],
['01-MÓT-LM51-040','97100040',61.9329,433.5503],
['01-MÓT-LM51-032','97100032',27.10,189.67],
['01-MÓT-LM51-031','97100031',27.1006,189.6742],
['01-MÓT-LM51-029','97100029',19.359,135.483],
['01-MÓT-LM51-028','97100028',19.359,135.483],
['01-MÓT-LM51-027','97100027',15.4832,108.3824],
['01-MÓT-LM51-026','97100026',15.4832,108.3824],
['01-MÓT-LM51-024','97100024',27.1006,189.6742],
['01-MÓT-LM55-025','97100025',15.4832,108.3824],
['01-MÓT-LM71-011',null,8.4,58.8], // "Notað efni" is not a sale item number
['01-MÓT-LM71-992','FA390020L',27.3,191.1],
['01-MÓT-LM71-990','FA290020L',20.3,142.1],
['01-MÓT-LM71-949','153949',34.3,240.1],
['01-MÓT-LM71-939','153939',27.3,191.1],
['01-MÓT-LM71-936','153936',25.2,176.4],
['01-MÓT-LM71-935','153935',21,147],
['01-MÓT-LM71-933','153933',23.1,161.7],
['01-MÓT-LM71-929','153929',20.3,142.1],
['01-MÓT-LM71-926','153926',18.55,129.85],
['01-MÓT-LM71-924','153924',17.15,120.05]
];
assert.equal(products.length, expected.length, 'Wrong number of catalogued products');
const map = new Map(products.map(p => [p.id,p]));
assert.equal(map.size, products.length, 'Duplicate rental item number');
for (const [id,article,day,week] of expected) {
  const p = map.get(id);
  assert.ok(p, 'Missing rental item '+id);
  assert.equal(p.articleNumber ?? null, article, 'Wrong Item Description 2 for '+id);
  assert.ok(Math.abs(p.dayRate-day) <= 0.01, 'Day rate mismatch for '+id);
  assert.ok(Math.abs(p.weekRate-week) <= 0.01, 'Week rate mismatch for '+id);
}
for(const id of ['01-MÓT-LM51-041','01-MÓT-LM51-027','01-MÓT-LM51-026','01-MÓT-LM51-029','01-MÓT-LM51-028']){
  assert.equal(map.get(id).classKey, null, 'Italian standard prop must not have EN 1065 Class: '+id);
  assert.equal(map.get(id).classLabel, null);
}
const faresin=map.get('01-MÓT-LM51-935');
assert.equal(faresin.classKey,'E');
assert.equal(faresin.kN_min,46.73);
assert.equal(faresin.kN_max,32.12);
assert.equal(faresin.weight_kg,23);
assert.equal(faresin.salePrice,19621);
assert.equal(map.get('01-MÓT-LM51-041').kg_max,1480);
assert.equal(map.get('01-MÓT-LM51-029').kg_max,1010);
assert.equal(map.get('01-MÓT-LM51-079').kN_max,null, 'D55 capacity not confirmed');
assert.equal(map.get('01-MÓT-LM51-048').kN_max,null, 'B45 at 480cm is not confirmed');
assert.ok(html.includes('<tr><td>300 cm</td><td>—</td><td>1.071 kg</td>'),
  'Villalta 300 cm handbook row must not show 160/290 capacity');
assert.equal(data.calculateRentalCost(15,108,8,2),432,
  'Preserve the existing rounded-up-to-week pricing rule pending business confirmation');
console.log('OK: '+products.length+' distinct rental items, Item Description 2 and rates, class and capacity flags, price calculation.');
