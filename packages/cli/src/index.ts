import { run } from '@skuflang/compiler';
import { readFile } from 'fs/promises';
import path = require('path');

const filePath = process.argv?.[2];

readFile(path.resolve(process.cwd(), filePath), 'utf-8')
  .then((code) => {
    run(code);
  })
  .catch(() => {
    console.error('Error while reading file');
  });
