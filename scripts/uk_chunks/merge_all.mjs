import fs from "fs";
var k = JSON.parse(fs.readFileSync("src/data/koans.json","utf8"));
var results = [];
results = results.concat(JSON.parse(fs.readFileSync("scripts/uk_chunks/chunk_result_0.json","utf8")).translations);
results = results.concat(JSON.parse(fs.readFileSync("scripts/uk_chunks/chunk_result_1.json","utf8")).translations);
results = results.concat(JSON.parse(fs.readFileSync("scripts/uk_chunks/chunk_result_2.json","utf8")).translations);
results = results.concat(JSON.parse(fs.readFileSync("scripts/uk_chunks/chunk_result_3.json","utf8")).translations);
results = results.concat(JSON.parse(fs.readFileSync("scripts/uk_chunks/chunk_result_4.json","utf8")).translations);
results = results.concat(JSON.parse(fs.readFileSync("scripts/uk_chunks/chunk_result_5.json","utf8")).translations);
results = results.concat(JSON.parse(fs.readFileSync("scripts/uk_chunks/chunk_result_6.json","utf8")).translations);
results = results.concat(JSON.parse(fs.readFileSync("scripts/uk_chunks/chunk_result_7.json","utf8")).translations);

var merged = 0;
results.forEach(function(r){
  var idx = k.findIndex(function(x){return (x.id||x.slug) === r.id;});
  if (idx >= 0) {
    if (!k[idx].title) k[idx].title = {};
    if (!k[idx].text) k[idx].text = {};
    k[idx].title.uk = r.title_uk;
    k[idx].text.uk = r.text_uk;
    merged++;
  }
});

console.log("Merged:", merged);
var st=k.filter(function(x){return x.text&&typeof x.text.uk==="string"&&x.text.uk.length>0}).length;
console.log("Total uk:", st, "/", k.length);
fs.writeFileSync("src/data/koans.json", JSON.stringify(k, null, 2), "utf8");
