#!/usr/bin/env node

// data/pref-city-code.csv を読み込んで、
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const args = process.argv.slice(2);

if (!args[0]) {
  console.log('ファイルを指定して下さい');
  process.exit(1);
}

const file = fs.readFileSync(args[0], 'utf8')
const csv = parse(file);
const pref = {};

// csv をループして、都道府県毎に、市区町村コード数を集計する
for (let i = 0; i < csv.length; i++) {
  const code = csv[i][0];
  const prefCode = code.slice(0, 2);

  if (Number.isNaN(Number(prefCode))) {
    continue;
  }

  if (!pref[prefCode]) {
    pref[prefCode] = 0;
  }

  pref[prefCode]++;
}

// csv として出力する
const output = Object.keys(pref).map((key) => {
  return [key, pref[key]];
});

console.log(output.sort().map((row) => row.join(',')).join('\n'));