// cat examplePost.md | node test.js
const parse = require('./index')
let data = ''
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  data += chunk
})
process.stdin.on('end', () => {
  console.log(parse(data))
})
