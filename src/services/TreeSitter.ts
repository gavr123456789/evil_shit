import Parser = require("web-tree-sitter")
import fs = require('fs')

// const kek = fs.readFileSync('/Users/gavr/Documents/Projects/evil_shit/src/services/FileService.ts','utf8');
// console.log(kek);

(async () => {
  await Parser.init();
  const parser = new Parser();
  // const Lang = await Parser.Language.load('/Users/gavr/Documents/Projects/evil_shit/src/services/wasm/tree-sitter-javascript.wasm');
  // parser.setLanguage(Lang);
  // const tree = parser.parse('let x = 1;');
  // console.log(tree.rootNode.toString());


})();


export const sas = "ssas"
