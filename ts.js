console.log('=====================TS=========================')
const fs = require('fs')

export default function() {
  fs.writeFileSync('./test.txt', 'some data')
  var test = require(`./test.txt`)
}
