// Verifies item numbers, price-free outputs, classification and BYKO links.
// Run: node scripts/test_loftastodir.cjs
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','loftastodir.html'),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length,1,'Exactly one inline app script expected');
const document={
  addEventListener() {},
  getElementById(id){return {value: id==='ls-qty-0' ? '2' : '0'};}
};
const data=vm.runInNewContext(scripts[0][1]+
  '\n({LOFTASTODIR,MOTABITAR,AUKAHLUTIR,selectedProducts,productLink,escapeHTML})',
  {document,console});
const products=[...data.LOFTASTODIR,...data.MOTABITAR,...data.AUKAHLUTIR];
const expected=[
  [
    "01-MÓT-LM51-033",
    "HA601400"
  ],
  [
    "01-MÓT-LM51-021",
    "HA553690"
  ],
  [
    "01-MÓT-LM51-689",
    "HA553689"
  ],
  [
    "01-MÓT-LM51-954",
    "FA9169154"
  ],
  [
    "01-MÓT-LM51-935",
    "FA8169012C"
  ],
  [
    "01-MÓT-LM51-235",
    "97100235"
  ],
  [
    "01-MÓT-LM51-080",
    "97100209"
  ],
  [
    "01-MÓT-LM51-095",
    "97100095"
  ],
  [
    "01-MÓT-LM51-092",
    "97100092"
  ],
  [
    "01-MÓT-LM51-913",
    "971000913"
  ],
  [
    "01-MÓT-LM51-091",
    "97100091"
  ],
  [
    "01-MÓT-LM51-079",
    "97100079"
  ],
  [
    "01-MÓT-LM51-042",
    "97100042"
  ],
  [
    "01-MÓT-LM51-041",
    "97100041"
  ],
  [
    "01-MÓT-LM51-040",
    "97100040"
  ],
  [
    "01-MÓT-LM51-032",
    "97100032"
  ],
  [
    "01-MÓT-LM51-031",
    "97100031"
  ],
  [
    "01-MÓT-LM51-029",
    "97100029"
  ],
  [
    "01-MÓT-LM51-028",
    "97100028"
  ],
  [
    "01-MÓT-LM51-027",
    "97100027"
  ],
  [
    "01-MÓT-LM51-026",
    "97100026"
  ],
  [
    "01-MÓT-LM51-024",
    "97100024"
  ],
  [
    "01-MÓT-LM55-025",
    "97100025"
  ],
  [
    "01-MÓT-LM71-011",
    null
  ],
  [
    "01-MÓT-LM71-992",
    "FA390020L"
  ],
  [
    "01-MÓT-LM71-990",
    "FA290020L"
  ],
  [
    "01-MÓT-LM71-949",
    "153949"
  ],
  [
    "01-MÓT-LM71-939",
    "153939"
  ],
  [
    "01-MÓT-LM71-936",
    "153936"
  ],
  [
    "01-MÓT-LM71-935",
    "153935"
  ],
  [
    "01-MÓT-LM71-933",
    "153933"
  ],
  [
    "01-MÓT-LM71-929",
    "153929"
  ],
  [
    "01-MÓT-LM71-926",
    "153926"
  ],
  [
    "01-MÓT-LM71-924",
    "153924"
  ]
];
assert.equal(products.length,34,'Expected 34 entries after removing B45');
assert.equal(products.length,expected.length);
const byId=new Map(products.map(x=>[x.id,x]));
assert.equal(byId.size,products.length,'Duplicate rental item number');
for(const [id,article] of expected){
 const p=byId.get(id);assert.ok(p,'Missing '+id);
 assert.equal(p.articleNumber??null,article,'Wrong Item Description 2 for '+id);
 for(const property of ['dayRate','weekRate','salePrice']) {
   assert.equal(Object.hasOwn(p,property),false,'Price property in '+id);
 }
}
assert.doesNotMatch(html,/dayRate|weekRate|salePrice|calculateRentalCost/i,'Obsolete pricing logic present');
assert.doesNotMatch(html,/Leiguverð|Söluverð|Afsláttur/,'Price UI strings present');
for(const id of ['01-MÓT-LM51-041','01-MÓT-LM51-027','01-MÓT-LM51-026','01-MÓT-LM51-029','01-MÓT-LM51-028']){
 assert.equal(byId.get(id).classKey,null,'Italian prop has Class: '+id);
}
const faresin=byId.get('01-MÓT-LM51-935');
assert.equal(faresin.classKey,'E');
assert.equal(faresin.kN_max,32.12);
assert.equal(faresin.weight_kg,23);
assert.equal(byId.get('01-MÓT-LM51-079').kN_max,20);
assert.equal(byId.has('01-MÓT-LM51-048'),false);
assert.equal(data.productLink(faresin,'ls').direct,true);
assert.equal(data.productLink(faresin,'ls').url,
 'https://byko.is/leiguvara/faresin-loftastodir-e35-200350-galv-464540');
assert.equal(data.productLink(byId.get('01-MÓT-LM51-079'),'ls').direct,false);
assert.ok(data.productLink(byId.get('01-MÓT-LM51-079'),'ls').url.includes('/undirslattarefni'));
for(const [prefix,productsInGroup] of [['ls',data.LOFTASTODIR],['mb',data.MOTABITAR],['ak',data.AUKAHLUTIR]]){
 for(const p of productsInGroup){
  const link=data.productLink(p,prefix);
  assert.equal(new URL(link.url).hostname,'byko.is','Non-BYKO link');
 }
}
const chosen=data.selectedProducts();
assert.equal(chosen.length,1);
assert.equal(chosen[0].qty,2);
assert.equal(chosen[0].p.id,data.LOFTASTODIR[0].id);
assert.equal(data.escapeHTML('<a>&'), '&lt;a&gt;&amp;');
assert.ok(html.includes('Efnislisti — Loftastoðir'));
assert.ok(html.includes('id="summary-types"'));
console.log('OK: 34 items, no prices, verified BYKO links, classification, selected quantities and exports.');
