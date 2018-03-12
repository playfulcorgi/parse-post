const matter = require('gray-matter')
const DocumentParseError = (message) => {
  this.name = 'DocumentParseError'
  this.message = message
  this.stack = (new Error()).stack
}
DocumentParseError.prototype = new Error
const parsePost = (post) => {
	const documentBody = post
	let parsedDocument = {}

	if(typeof documentBody !== 'string'){
		parsedDocument.title = null
		parsedDocument.permalink = null
		parsedDocument.date = null
		parsedDocument.excerpt = null
		parsedDocument.content = ''
		return parsedDocument
	}
  const parsedMatter = matter(
    documentBody,
    {
      excerpt: true,
      excerpt_separator: '<!-- more -->'
    }
  )
  console.log(`Parsed matter is ${JSON.stringify(parsedMatter)}.`)
  try{
    if(typeof parsedMatter.data.title !== 'string'){
      parsedDocument.title = null
    }else{
      parsedDocument.title = parsedMatter.data.title
    }
    if(typeof parsedMatter.data.permalink !== 'string' || parsedMatter.data.permalink === ''){
      parsedDocument.permalink = null
    }else{
      parsedDocument.permalink = parsedMatter.data.permalink
    }
    if(typeof parsedMatter.data.date !== 'string' && typeof parsedMatter.data.date !== 'object'){
      // Chances are that date will be parsed as a Date object if gray-matter
      // can recognize its syntax properly. If it can't, it will return date as
      // a string. Handle both situations.
      parsedDocument.date = null
    }else{
      parsedDocument.date = new Date(parsedMatter.data.date).getTime()
    }
    if(typeof parsedMatter.data.excerpt !== 'string'){
      if(parsedMatter.excerpt === ''){
        parsedDocument.excerpt = null
      }else{
        parsedDocument.excerpt = parsedMatter.excerpt
      }
    }else{
      if(parsedMatter.data.excerpt === ''){
        parsedDocument.excerpt = null
      }else{
        parsedDocument.excerpt = parsedMatter.data.excerpt
      }
    }
    parsedDocument.content = parsedMatter.content
    return parsedDocument
  }catch(error){
    throw new DocumentParseError(error.message)
  }
}

module.exports = parsePost
