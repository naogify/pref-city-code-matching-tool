#!/usr/bin/env node

// data/pref-city-code.csv を読み込んで、

// 引数で指定したファイルの、code を取得して、比較する
// 異なっていれば、出力する

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const file = fs.readFileSync(path.join(__dirname, 'data', 'pref-city-code.csv'), 'utf8')
const csv = parse(file);

const args = process.argv.slice(2);

const file2 = fs.readFileSync(args[0], 'utf8')
const csv2 = parse(file2);

// csv をループして、csv2 の code と一致しなければ、出力する

for (let i = 0; i < csv.length; i++) {
  const code = csv[i][0];

  const found = csv2.find((row) => {
    return row[0] === code;
  });

  if (!found) {
    console.log(`${code}`);
  }
}
