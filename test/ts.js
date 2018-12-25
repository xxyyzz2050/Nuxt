//import '@babel/polyfill'
const fs = require('fs')
console.log('============================TS=========================')
function write(file, data, step) {
  if (!step) step = 1
  try {
    fs.writeFileSync(`./${file}.json`, JSON.stringify(data))
    console.log(`write: ${file}: OK`)
  } catch (err) {
    console.log('error:', err)
  }
}

write('keywords', [], 4)
//var keywords = require(`./keywords.json`)
